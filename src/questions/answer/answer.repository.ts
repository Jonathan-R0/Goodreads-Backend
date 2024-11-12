import db from '@/config/db.config';
import { Injectable } from '@nestjs/common';
import answerTable from './answer.entity';

@Injectable()
export class AnswersRepository {
	constructor() {}

	public async create(questionId: number, answer: string): Promise<void> {
		await db.insert(answerTable).values({
			questionId: questionId,
			text: answer,
		});
	}
}
