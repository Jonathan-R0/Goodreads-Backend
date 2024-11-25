import { BaseService } from '@/util/base.service';
import { Injectable } from '@nestjs/common';
import { booksTable } from './book.entity';
import { usersTable } from '../user/user.entity';
import { BookRepository } from './book.repository';
import { and, like } from 'drizzle-orm';

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
	) {
		return await this.bookRepository.findAllBooksAndAuthorsWhere(
			filterName,
			filterDescription,
			filterGenre,
			filterAuthor,
			page,
			pageSize,
		);
	}

	public async findBooksAndAuthorsById(id: number) {
		return await this.bookRepository.findBooksAndAuthorsById(id);
	}
}
