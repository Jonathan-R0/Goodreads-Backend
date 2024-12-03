import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	Req,
	UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { BookService } from './book.service';
import { Book, BookAndAuthor } from '@/book/book.entity';
import { ApiPaged, PagedResult, StandardResponse, success } from '@/util/utils';
import { BookDto } from './dto/book.dto';
import { AuthGuard } from '@/auth/auth.guard';
import { UserService } from '@/user/user.service';

@ApiTags('Books')
@Controller('books')
export class BookController {
	constructor(
		private readonly bookService: BookService,
		private readonly userService: UserService,
	) {}

	@Get('/:id')
	@ApiOperation({ summary: 'Get Book' })
	@ApiResponse({ status: 200, description: 'Returns a book object.' })
	@UseGuards(AuthGuard)
	async getBook(
		@Param('id') id: number,
	): Promise<StandardResponse<BookAndAuthor>> {
		return success(
			await this.bookService.findBooksAndAuthorsById(Number(id)),
		);
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
	@ApiQuery({
		name: 'filterGenre',
		required: false,
		type: String,
		description: 'Filter by book genre',
	})
	@ApiQuery({
		name: 'filterAuthor',
		required: false,
		type: String,
		description: 'Filter by book author',
	})
	@ApiQuery({
		name: 'sortCreatedAt',
		required: false,
		type: Boolean,
		description: 'Filter by book author',
	})
	@UseGuards(AuthGuard)
	async listBooks(
		@Query('page') page?: number,
		@Query('pageSize') pageSize?: number,
		@Query('filterTitle') filterTitle?: string,
		@Query('filterDescription') filterDescription?: string,
		@Query('filterGenre') filterGenre?: string,
		@Query('filterAuthor') filterAuthor?: string,
		@Query('sortCreatedAt') sortCreatedAt?: boolean,
	): Promise<StandardResponse<PagedResult<BookAndAuthor[]>>> {
		return success(
			await this.bookService.list(
				parseInt(String(page ?? 1), 10),
				parseInt(String(pageSize ?? 15), 10),
				filterTitle,
				filterDescription,
				filterGenre,
				filterAuthor,
				Boolean(sortCreatedAt),
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
		@Req() req: Request & { user: Record<string, any> },
	): Promise<StandardResponse<Book>> {
		const book = await this.bookService.findBooksAndAuthorsById(Number(id));
		const user = await this.userService.getUserByEmail(req.user.sub);
		if (Number(book.book.author_id) !== Number(user.id)) {
			throw new Error('You can only delete your own books');
		}
		return success(await this.bookService.delete(id));
	}
}
