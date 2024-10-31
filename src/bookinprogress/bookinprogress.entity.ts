import usersTable, { User } from '@/user/user.entity';
import { InferSelectModel } from 'drizzle-orm';
import {
	pgTable,
	integer,
	serial,
	varchar,
	text,
	timestamp,
	boolean,
} from 'drizzle-orm/pg-core';

export const bookInProgressTable = pgTable('booksinprogress', {
	id: serial('id').primaryKey(),
	title: varchar('title', { length: 256 }),
	description: text('description'),
	progress_percentage: integer('progress_percentage').default(0),
	book_excerpt: text('book_excerpt'),
	author_id: integer('author_id').references(() => usersTable.id),
	isPublished: boolean('isPublished').default(false),
	created_at: timestamp('created_at').defaultNow(),
	updated_at: timestamp('updated_at')
		.defaultNow()
		.$onUpdateFn(() => new Date()),
});

export default bookInProgressTable;

export type BookInProgress = InferSelectModel<typeof bookInProgressTable>;

export type BookInProgressAndAuthor = {
	user: Omit<User, 'password'>;
	book: BookInProgress;
};
