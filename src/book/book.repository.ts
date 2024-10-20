import { BaseRepository } from '@/util/base.repository';
import { Injectable } from '@nestjs/common';
import { booksTable } from './book.entity';

@Injectable()
export class BookRepository extends BaseRepository<typeof booksTable> {
	constructor() {
		super(booksTable, booksTable.id);
	}
}
