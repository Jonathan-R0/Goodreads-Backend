import { BaseRepository } from '@/util/base.repository';
import newsTable, { NewsAndAuthor } from './news.entity';
import { and, count, eq, getTableColumns, SQLWrapper } from 'drizzle-orm';
import db from '@/config/db.config';
import usersTable from '@/user/user.entity';
import { PagedResult } from '@/util/utils';

export class NewsRepository extends BaseRepository<typeof newsTable> {
	constructor() {
		super(newsTable, newsTable.id);
	}

	public async findAllNewsAndAuthorsWhere(
		andsConditions: (SQLWrapper | undefined)[] = [],
		page?: number,
		pageSize?: number,
	): Promise<PagedResult<NewsAndAuthor[]>> {
		if (
			andsConditions.length === 0 ||
			andsConditions.every((cond) => cond === undefined)
		) {
			return {
				data: [],
				total: 0,
				page: page || 0,
				pageSize: pageSize || 0,
			};
		}

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...rest } = getTableColumns(usersTable);
		const partialResp = db
			.select({
				user: { ...rest },
				news: newsTable,
			})
			.from(this.table)
			.innerJoin(usersTable, eq(newsTable.author_id, usersTable.id))
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

	public async findByIdAndAuthor(id: number): Promise<NewsAndAuthor> {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...rest } = getTableColumns(usersTable);

		return await db
			.select({
				user: { ...rest },
				news: newsTable,
			})
			.from(newsTable)
			.where(eq(newsTable.id, id))
			.innerJoin(usersTable, eq(newsTable.author_id, usersTable.id))
			.then((news: any) => news[0]);
	}
}
