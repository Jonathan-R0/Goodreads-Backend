import usersTable, { User } from '@/user/user.entity';
import { InferSelectModel } from 'drizzle-orm';
import { pgTable, integer, serial, text, timestamp } from 'drizzle-orm/pg-core';
import bookInProgressTable, { BookInProgress } from '../bookinprogress.entity';

export const bookInProgressUpdateTable = pgTable('booksinprogressupdate', {
	id: serial('id').primaryKey(),
	author_id: integer('author_id').references(() => usersTable.id),
	book_excerpt: text('book_excerpt'),
	progress_percentage: integer('progress_percentage'),
	book_in_progress_id: integer('book_in_progress_id').references(
		() => bookInProgressTable.id,
	),
	created_at: timestamp('created_at').defaultNow(),
});

export default bookInProgressUpdateTable;

export type BookInProgressUpdate = InferSelectModel<
	typeof bookInProgressUpdateTable
>;

export type BookInProgressUpdateAndAuthor = {
	bookInProgressUpdate: BookInProgressUpdate;
	author: Omit<User, 'password'>;
	bookInProgress: BookInProgress;
};
