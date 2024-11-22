import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Query,
	UseGuards,
	Put,
	Patch,
} from '@nestjs/common';
import { BookInProgressService } from './bookinprogress.service';
import { CreateBookInProgressDto } from './dto/create-bookinprogress.dto';
import { UpdateBookInProgressDto } from './dto/update-bookinprogress.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/auth/auth.guard';
import { PagedResult, StandardResponse, success } from '@/util/utils';
import {
	BookInProgress,
	BookInProgressAndAuthor,
} from './bookinprogress.entity';
import { NotificationService } from '@/notifications/notifications.service';

@ApiTags('Books In Progress')
@Controller('bookinprogress')
export class BookInProgressController {
	constructor(
		private readonly bookInProgressService: BookInProgressService,
		private readonly notificationService: NotificationService,
	) {}

	@Post()
	@ApiOperation({ summary: 'Create a new book in progress' })
	@ApiResponse({ status: 201, description: 'Book created successfully.' })
	@ApiResponse({ status: 400, description: 'Bad Request. Validation error.' })
	async create(
		@Body() createBookInProgressDto: CreateBookInProgressDto,
	): Promise<StandardResponse<BookInProgress>> {
		const book = await this.bookInProgressService.create(
			createBookInProgressDto,
		);
		return success(book);
	}

	@Get()
	@ApiOperation({ summary: 'List Books In Progress' })
	@ApiResponse({
		status: 200,
		description: 'List of books in progress retrieved successfully.',
	})
	@UseGuards(AuthGuard)
	async list(
		@Query('page') page?: number,
		@Query('pageSize') pageSize?: number,
		@Query('filterName') filterName = '',
		@Query('filterDescription') filterDescription = '',
	): Promise<StandardResponse<PagedResult<BookInProgressAndAuthor[]>>> {
		const books = await this.bookInProgressService.list(
			page,
			pageSize,
			filterName,
			filterDescription,
		);
		return success(books);
	}

	@Get('/:id')
	@ApiOperation({ summary: 'Get Book In Progress by ID' })
	@ApiResponse({
		status: 200,
		description: 'Returns a book in progress with author details.',
	})
	@ApiResponse({ status: 404, description: 'Book not found.' })
	@UseGuards(AuthGuard)
	async getBook(
		@Param('id') id: number,
	): Promise<StandardResponse<BookInProgressAndAuthor>> {
		const book =
			await this.bookInProgressService.findBooksAndAuthorsById(id);
		return success(book);
	}

	@Put('/:id')
	@ApiOperation({ summary: 'Update a book in progress' })
	@ApiResponse({ status: 200, description: 'Book updated successfully.' })
	@ApiResponse({ status: 404, description: 'Book not found.' })
	@ApiResponse({ status: 400, description: 'Bad Request. Validation error.' })
	async update(
		@Param('id') id: number,
		@Body() updateBookInProgressDto: UpdateBookInProgressDto,
	): Promise<StandardResponse<BookInProgress>> {
		const updatedBook = await this.bookInProgressService.update({
			id,
			...updateBookInProgressDto,
		});

		if (updatedBook && updatedBook.author_id) {
			await this.notificationService.updateBookInProgressNotification(
				id,
				updatedBook.author_id,
			);
		}
		return success(updatedBook);
	}

	@Patch('/:id')
	@ApiOperation({ summary: 'Publish a book in progress' })
	@ApiResponse({ status: 200, description: 'Book published successfully.' })
	@ApiResponse({ status: 404, description: 'Book not found.' })
	@ApiResponse({
		status: 400,
		description: 'This book is already published.',
	})
	@ApiResponse({
		status: 400,
		description: 'Progress must be 100% to publish the book.',
	})
	async publishBook(
		@Param('id') id: number,
	): Promise<StandardResponse<BookInProgress>> {
		const updatedBook = await this.bookInProgressService.publishBook(id);
		return success(updatedBook);
	}

	@Delete('/:id')
	@ApiOperation({ summary: 'Delete a book in progress' })
	@ApiResponse({ status: 200, description: 'Book deleted successfully.' })
	@ApiResponse({ status: 404, description: 'Book not found.' })
	async remove(
		@Param('id') id: number,
	): Promise<StandardResponse<BookInProgress>> {
		const deleteBookInProgress =
			await this.bookInProgressService.delete(id);
		return success(deleteBookInProgress);
	}
}
