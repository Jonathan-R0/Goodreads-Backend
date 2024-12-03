import { BaseRepository } from '@/util/base.repository';
import { Injectable } from '@nestjs/common';
import db from '@/config/db.config';
import { BookAndAuthor, booksTable } from './book.entity';
import { usersTable } from '../user/user.entity';
import { and, eq, like } from 'drizzle-orm/expressions';
import { count, getTableColumns, desc, asc } from 'drizzle-orm';
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
		sortCreatedAt: boolean,
		page?: number,
		pageSize?: number,
	): Promise<PagedResult<BookAndAuthor[]>> {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...rest } = getTableColumns(usersTable);
		const presortResp = db
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
		const partialResp = sortCreatedAt
			? presortResp.orderBy(desc(booksTable.publication_date))
			: presortResp.orderBy(asc(booksTable.publication_date));

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
