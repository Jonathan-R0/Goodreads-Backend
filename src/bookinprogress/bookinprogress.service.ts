import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { and, like } from 'drizzle-orm';
import { bookInProgressTable } from './bookinprogress.entity';
import { BaseService } from '@/util/base.service';
import { BookInProgressRepository } from './bookinprogrees.repository';
import { UpdateBookInProgressDto } from './dto/update-bookinprogress.dto';
import { BookInProgressUpdateRepository } from './bookinprogressupdate/bookinprogressupdate.repository';

@Injectable()
export class BookInProgressService extends BaseService<
	typeof bookInProgressTable,
	BookInProgressRepository
> {
	constructor(
		private readonly bookInProgressRepository: BookInProgressRepository,
		private readonly bookInProgressUpdateRepository: BookInProgressUpdateRepository,
	) {
		super(bookInProgressRepository);
	}

	public async createBookInProgress(bookInProgress: UpdateBookInProgressDto) {
		await this.bookInProgressUpdateRepository.create({
			author_id: bookInProgress.author_id,
			book_excerpt: bookInProgress.book_excerpt,
			progress_percentage: bookInProgress.progress_percentage,
		});
		return await this.bookInProgressRepository.create(bookInProgress);
	}

	public async updateBookInProgress(
		id: number,
		bookInProgress: UpdateBookInProgressDto,
	) {
		await this.createUpdateBookInProgressNews(id, bookInProgress);
		return await this.bookInProgressRepository.updateById(
			bookInProgress,
			id,
		);
	}

	async createUpdateBookInProgressNews(
		id: number,
		bookInProgress: UpdateBookInProgressDto,
	) {
		const bookInProgressToUpdate =
			await this.bookInProgressRepository.findById(id);
		if (
			bookInProgress.book_excerpt &&
			bookInProgress.book_excerpt !== bookInProgressToUpdate.book_excerpt
		) {
			await this.bookInProgressUpdateRepository.create({
				author_id: bookInProgressToUpdate.author_id,
				book_excerpt: bookInProgress.book_excerpt,
			});
		}
		if (
			bookInProgress.progress_percentage &&
			bookInProgress.progress_percentage !==
				bookInProgressToUpdate.progress_percentage
		) {
			await this.bookInProgressUpdateRepository.create({
				author_id: bookInProgressToUpdate.author_id,
				progress_percentage: bookInProgress.progress_percentage,
			});
		}
	}

	public async list(
		page?: number,
		pageSize?: number,
		filterName: string = '',
		filterDescription: string = '',
	) {
		return await this.bookInProgressRepository.findAllBooksAndAuthorsWhere(
			[
				and(
					like(bookInProgressTable.title, `%${filterName}%`),
					like(
						bookInProgressTable.description,
						`%${filterDescription}%`,
					),
				),
			],
			page,
			pageSize,
		);
	}

	public async findBooksAndAuthorsById(id: number) {
		return await this.bookInProgressRepository.findBooksAndAuthorsById(id);
	}

	async publishBook(bookInProgressId: number) {
		const bookInProgress =
			await this.bookInProgressRepository.findById(bookInProgressId);

		if (bookInProgress.isPublished) {
			throw new HttpException(
				'This book is already published.',
				HttpStatus.BAD_REQUEST,
			);
		}

		if (
			!bookInProgress.progress_percentage ||
			bookInProgress.progress_percentage < 100
		) {
			throw new HttpException(
				'Progress must be 100% to publish the book.',
				HttpStatus.BAD_REQUEST,
			);
		}

		bookInProgress.isPublished = true;
		await this.bookInProgressRepository.update(bookInProgress);
		return bookInProgress;
	}
}
