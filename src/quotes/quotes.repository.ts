import quotesTable from './quotes.entity';
import { BaseRepository } from '@/util/base.repository';
import { Injectable } from '@nestjs/common';
import { and, like } from 'drizzle-orm';

@Injectable()
export class QuoteRepository extends BaseRepository<typeof quotesTable> {
	constructor() {
		super(quotesTable, quotesTable.id);
	}

	public async findAllQuotesWhere(
		filterName: string,
		page?: number,
		pageSize?: number,
	) {
		return await this.findAllWhere(
			[and(like(quotesTable.author, `%${filterName}%`))],
			page,
			pageSize,
		);
	}
}
