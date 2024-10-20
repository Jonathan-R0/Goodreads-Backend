import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BookService } from './book.service';
import { Book } from '@/book/book.entity';
import { StandardResponse, success } from '@/util/utils';
import { BookDto } from './book.dto';

@ApiTags('Books')
@Controller('books')
export class BookController {
	constructor(private readonly bookService: BookService) {}

	@Get('/:id')
	@ApiOperation({ summary: 'Get Book' })
	@ApiResponse({ status: 200, description: 'Returns a book object.' })
	async getBook(@Param('id') id: number): Promise<StandardResponse<Book>> {
		return success(await this.bookService.findById(Number(id)));
	}

	@Post('/')
	@ApiOperation({ summary: 'Create Book' })
	@ApiResponse({ status: 201, description: 'Creates a book object.' })
	public async createBook(
		@Body() book: BookDto,
	): Promise<StandardResponse<Book>> {
		return success(await this.bookService.create(book));
	}

	@Put('/:id')
	@ApiOperation({ summary: 'Update Book' })
	@ApiResponse({ status: 200, description: 'Updates a book object.' })
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
	public async deleteBook(
		@Param('id') id: string,
	): Promise<StandardResponse<Book>> {
		return success(await this.bookService.delete(id));
	}
}
