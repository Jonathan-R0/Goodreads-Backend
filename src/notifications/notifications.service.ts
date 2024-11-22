import { Injectable } from '@nestjs/common';
import { NotificationRepository } from './notifications.repository';
import { BookService } from '@/book/book.service';
import { NotificationsResponse } from './notifications.entity';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { FollowRepository } from '@/user/follows/follow.repository';

@Injectable()
export class NotificationService {
	constructor(
		private readonly notificationRepository: NotificationRepository,
		private readonly bookService: BookService,
		private readonly followRepository: FollowRepository,
	) {}

	public async createNewReviewNotification(book_id: number): Promise<void> {
		const book = await this.bookService.findById(book_id);
		await this.notificationRepository.create({
			user_id: book.author_id,
			reference_id: book_id,
			type: 'NEW_REVIEW',
		});
	}

	public async updateBookInProgressNotification(
		book_id: number, // Book in progress id
		author_id: number, // Author of book in progress
	): Promise<void> {
		const followers = this.followRepository.findFollowers(author_id);
		Promise.all([
			followers.then((followers) => {
				followers.map((follower) => {
					this.notificationRepository.create({
						user_id: follower.id,
						reference_id: book_id,
						type: 'UPDATE_BOOK_IN_PROGRESS',
					});
				});
			}),
		]);
	}

	public async createNewQuestionNotification(
		author_id: number, // role: "author"
		_user_id: number, // author of the question
	): Promise<void> {
		await this.notificationRepository.create({
			user_id: author_id,
			reference_id: author_id,
			type: 'NEW_QUESTION',
		});
	}

	public async createNewAnswerNotification(
		userId: number, // author of the question
		authorId: number, // role: "author"
	): Promise<void> {
		await this.notificationRepository.create({
			user_id: userId,
			reference_id: authorId,
			type: 'NEW_ANSWER',
		});
	}

	public async createNewNewsNotification(
		news_id: number,
		author_id: number,
	): Promise<void> {
		const followers = this.followRepository.findFollowers(author_id);
		Promise.all([
			followers.then((followers) => {
				followers.map((follower) => {
					this.notificationRepository.create({
						user_id: follower.id,
						reference_id: news_id,
						type: 'NEW_NEWS',
					});
				});
			}),
		]);
	}

	public async findByUserId(id: number): Promise<NotificationsResponse> {
		return await this.notificationRepository.findByUserId(id);
	}

	public async update(
		notification_id: number,
		updateBody: UpdateNotificationDto,
	): Promise<void> {
		await this.notificationRepository.update({
			id: notification_id,
			...updateBody,
		});
	}

	public async delete(id: number): Promise<void> {
		await this.notificationRepository.delete(id);
	}
}
