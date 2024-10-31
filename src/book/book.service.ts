import { BaseService } from '@/util/base.service';
import { Injectable } from '@nestjs/common';
import { booksTable } from './book.entity';
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
	) {
		return await this.bookRepository.findAllBooksAndAuthorsWhere(
			[
				and(
					like(booksTable.title, `%${filterName}%`),
					like(booksTable.description, `%${filterDescription}%`),
				),
			],
			page,
			pageSize,
		);
	}

	public async findBooksAndAuthorsById(id: number) {
		return await this.bookRepository.findBooksAndAuthorsById(id);
	}
}
