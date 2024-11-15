import db from '@/config/db.config';
import { QuestionAndUser, questionsTable } from './questions.entity';
import { desc, eq, inArray } from 'drizzle-orm/expressions';
import { CreateQuestionsDto } from './dto/create-questions.dto';
import { count, getTableColumns } from 'drizzle-orm';
import usersTable from '@/user/user.entity';
import { PagedResult } from '@/util/utils';
import answerTable from './answer/answer.entity';

export class QuestionsRepository {
	async create(authorId: number, questionDto: CreateQuestionsDto) {
		await db.insert(questionsTable).values({
			authorId,
			userId: questionDto.userId,
			content: questionDto.content,
		});
	}

	public async getQuestionsAndUsers(authorId: number, page?: number, pageSize?: number): Promise<QuestionAndUser[]> {
		const { password, ...rest } = getTableColumns(usersTable);
	
		const partialResp = await db
			.select({
				user: { ...rest },
				question: questionsTable,
			})
			.from(questionsTable)
			.innerJoin(usersTable, eq(questionsTable.userId, usersTable.id))
			.where(eq(questionsTable.authorId, authorId))
			.orderBy(desc(questionsTable.created_at))
			.limit(pageSize || 10)
			.offset(page ? (page - 1) * (pageSize || 10) : 0);
	
		const questionsMap = new Map<number, QuestionAndUser>();
	
		for (const row of partialResp) {
			const questionId = row.question.id;
	
			if (!questionsMap.has(questionId)) {
				questionsMap.set(questionId, {
					user: row.user,
					question: row.question,
					answers: [], // Respuestas vacías por ahora
				});
			}
		}
	
		return Array.from(questionsMap.values());
	}
	

	public async addAnswersToQuestions(questions: QuestionAndUser[]): Promise<QuestionAndUser[]> {
		// Obtener las respuestas para todas las preguntas
		const answerColumns = getTableColumns(answerTable);
		const questionIds = questions.map(q => q.question.id);
	
		const answersResp = await db
			.select({
				answer: answerColumns,
			})
			.from(answerTable)
			.where(inArray(answerTable.questionId, questionIds));
	
		// Agregar las respuestas correspondientes a cada pregunta
		questions.forEach((q) => {
			q.answers = answersResp
				.filter((answerRow) => answerRow.answer.questionId === q.question.id)
				.map((answerRow) => answerRow.answer);
		});
	
		// Ordenar las respuestas por fecha
		questions.forEach((q) => {
			q.answers.sort(
				(a, b) => new Date(a.created_at!).getTime() - new Date(b.created_at!).getTime()
			);
		});
	
		return questions;
	}
	


	public async findAllQuestions(
		authorId: number,
		page?: number,
		pageSize?: number,
	): Promise<PagedResult<QuestionAndUser[]>> {
		// Obtener las preguntas y los usuarios
		const questions = await this.getQuestionsAndUsers(authorId, page, pageSize);
	
		// Obtener las respuestas y asociarlas con las preguntas
		const questionsWithAnswers = await this.addAnswersToQuestions(questions);
	
		// Obtener el total de preguntas
		const totalResp = await db
			.select({ count: count() })
			.from(questionsTable)
			.where(eq(questionsTable.authorId, authorId));
	
		const totalCount = totalResp[0]?.count || 0;
	
		// Devolver el resultado con paginado
		return {
			data: questionsWithAnswers,
			total: totalCount,
			page: page || 1,
			pageSize: pageSize || 10,
		};
	}
	
	
}
