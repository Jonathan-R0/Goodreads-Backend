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
	Req,
} from '@nestjs/common';
import { BookInProgressService } from './bookinprogress.service';
import { CreateBookInProgressDto } from './dto/create-bookinprogress.dto';
import { UpdateBookInProgressDto } from './dto/update-bookinprogress.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/auth/auth.guard';
import { ApiPaged, PagedResult, StandardResponse, success } from '@/util/utils';
import {
	BookInProgress,
	BookInProgressAndAuthor,
} from './bookinprogress.entity';
import { NotificationService } from '@/notifications/notifications.service';
import { UserService } from '@/user/user.service';
import { FollowService } from '@/user/follows/follow.service';
import { BookInProgressUpdateService } from './bookinprogressupdate/bookinprogressupdate.service';
import { BookInProgressUpdateAndAuthor } from './bookinprogressupdate/bookinprogressupdate.entity';

@ApiTags('Books In Progress')
@Controller('bookinprogress')
export class BookInProgressController {
	constructor(
		private readonly bookInProgressService: BookInProgressService,
		private readonly notificationService: NotificationService,
		private readonly userService: UserService,
		private readonly followService: FollowService,
		private readonly bookInProgressUpdateService: BookInProgressUpdateService,
	) {}

	@Post()
	@ApiOperation({ summary: 'Create a new book in progress' })
	@ApiResponse({ status: 201, description: 'Book created successfully.' })
	@ApiResponse({ status: 400, description: 'Bad Request. Validation error.' })
	async create(
		@Body() createBookInProgressDto: CreateBookInProgressDto,
	): Promise<StandardResponse<BookInProgress>> {
		const book = await this.bookInProgressService.createBookInProgress(
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
		const updatedBook =
			await this.bookInProgressService.updateBookInProgress(
				id,
				updateBookInProgressDto,
			);

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

	@Get('/subscribed/progress')
	@ApiOperation({ summary: 'Find progress for books by authors followed' })
	@ApiResponse({
		status: 200,
		description: 'Returns a book in progress with author details.',
	})
	@ApiResponse({ status: 404, description: 'Book not found.' })
	@UseGuards(AuthGuard)
	@ApiPaged()
	async getProgressForSubscriber(
		@Req() req: Request & { user: Record<string, any> },
		@Query('page') page: number = 1,
		@Query('pageSize') pageSize: number = 10,
	): Promise<StandardResponse<PagedResult<any[]>>> {
		const user = await this.userService.getUserByEmail(req.user.sub);
		const following = await this.followService.getFollowing(user.id);

		return success(
			await this.bookInProgressUpdateService.listProgress(
				following,
				Number(page),
				Number(pageSize),
			),
		);
	}

	@Get('/subscribed/excerpt')
	@ApiOperation({ summary: 'Find excerpts for books by authors followed' })
	@ApiResponse({
		status: 200,
		description: 'Returns a book in progress with author details.',
	})
	@UseGuards(AuthGuard)
	@ApiPaged()
	async getExcerptsForSubscriber(
		@Req() req: Request & { user: Record<string, any> },
		@Query('page') page: number = 1,
		@Query('pageSize') pageSize: number = 10,
	): Promise<StandardResponse<PagedResult<any[]>>> {
		const user = await this.userService.getUserByEmail(req.user.sub);
		const following = await this.followService.getFollowing(user.id);

		return success(
			await this.bookInProgressUpdateService.listExcerpt(
				following,
				Number(page),
				Number(pageSize),
			),
		);
	}
}
