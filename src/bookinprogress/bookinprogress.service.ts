import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { and, like } from 'drizzle-orm';
import bookInProgressTable from './bookinprogress.entity';
import { BaseService } from '@/util/base.service';
import { BookInProgressRepository } from './bookinprogrees.repository';

@Injectable()
export class BookInProgressService extends BaseService<
	typeof bookInProgressTable,
	BookInProgressRepository
> {
	constructor(
		private readonly bookInProgressRepository: BookInProgressRepository,
	) {
		super(bookInProgressRepository);
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
					like(bookInProgressTable.description, `%${filterDescription}%`),
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
    const bookInProgress = await this.bookInProgressRepository.findById(bookInProgressId);

    if (bookInProgress.isPublished) {
        throw new HttpException('This book is already published.', HttpStatus.BAD_REQUEST);
    }

    if (!bookInProgress.progress_percentage || (bookInProgress.progress_percentage < 100)) {
        throw new HttpException('Progress must be 100% to publish the book.', HttpStatus.BAD_REQUEST);
    }
    
    bookInProgress.isPublished = true;
    await this.bookInProgressRepository.update(bookInProgress);
    return bookInProgress;
  }

}
