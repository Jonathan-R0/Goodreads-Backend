import quotesTable from './quotes.entity';
import { QuoteRepository } from './quotes.repository';
import { BaseService } from '@/util/base.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QuoteService extends BaseService<
	typeof quotesTable,
	QuoteRepository
> {
	constructor(private readonly quoteRepository: QuoteRepository) {
		super(quoteRepository);
	}
}
