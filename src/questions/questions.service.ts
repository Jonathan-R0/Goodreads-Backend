import { QuestionsRepository } from './questions.repository';
import { QuestionAndUser } from './questions.entity';
import { CreateQuestionsDto } from './dto/create-questions.dto';
import { PagedResult } from '@/util/utils';

export class QuestionsService {
	private questionsRepo = new QuestionsRepository();

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
}
