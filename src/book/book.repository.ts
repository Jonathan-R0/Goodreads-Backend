import { BaseRepository } from '@/util/base.repository';
import { Injectable } from '@nestjs/common';
import db from '@/config/db.config';
import { BookAndAuthor, booksTable } from './book.entity';
import { usersTable } from '../user/user.entity';
import { and, eq, like } from 'drizzle-orm/expressions';
import { count, getTableColumns, SQLWrapper } from 'drizzle-orm';
import { PagedResult } from '@/util/utils';

@Injectable()
export class BookRepository extends BaseRepository<typeof booksTable> {
	constructor() {
		super(booksTable, booksTable.id);
	}

	public async findAllBooksAndAuthorsWhere(
		filterName: string,
		filterDescription: string,
		filterGenre: string,
		filterAuthor: string,
		page?: number,
		pageSize?: number,
	): Promise<PagedResult<BookAndAuthor[]>> {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...rest } = getTableColumns(usersTable);
		const partialResp = db
			.select({
				book: booksTable,
				user: { ...rest },
			})
			.from(this.table)
			.innerJoin(usersTable, eq(booksTable.author_id, usersTable.id))
			.where(
				and(
					like(booksTable.title, `%${filterName}%`),
					like(booksTable.description, `%${filterDescription}%`),
					like(booksTable.genre, `%${filterGenre}%`),
					like(usersTable.name, `%${filterAuthor}%`),
				),
			);
		console.log(partialResp.toSQL().sql);

		const resp = await (page && pageSize
			? partialResp.limit(pageSize).offset((page - 1) * pageSize)
			: partialResp);

		const totalResp = await db
			.select({ count: count() })
			.from(this.table)
			.innerJoin(usersTable, eq(booksTable.author_id, usersTable.id))
			.where(
				and(
					like(booksTable.title, `%${filterName}%`),
					like(booksTable.description, `%${filterDescription}%`),
					like(booksTable.genre, `%${filterGenre}%`),
					like(usersTable.name, `%${filterAuthor}%`),
				),
			);

		const totalCount = totalResp[0]?.count || 0;
		return {
			data: resp,
			total: totalCount,
			page: page || 0,
			pageSize: pageSize || 0,
		};
	}

	public async findBooksAndAuthorsById(id: number): Promise<BookAndAuthor> {
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
