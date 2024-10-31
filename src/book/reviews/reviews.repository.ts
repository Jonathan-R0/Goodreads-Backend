import db from '@/config/db.config';
import { reviewsTable, Review } from './reviews.entity'; 
import { eq } from 'drizzle-orm/expressions';
import { CreateReviewsDto } from '../dto/create-reviews.dto';

export class ReviewsRepository {
  
    async create(bookId: number, reviewDto: CreateReviewsDto) {
        await db
            .insert(reviewsTable) 
            .values({
                bookId,
                userId: reviewDto.userId,
                content: reviewDto.content,
                rating: reviewDto.rating,
            });
    }

    async findByBookId(bookId: number, page: number, pageSize: number): Promise<Review[]> {
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
            .orderBy(reviewsTable.created_at)
            .limit(pageSize)
            .offset(offset);

        return resp as Review[];
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
