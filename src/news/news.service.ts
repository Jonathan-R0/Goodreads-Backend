import { BaseService } from '@/util/base.service';
import { Injectable } from '@nestjs/common';
import newsTable, { News } from './news.entity';
import { NewsRepository } from './news.repository';
import { User } from '@/user/user.entity';
import { PagedResult } from '@/util/utils';
import { eq, or } from 'drizzle-orm';

@Injectable()
export class NewsService extends BaseService<typeof newsTable, NewsRepository> {
	constructor(private readonly newsRepository: NewsRepository) {
		super(newsRepository);
	}

	public async list(
		following: User[],
		page: number,
		pageSize: number,
	): Promise<PagedResult<News[]>> {
		return await this.newsRepository.findAllWhere(
			[or(...following.map((user) => eq(newsTable.author_id, user.id)))],
			page,
			pageSize,
		);
	}
}
