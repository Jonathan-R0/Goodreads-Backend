import { BaseRepository } from '@/util/base.repository';
import { Injectable } from '@nestjs/common';

import db from '@/config/db.config';
import { booksTable } from './book.entity';
import { usersTable } from '../user/user.entity';
import { eq } from 'drizzle-orm/expressions';
import { getTableColumns } from 'drizzle-orm';

@Injectable()
export class BookRepository extends BaseRepository<typeof booksTable> {
	constructor() {
		super(booksTable, booksTable.id);
	}

	public async findById(id: number) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...rest } = getTableColumns(usersTable);

		return await db
			.select({
				user: { ...rest },
				book: booksTable,
			})
			.from(booksTable)
			.where(eq(booksTable.id, id))
			.innerJoin(usersTable, eq(booksTable.author_id, usersTable.id))
			.then((books: any) => books[0]);
	}
}
