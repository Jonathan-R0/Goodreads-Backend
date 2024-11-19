import { ReviewsRepository } from './reviews.repository';
import { Review } from './reviews.entity';
import { CreateReviewsDto } from '../dto/create-reviews.dto';
import { PagedResult } from '@/util/utils';
import { NotificationService } from '../../notifications/notifications.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReviewsService {
	constructor(private readonly notificationService: NotificationService) {}
	private reviewsRepo = new ReviewsRepository();

	async createReview(
		bookId: number,
		reviewDto: CreateReviewsDto,
	): Promise<void> {
		const response = await this.reviewsRepo.create(bookId, reviewDto);
		await this.notificationService.createNewReviewNotification(
			response.id,
			response.bookId,
		);
	}

	async getReviewsForBook(
		bookId: number,
		page: number,
		pageSize: number,
	): Promise<PagedResult<Review[]>> {
		const reviews = await this.reviewsRepo.findByBookId(
			bookId,
			page,
			pageSize,
		);
		return reviews;
	}

	async getAverageRatingForBook(bookId: number): Promise<number | null> {
		const reviews = await this.reviewsRepo.findAllByBookId(bookId);

		if (reviews.length === 0) return null;

		const totalRating = reviews.reduce(
			(sum, review) => sum + review.rating,
			0,
		);
		const averageRating = totalRating / reviews.length;

		return averageRating;
	}
}
