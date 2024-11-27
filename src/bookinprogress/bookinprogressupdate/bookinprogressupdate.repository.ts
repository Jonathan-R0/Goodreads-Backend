import { BaseRepository } from '@/util/base.repository';
import { Injectable } from '@nestjs/common';
import bookInProgressUpdateTable from './bookinprogressupdate.entity';
import { User } from '@/user/user.entity';
import db from '@/config/db.config';
import { and, or, eq, isNotNull, desc, count } from 'drizzle-orm';

@Injectable()
export class BookInProgressUpdateRepository extends BaseRepository<
	typeof bookInProgressUpdateTable
> {
	constructor() {
		super(bookInProgressUpdateTable, bookInProgressUpdateTable.id);
	}

	async listExcerpt(authors: User[], page?: number, pageSize?: number) {
		const authorConditions = authors.map((author) =>
			eq(bookInProgressUpdateTable.author_id, author.id),
		);
		const partialResp = db
			.select()
			.from(bookInProgressUpdateTable)
			.where(
				and(
					or(...authorConditions),
					isNotNull(bookInProgressUpdateTable.book_excerpt),
				),
			)
			.orderBy(desc(bookInProgressUpdateTable.created_at));

		const resp = await (page && pageSize
			? partialResp.limit(pageSize).offset((page - 1) * pageSize)
			: partialResp);

		const totalResp = await db
			.select({ count: count() })
			.from(this.table)
			.where(
				and(
					or(...authorConditions),
					isNotNull(bookInProgressUpdateTable.book_excerpt),
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

	async listProgress(authors: User[], page?: number, pageSize?: number) {
		const authorConditions = authors.map((author) =>
			eq(bookInProgressUpdateTable.author_id, author.id),
		);
		const partialResp = db
			.select()
			.from(bookInProgressUpdateTable)
			.where(
				and(
					or(...authorConditions),
					isNotNull(bookInProgressUpdateTable.progress_percentage),
				),
			)
			.orderBy(desc(bookInProgressUpdateTable.created_at));

		const resp = await (page && pageSize
			? partialResp.limit(pageSize).offset((page - 1) * pageSize)
			: partialResp);

		const totalResp = await db
			.select({ count: count() })
			.from(this.table)
			.where(
				and(
					or(...authorConditions),
					isNotNull(bookInProgressUpdateTable.progress_percentage),
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
}
