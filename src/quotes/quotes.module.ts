import * as dotenv from 'dotenv';
import { QuoteController } from './quotes.controller';
import { QuoteService } from './quotes.service';
import { QuoteRepository } from './quotes.repository';
import { Module } from '@nestjs/common';
dotenv.config();

@Module({
	imports: [],
	controllers: [QuoteController],
	providers: [QuoteService, QuoteRepository],
	exports: [],
})
export class QuotesModule {}
