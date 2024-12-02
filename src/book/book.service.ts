import { BaseService } from '@/util/base.service';
import { Injectable } from '@nestjs/common';
import { booksTable } from './book.entity';
import { BookRepository } from './book.repository';

@Injectable()
export class BookService extends BaseService<
	typeof booksTable,
	BookRepository
> {
	constructor(private readonly bookRepository: BookRepository) {
		super(bookRepository);
	}

	public async list(
		page?: number,
		pageSize?: number,
		filterName: string = '',
		filterDescription: string = '',
		filterGenre: string = '',
		filterAuthor: string = '',
		sortCreatedAt: boolean = false,
	) {
		return await this.bookRepository.findAllBooksAndAuthorsWhere(
			filterName,
			filterDescription,
			filterGenre,
			filterAuthor,
			sortCreatedAt,
			page,
			pageSize,
		);
	}

	public async findBooksAndAuthorsById(id: number) {
		return await this.bookRepository.findBooksAndAuthorsById(id);
	}
}
