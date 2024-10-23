import db from '@/config/db.config';
import { Injectable } from '@nestjs/common';
import { followsTable } from './follow.entity';
import { and, eq } from 'drizzle-orm';
import usersTable, { User } from '../user.entity';

@Injectable()
export class FollowRepository {
	constructor() {}

	public async delete(followerId: number, followingId: number) {
		await db
			.delete(followsTable)
			.where(
				and(
					eq(followsTable.followerId, followerId),
					eq(followsTable.followingId, followingId),
				),
			);
	}

	public async create(followerId: number, followingId: number) {
		await db.insert(followsTable).values({
			followerId,
			followingId,
		});
	}

	public async findFollowers(userId: number): Promise<User[]> {
		const resp = await db
			.select({
				users: usersTable,
			})
			.from(usersTable)
			.fullJoin(followsTable, eq(usersTable.id, followsTable.followerId))
			.where(eq(followsTable.followingId, userId));
		return resp
			.filter((x): x is { users: User } => x !== null && x.users !== null)
			.map((r) => r.users);
	}

	public async findFollowing(userId: number): Promise<User[]> {
		const resp = await db
			.select({
				users: usersTable,
			})
			.from(usersTable)
			.fullJoin(followsTable, eq(usersTable.id, followsTable.followingId))
			.where(eq(followsTable.followerId, userId));
		return resp
			.filter((x): x is { users: User } => x !== null && x.users !== null)
			.map((r) => r.users);
	}

	public async isFollowing(
		followerId: number,
		followingId: number,
	): Promise<boolean> {
		const resp = await db
			.select()
			.from(followsTable)
			.where(
				and(
					eq(followsTable.followerId, followerId),
					eq(followsTable.followingId, followingId),
				),
			);

		return resp.length > 0;
	}
}
