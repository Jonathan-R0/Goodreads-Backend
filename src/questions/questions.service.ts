import { QuestionsRepository } from './questions.repository';
import { Question, QuestionAndUser } from './questions.entity';
import { CreateQuestionsDto } from './dto/create-questions.dto';
import { PagedResult } from '@/util/utils';
import { NotificationService } from '@/notifications/notifications.service';

export class QuestionsService {
	static getQuestionsByQuestionId(questionId: number) {
		throw new Error('Method not implemented.');
	}
	constructor(private notificationService: NotificationService) {}
	private questionsRepo = new QuestionsRepository(this.notificationService);

	async createQuestions(
		authorId: number,
		questionDto: CreateQuestionsDto,
	): Promise<void> {
		await this.questionsRepo.create(authorId, questionDto);
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
