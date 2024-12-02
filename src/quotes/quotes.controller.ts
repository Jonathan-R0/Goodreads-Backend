import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QuoteService } from './quotes.service';
import { Quote } from './quotes.entity';
import { AuthGuard } from '@/auth/auth.guard';
import { StandardResponse, success } from '@/util/utils';
import { CreateQuoteDto } from './dto/create-quote.dto';

@ApiTags('Quotes')
@Controller('quotes')
export class QuoteController {
	constructor(private readonly quoteService: QuoteService) {}

	@Post('/')
	@ApiOperation({ summary: 'Create Quote' })
	@ApiResponse({ status: 201, description: 'Creates a quote object.' })
	// @UseGuards(AuthGuard)
	async createQuote(
		@Body() createQuoteDto: CreateQuoteDto,
	): Promise<StandardResponse<Quote>> {
		return success(await this.quoteService.create(createQuoteDto));
	}

	@Get('/:id')
	@ApiOperation({ summary: 'Get Quote by ID' })
	@ApiResponse({ status: 200, description: 'Returns a quote object.' })
	// @UseGuards(AuthGuard)
	async getQuote(@Param('id') id: number): Promise<StandardResponse<Quote>> {
		return success(await this.quoteService.findById(Number(id)));
	}

	@Delete('/:id')
	@ApiOperation({ summary: 'Delete Quote' })
	@ApiResponse({ status: 200, description: 'Deletes a quote object.' })
	// @UseGuards(AuthGuard)
	async deleteQuote(
		@Param('id') id: number,
	): Promise<StandardResponse<void>> {
		await this.quoteService.delete(Number(id));
		return success();
	}
}
