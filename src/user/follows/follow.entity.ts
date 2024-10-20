import { pgTable, integer, primaryKey } from 'drizzle-orm/pg-core';
import usersTable from '../user.entity';

export const followsTable = pgTable(
	'follows',
	{
		followerId: integer('follower_id').references(() => usersTable.id),
		followingId: integer('following_id').references(() => usersTable.id),
	},
	(table) => {
		return {
			pk: primaryKey(table.followerId, table.followingId),
		};
	},
);
