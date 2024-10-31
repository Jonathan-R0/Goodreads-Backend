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
        const comment = await this.commentsService.createComment(bookId, commentDto); 
        return success(comment);
    }

    @Get('/:bookId/')
    @ApiOperation({ summary: 'Get Comments for a Book' })
    @ApiResponse({ status: 200, description: 'Returns a list of comments.' })
    public async getCommentsForBook(
        @Param('bookId') bookId: number,
        @Query('page') page: number,
        @Query('pageSize') pageSize: number,
    ): Promise<StandardResponse<Comment[]>> {
        const comments = await this.commentsService.getCommentsForBook(bookId, page, pageSize);
        return success(comments);
    }
}
