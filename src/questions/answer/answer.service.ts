import { Injectable } from '@nestjs/common';
import { AnswersRepository } from './answer.repository';

@Injectable()
export class AnswersService {
	constructor(private readonly answersRepository: AnswersRepository) {}

	create(questionId: number, answer: string): Promise<void> {
		return this.answersRepository.create(questionId, answer);
	}
}
