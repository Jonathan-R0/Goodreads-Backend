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
}
