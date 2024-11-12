import db from '@/config/db.config';
import { QuestionAndUser, questionsTable } from './questions.entity';
import { eq } from 'drizzle-orm/expressions';
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

	public async findAllQuestions(
		authorId: number,
		page?: number,
		pageSize?: number,
	): Promise<PagedResult<QuestionAndUser[]>> {
		const { password, ...rest } = getTableColumns(usersTable);
		const answerColumns = getTableColumns(answerTable);

		const partialResp = await db
			.select({
				user: { ...rest },
				question: questionsTable,
				answer: answerColumns,
			})
			.from(questionsTable)
			.innerJoin(usersTable, eq(questionsTable.userId, usersTable.id))
			.leftJoin(
				answerTable,
				eq(questionsTable.id, answerTable.questionId),
			)
			.where(eq(questionsTable.authorId, authorId))
			.orderBy(questionsTable.id)
			.limit(pageSize || 10)
			.offset(page ? (page - 1) * (pageSize || 10) : 0);

		const questionsMap = new Map<number, QuestionAndUser>();

		for (const row of partialResp) {
			const questionId = row.question.id;

			if (!questionsMap.has(questionId)) {
				questionsMap.set(questionId, {
					user: row.user,
					question: { ...row.question, answers: [] },
				});
			}

			if (row.answer) {
				questionsMap.get(questionId)!.question.answers.push(row.answer);
			}
		}

		let data = Array.from(questionsMap.values()).map((item) => {
			item.question.answers.sort(
				(a, b) =>
					new Date(a.created_at!).getTime() -
					new Date(b.created_at!).getTime(),
			);
			return item;
		});

		data = Array.from(questionsMap.values());

		const totalResp = await db
			.select({ count: count() })
			.from(questionsTable)
			.where(eq(questionsTable.authorId, authorId));

		const totalCount = totalResp[0]?.count || 0;

		return {
			data,
			total: totalCount,
			page: page || 1,
			pageSize: pageSize || 10,
		};
	}
}
