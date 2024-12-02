import quotesTable from './quotes.entity';
import { BaseRepository } from '@/util/base.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QuoteRepository extends BaseRepository<typeof quotesTable> {
	constructor() {
		super(quotesTable, quotesTable.id);
	}
}
