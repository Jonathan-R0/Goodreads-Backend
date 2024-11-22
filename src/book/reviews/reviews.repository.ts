import db from '@/config/db.config';
import { reviewsTable, Review } from './reviews.entity';
import { eq } from 'drizzle-orm/expressions';
import { CreateReviewsDto } from '../dto/create-reviews.dto';
import { PagedResult } from '@/util/utils';
import { count, desc } from 'drizzle-orm';

export class ReviewsRepository {
	async create(bookId: number, reviewDto: CreateReviewsDto): Promise<Review> {
		const response = await db
			.insert(reviewsTable)
			.values({
				bookId,
				userId: reviewDto.userId,
				content: reviewDto.content,
				rating: reviewDto.rating,
			})
			.returning();
		return response[0];
	}

	async findByBookId(
		bookId: number,
		page: number,
		pageSize: number,
	): Promise<PagedResult<Review[]>> {
		const offset = (page - 1) * pageSize;
		const resp = await db
			.select({
				created_at: reviewsTable.created_at,
				content: reviewsTable.content,
				userId: reviewsTable.userId,
				bookId: reviewsTable.bookId,
				id: reviewsTable.id,
				rating: reviewsTable.rating,
			})
			.from(reviewsTable)
			.where(eq(reviewsTable.bookId, bookId))
			.orderBy(desc(reviewsTable.created_at))
			.limit(pageSize)
			.offset(offset);

		const totalCount = await db
			.select({ count: count() })
			.from(reviewsTable)
			.where(eq(reviewsTable.bookId, bookId));

		return {
			data: resp as Review[],
			total: totalCount[0]?.count || 0,
			page: page,
			pageSize: pageSize,
		};
	}

	async findAllByBookId(bookId: number): Promise<Review[]> {
		const resp = await db
			.select({
				created_at: reviewsTable.created_at,
				content: reviewsTable.content,
				userId: reviewsTable.userId,
				bookId: reviewsTable.bookId,
				id: reviewsTable.id,
				rating: reviewsTable.rating,
			})
			.from(reviewsTable)
			.where(eq(reviewsTable.bookId, bookId));

		return resp as Review[];
	}
}
