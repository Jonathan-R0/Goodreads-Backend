import db from '@/config/db.config';
import { Injectable } from '@nestjs/common';
import { recommendedTable } from './recommended.entity';
import { and, eq } from 'drizzle-orm';
import usersTable, { User } from '../user.entity';

@Injectable()
export class RecommendedRepository {
	constructor() {}

	public async delete(
		recommendingId: number,
		recommendedId: number,
	): Promise<void> {
		await db
			.delete(recommendedTable)
			.where(
				and(
					eq(recommendedTable.recommendingId, recommendingId),
					eq(recommendedTable.recommendedId, recommendedId),
				),
			);
	}

	public async create(
		recommendingId: number,
		recommendedId: number,
	): Promise<void> {
		await db.insert(recommendedTable).values({
			recommendingId,
			recommendedId,
		});
	}

	public async findRecommended(
		userId: number,
	): Promise<Omit<User, 'password'>[]> {
		const resp = await db
			.select({
				id: usersTable.id,
				name: usersTable.name,
				role: usersTable.role,
				biography: usersTable.biography,
                email: usersTable.email,
			})
			.from(usersTable)
			.fullJoin(
				recommendedTable,
				eq(usersTable.id, recommendedTable.recommendedId),
			)
			.where(eq(recommendedTable.recommendingId, userId));

		return resp as Omit<User, 'password'>[];
	}

	public async isRecommended(
		recommendingId: number,
		recommendedId: number,
	): Promise<boolean> {
		const resp = await db
			.select()
			.from(recommendedTable)
			.where(
				and(
					eq(recommendedTable.recommendingId, recommendingId),
					eq(recommendedTable.recommendedId, recommendedId),
				),
			);

		return resp.length > 0;
	}
}
