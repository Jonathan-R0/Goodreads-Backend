import { Injectable } from '@nestjs/common';
import { NotificationService } from '@/notifications/notifications.service';
import db from '@/config/db.config';
import answerTable from './answer.entity';

@Injectable()
export class AnswersRepository {
	constructor(private readonly notificationService: NotificationService) {}

	public async create(questionId: number, answer: string): Promise<void> {
		await db.insert(answerTable).values({
			questionId: questionId,
			text: answer,
		});
	}

	async createAnswerNotification(
		authorId: number,
		userId: number,
	): Promise<void> {
		this.notificationService.createNewAnswerNotification(userId, authorId);
	}
}
