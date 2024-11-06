import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { Comment } from './comments.entity';
import { StandardResponse, success } from '@/util/utils';
import { AuthGuard } from '@/auth/auth.guard';
import { CreateCommentsDto } from '../dto/create-comments.dto';
import { PagedResult } from '@/util/utils';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
	constructor(private readonly commentsService: CommentsService) {}

	@Post('/:bookId')
	@ApiOperation({ summary: 'Create Comment' })
	@ApiResponse({ status: 201, description: 'Creates a comment object.' })
	@UseGuards(AuthGuard)
	public async createComment(
		@Param('bookId') bookId: number,
		@Body() commentDto: CreateCommentsDto,
	): Promise<StandardResponse<void>> {
		await this.commentsService.createComment(bookId, commentDto);
		return success();
	}

	@Get('/:bookId/')
	@ApiOperation({ summary: 'Get Comments for a Book' })
	@ApiResponse({
		status: 200,
		description: 'Returns a paginated list of comments.',
	})
	public async getCommentsForBook(
		@Param('bookId') bookId: number,
		@Query('page') page: string,
		@Query('pageSize') pageSize: string,
	): Promise<StandardResponse<PagedResult<Comment[]>>> {
		const comments = await this.commentsService.getCommentsForBook(
			bookId,
			parseInt(page),
			parseInt(pageSize),
		);
		return success(comments);
	}
}
