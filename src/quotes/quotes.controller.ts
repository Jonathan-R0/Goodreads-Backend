import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { QuoteService } from './quotes.service';
import { Quote } from './quotes.entity';
import { AuthGuard } from '@/auth/auth.guard';
import { PagedResult, StandardResponse, success } from '@/util/utils';
import { CreateQuoteDto } from './dto/create-quote.dto';

@ApiTags('Quotes')
@Controller('quotes')
export class QuoteController {
	constructor(private readonly quoteService: QuoteService) {}

	@Post('/')
	@ApiOperation({ summary: 'Create Quote' })
	@ApiResponse({ status: 201, description: 'Creates a quote object.' })
	@UseGuards(AuthGuard)
	async createQuote(
		@Body() createQuoteDto: CreateQuoteDto,
	): Promise<StandardResponse<Quote>> {
		return success(await this.quoteService.create(createQuoteDto));
	}

	@Get('/:id')
	@ApiOperation({ summary: 'Get Quote by ID' })
	@ApiResponse({ status: 200, description: 'Returns a quote object.' })
	@UseGuards(AuthGuard)
	async getQuote(@Param('id') id: number): Promise<StandardResponse<Quote>> {
		return success(await this.quoteService.findById(Number(id)));
	}

	@Delete('/:id')
	@ApiOperation({ summary: 'Delete Quote' })
	@ApiResponse({ status: 200, description: 'Deletes a quote object.' })
	@UseGuards(AuthGuard)
	async deleteQuote(
		@Param('id') id: number,
	): Promise<StandardResponse<void>> {
		await this.quoteService.delete(Number(id));
		return success();
	}

	@Get('/')
	@ApiOperation({ summary: 'List Quotes' })
	@ApiResponse({
		status: 200,
		description: 'Returns a list of quote objects.',
	})
	@ApiQuery({
		name: 'page',
		required: false,
		type: Number,
		description: 'Page number',
	})
	@ApiQuery({
		name: 'pageSize',
		required: false,
		type: Number,
		description: 'Number of quotes per page',
	})
	@ApiQuery({
		name: 'author',
		required: false,
		type: String,
		description: 'Filter by author name',
	})
	@UseGuards(AuthGuard)
	async listQuotes(
		@Query('page') page?: number,
		@Query('pageSize') pageSize?: number,
		@Query('author') author?: string,
	): Promise<StandardResponse<PagedResult<Quote[]>>> {
		return success(await this.quoteService.list(page, pageSize, author));
	}
}
