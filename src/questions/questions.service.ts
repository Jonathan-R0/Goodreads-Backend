import { QuestionsRepository } from './questions.repository';
import { Question, QuestionAndUser } from './questions.entity';
import { CreateQuestionsDto } from './dto/create-questions.dto';
import { PagedResult } from '@/util/utils';
import { NotificationService } from '../notifications/notifications.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QuestionsService {
	// static getQuestionsByQuestionId(questionId: number) {
	// 	throw new Error('Method not implemented.');
	// }
	constructor(private notificationService: NotificationService) {
		this.notificationService = notificationService;
	}
	private questionsRepo = new QuestionsRepository();

	async createQuestions(
		authorId: number,
		questionDto: CreateQuestionsDto,
	): Promise<void> {
		await this.questionsRepo.create(authorId, questionDto);
		await this.notificationService.createNewQuestionNotification(
			authorId,
			questionDto.userId,
		);
	}

	async getQuestionsForAuthor(
		authorId: number,
		page: number,
		pageSize: number,
	): Promise<PagedResult<QuestionAndUser[]>> {
		const questions = await this.questionsRepo.findAllQuestions(
			authorId,
			page,
			pageSize,
		);
		return questions;
	}

	async getQuestionsByQuestionId(question_id: number): Promise<Question> {
		return await this.questionsRepo.getQuestionsByQuestionId(question_id);
	}
}
