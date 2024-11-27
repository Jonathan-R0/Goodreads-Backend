import usersTable from '@/user/user.entity';
import { InferSelectModel } from 'drizzle-orm';
import { pgTable, integer, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const bookInProgressUpdateTable = pgTable('booksinprogressupdate', {
	id: serial('id').primaryKey(),
	author_id: integer('author_id').references(() => usersTable.id),
	book_excerpt: text('book_excerpt'),
	progress_percentage: integer('progress_percentage'),
	created_at: timestamp('created_at').defaultNow(),
});

export default bookInProgressUpdateTable;

export type BookInProgress = InferSelectModel<typeof bookInProgressUpdateTable>;
