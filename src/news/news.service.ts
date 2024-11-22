import { BaseService } from '@/util/base.service';
import { Injectable } from '@nestjs/common';
import newsTable, { News, NewsAndAuthor } from './news.entity';
import { NewsRepository } from './news.repository';
import { User } from '@/user/user.entity';
import { PagedResult } from '@/util/utils';
import { eq, or } from 'drizzle-orm';
import { CreateNewsDto } from './dto/create-news.dto';
import { NotificationService } from '@/notifications/notifications.service';

@Injectable()
export class NewsService extends BaseService<typeof newsTable, NewsRepository> {
	constructor(
		private readonly newsRepository: NewsRepository,
		private readonly notificationService: NotificationService,
	) {
		super(newsRepository);
	}

	public async list(
		following: User[],
		page: number,
		pageSize: number,
	): Promise<PagedResult<NewsAndAuthor[]>> {
		return await this.newsRepository.findAllNewsAndAuthorsWhere(
			[or(...following.map((user) => eq(newsTable.author_id, user.id)))],
			page,
			pageSize,
		);
	}

	public async findByIdAndAuthor(id: number): Promise<NewsAndAuthor> {
		return await this.newsRepository.findByIdAndAuthor(id);
	}

	public async createNews(
		createBody: CreateNewsDto,
		authorId: number,
	): Promise<News> {
		const news = await this.newsRepository.create({
			...createBody,
			author_id: authorId,
		});

		await this.notificationService.createNewNewsNotification(
			news.id,
			authorId,
		);
		return news;
	}
}
