import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { BookService } from './book.service';
import { Book } from '@/book/book.entity';
import { ApiPaged, PagedResult, StandardResponse, success } from '@/util/utils';
import { BookDto } from './book.dto';
import { AuthGuard } from '@/auth/auth.guard';

@ApiTags('Books')
@Controller('books')
export class BookController {
	constructor(private readonly bookService: BookService) {}

	@Get('/:id')
	@ApiOperation({ summary: 'Get Book' })
	@ApiResponse({ status: 200, description: 'Returns a book object.' })
	// @UseGuards(AuthGuard)
	async getBook(@Param('id') id: number): Promise<StandardResponse<Book>> {
		return success(await this.bookService.findById(Number(id)));
	}

	@Get('/')
	@ApiOperation({ summary: 'List Books' })
	@ApiResponse({
		status: 200,
		description: 'Returns a list of book objects.',
	})
	@ApiPaged()
	@ApiQuery({
		name: 'filterTitle',
		required: false,
		type: String,
		description: 'Filter by book title',
	})
	@ApiQuery({
		name: 'filterDescription',
		required: false,
		type: String,
		description: 'Filter by book description',
	})
	// @UseGuards(AuthGuard)
	async listBooks(
		@Query('page') page?: number,
		@Query('pageSize') pageSize?: number,
		@Query('filterTitle') filterName?: string,
		@Query('filterDescription') filterDescription?: string,
	): Promise<StandardResponse<PagedResult<Book[]>>> {
		const pageParsed = parseInt(String(page ?? 1), 10);
		const pageSizeParsed = parseInt(String(pageSize ?? 15), 10);
		return success(
			await this.bookService.list(
				pageParsed,
				pageSizeParsed,
				filterName,
				filterDescription,
			),
		);
	}

	@Post('/')
	@ApiOperation({ summary: 'Create Book' })
	@ApiResponse({ status: 201, description: 'Creates a book object.' })
	@UseGuards(AuthGuard)
	public async createBook(
		@Body() book: BookDto,
	): Promise<StandardResponse<Book>> {
		return success(await this.bookService.create(book));
	}

	@Put('/:id')
	@ApiOperation({ summary: 'Update Book' })
	@ApiResponse({ status: 200, description: 'Updates a book object.' })
	@UseGuards(AuthGuard)
	public async updateBook(
		@Param('id') id: number,
		@Body() book: BookDto,
	): Promise<StandardResponse<Book>> {
		return success(
			await this.bookService.update({ ...book, id: Number(id) }),
		);
	}

	@Delete('/:id')
	@ApiOperation({ summary: 'Delete Book' })
	@ApiResponse({
		status: 200,
		description: 'Deletes and returns a book object.',
	})
	@UseGuards(AuthGuard)
	public async deleteBook(
		@Param('id') id: string,
	): Promise<StandardResponse<Book>> {
		return success(await this.bookService.delete(id));
	}
}
