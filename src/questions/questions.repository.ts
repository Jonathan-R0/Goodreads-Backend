import db from '@/config/db.config';
import { QuestionAndUser, questionsTable } from './questions.entity';
import { eq } from 'drizzle-orm/expressions';
import { CreateQuestionsDto } from './dto/create-questions.dto';
import { count, getTableColumns } from 'drizzle-orm';
import usersTable from '@/user/user.entity';
import { PagedResult } from '@/util/utils';

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

		const partialResp = db
			.select({
				user: { ...rest },
				question: questionsTable,
			})
			.from(questionsTable)
			.innerJoin(usersTable, eq(questionsTable.userId, usersTable.id))
			.where(eq(questionsTable.authorId, authorId));

		const resp = await (page && pageSize
			? partialResp.limit(pageSize).offset((page - 1) * pageSize)
			: partialResp);

		const totalResp = await db
			.select({ count: count() })
			.from(questionsTable)
			.where(eq(questionsTable.authorId, authorId));

		const totalCount = totalResp[0]?.count || 0;

		return {
			data: resp,
			total: totalCount,
			page: page || 0,
			pageSize: pageSize || 0,
		};
	}
}
