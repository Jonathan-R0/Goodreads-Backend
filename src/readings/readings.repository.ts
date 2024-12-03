import { BaseRepository } from '@/util/base.repository';
import { and, eq, InferSelectModel, count } from 'drizzle-orm';
import db from '@/config/db.config';
import readingsTable, { Reading } from './readings.entity';
import { PagedResult } from '@/util/utils';
import { PgTable } from 'drizzle-orm/pg-core';

type EntityReturn<TableType extends PgTable> = InferSelectModel<TableType>;

export class ReadingsRepository extends BaseRepository<typeof readingsTable> {
	constructor() {
		super(readingsTable, readingsTable.id);
	}

	async deleteByAuthorIdAndBookId(
		userId: number,
		bookId: number,
	): Promise<void> {
		const result = await db
			.delete(this.table)
			.where(
				and(
					eq(readingsTable.userId, userId),
					eq(readingsTable.booksId, bookId),
				),
			);
	}

	async findOneWhere(arg0: {
		where: { userId: any; bookId: any };
	}): Promise<Reading> {
		const result = await db
			.select()
			.from(readingsTable)
			.where(
				and(
					eq(readingsTable.userId, arg0.where.userId),
					eq(readingsTable.booksId, arg0.where.bookId),
				),
			);
		return result[0];
	}

	public async findAllByType(
		userId: number,
		type: string,
		page?: number,
		pageSize?: number,
	): Promise<PagedResult<EntityReturn<typeof readingsTable>[]>> {
		const query = db
			.select()
			.from(this.table)
			.where(
				and(eq(this.table.userId, userId), eq(this.table.type, type)),
			);

		const countQuery = db
			.select({ count: count(this.table.id) })
			.from(this.table)
			.where(
				and(eq(this.table.userId, userId), eq(this.table.type, type)),
			);

		if (page && pageSize) {
			query.limit(pageSize).offset((page - 1) * pageSize);
		}

		const [result, countResult] = await Promise.all([query, countQuery]);

		return {
			data: result,
			total: countResult[0].count,
			page: page || 1,
			pageSize: pageSize || 10,
		};
	}
}
export default ReadingsRepository;
