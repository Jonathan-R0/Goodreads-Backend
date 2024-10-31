import { BaseRepository } from '@/util/base.repository';
import { HttpException, Injectable } from '@nestjs/common';
import db from '@/config/db.config';
import { bookInProgressTable, BookInProgressAndAuthor } from './bookinprogress.entity';
import { usersTable } from '../user/user.entity';
import { and, eq } from 'drizzle-orm/expressions';
import { count, getTableColumns, SQLWrapper } from 'drizzle-orm';
import { PagedResult } from '@/util/utils';

@Injectable()
export class BookInProgressRepository extends BaseRepository<typeof bookInProgressTable> {
	constructor() {
		super(bookInProgressTable, bookInProgressTable.id);
	}

    public async publishBook(bookInProgressId: number): Promise<void> {
        const bookInProgress = await db
           .select()
           .from(bookInProgressTable)
           .where(and(
              eq(bookInProgressTable.id, bookInProgressId),
              eq(bookInProgressTable.progress_percentage, 100),
              eq(bookInProgressTable.isPublished, false),
           ))
           .limit(1);
     
        if (!bookInProgress) {
           throw new HttpException('Book not found.', 404);
        }

        await db.update(bookInProgressTable)
           .set({ isPublished: true })
           .where(eq(bookInProgressTable.id, bookInProgressId));
     }
     

	public async findAllBooksAndAuthorsWhere(
		andsConditions: (SQLWrapper | undefined)[] = [],
		page?: number,
		pageSize?: number,
	): Promise<PagedResult<BookInProgressAndAuthor[]>> {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...rest } = getTableColumns(usersTable);
		const partialResp = db
			.select({
				user: { ...rest },
				book: bookInProgressTable,
			})
			.from(this.table)
			.innerJoin(usersTable, eq(bookInProgressTable.author_id, usersTable.id))
			.where(and(...andsConditions));

		const resp = await (page && pageSize
			? partialResp.limit(pageSize).offset((page - 1) * pageSize)
			: partialResp);

		const totalResp = await db
			.select({ count: count() })
			.from(this.table)
			.where(and(...andsConditions));

		const totalCount = totalResp[0]?.count || 0;
		return {
			data: resp,
			total: totalCount,
			page: page || 0,
			pageSize: pageSize || 0,
		};
	}

	public async findBooksAndAuthorsById(id: number): Promise<BookInProgressAndAuthor> {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...rest } = getTableColumns(usersTable);

		return await db
			.select({
				user: { ...rest },
				book: bookInProgressTable,
			})
			.from(bookInProgressTable)
			.where(eq(bookInProgressTable.id, id))
			.innerJoin(usersTable, eq(bookInProgressTable.author_id, usersTable.id))
			.then((books: any) => books[0]);
	}
}
