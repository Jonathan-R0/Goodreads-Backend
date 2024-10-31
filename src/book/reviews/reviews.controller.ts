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
import { ReviewsService } from './reviews.service';
import { Review } from './reviews.entity';
import { StandardResponse, success } from '@/util/utils';
import { AuthGuard } from '@/auth/auth.guard';
import { CreateReviewsDto } from '../dto/create-reviews.dto';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
	constructor(private readonly reviewsService: ReviewsService) {}

	@Post('/:bookId')
	@ApiOperation({ summary: 'Create Review' })
	@ApiResponse({ status: 201, description: 'Creates a review object.' })
	@UseGuards(AuthGuard)
	public async createReview(
		@Param('bookId') bookId: number,
		@Body() reviewDto: CreateReviewsDto,
	): Promise<StandardResponse<void>> {
		await this.reviewsService.createReview(bookId, reviewDto);
		return success();
	}

	@Get('/:bookId/')
	@ApiOperation({ summary: 'Get Reviews for a Book' })
	@ApiResponse({ status: 200, description: 'Returns a list of reviews.' })
	public async getReviewsForBook(
		@Param('bookId') bookId: number,
		@Query('page') page: number,
		@Query('pageSize') pageSize: number,
	): Promise<StandardResponse<Review[]>> {
		const reviews = await this.reviewsService.getReviewsForBook(
			bookId,
			page,
			pageSize,
		);
		return success(reviews);
	}

	@Get('/:bookId/average-rating')
	@ApiOperation({ summary: 'Get Average Rating for a Book' })
	@ApiResponse({
		status: 200,
		description: 'Returns the average rating for a book.',
	})
	public async getAverageRatingForBook(
		@Param('bookId') bookId: number,
	): Promise<StandardResponse<number | null>> {
		const averageRating =
			await this.reviewsService.getAverageRatingForBook(bookId);
		return success(averageRating);
	}
}
