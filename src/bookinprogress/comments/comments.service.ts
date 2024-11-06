import { CommentsRepository } from './comments.repository';
import { Comment } from './comments.entity';
import { CreateCommentsDto } from '../dto/create-comments.dto';
import { PagedResult } from '@/util/utils';

export class CommentsService {
	private commentsRepo = new CommentsRepository();

	async createComment(
		bookId: number,
		commentDto: CreateCommentsDto,
	): Promise<void> {
		await this.commentsRepo.create(
			bookId,
			commentDto.content,
			commentDto.userId,
		);
	}

	async getCommentsForBook(
		bookId: number,
		page: number,
		pageSize: number,
	): Promise<PagedResult<Comment[]>> {
		const comments = await this.commentsRepo.findByBookId(
			bookId,
			page,
			pageSize,
		);
		const totalCount = await this.commentsRepo.countByBookId(bookId);

		return {
			data: comments,
			total: totalCount,
			page,
			pageSize,
		};
	}
}
