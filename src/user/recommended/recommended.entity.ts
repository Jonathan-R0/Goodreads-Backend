import { pgTable, integer, primaryKey } from 'drizzle-orm/pg-core';
import usersTable from '../user.entity';

export const recommendedTable = pgTable(
	'recommended',
	{
		recommendingId: integer('recommending_author_id').references(() => usersTable.id),
		recommendedId: integer('recommended_author_id').references(() => usersTable.id),
	},
	(table) => {
		return {
			pk: primaryKey(table.recommendingId, table.recommendedId),
		};
	},
);
