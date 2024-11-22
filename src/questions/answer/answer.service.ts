import { Injectable } from '@nestjs/common';
import { AnswersRepository } from './answer.repository';
import { Question } from '../questions.entity';

@Injectable()
export class AnswersService {
	constructor(private readonly answersRepository: AnswersRepository) {}

	create(
		questionId: number,
		answer: string,
		question: Question,
	): Promise<void> {
		const authorId = question.authorId;

		const userId = question.userId;
		this.answersRepository.createAnswerNotification(authorId, userId);
		return this.answersRepository.create(questionId, answer);
	}
}
