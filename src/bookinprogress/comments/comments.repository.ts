import db from '@/config/db.config';
import { commentsTable, Comment } from './comments.entity';
import { eq } from 'drizzle-orm/expressions';
import { count, desc } from 'drizzle-orm';

export class CommentsRepository {
	async create(bookId: number, content: string, userId: number) {
		await db.insert(commentsTable).values({
			bookId,
			userId,
			content,
		});
	}

	async findByBookId(
		bookId: number,
		page: number,
		pageSize: number,
	): Promise<Comment[]> {
		const offset = (page - 1) * pageSize;
		const resp = await db
			.select({
				created_at: commentsTable.created_at,
				content: commentsTable.content,
				userId: commentsTable.userId,
				bookId: commentsTable.bookId,
				id: commentsTable.id,
			})
			.from(commentsTable)
			.where(eq(commentsTable.bookId, bookId))
			.orderBy(desc(commentsTable.created_at))
			.limit(pageSize)
			.offset(offset);

		return resp as Comment[];
	}

	async countByBookId(bookId: number): Promise<number> {
		const result = await db
			.select({ count: count() })
			.from(commentsTable)
			.where(eq(commentsTable.bookId, bookId));

		return result[0]?.count || 0;
	}
}
