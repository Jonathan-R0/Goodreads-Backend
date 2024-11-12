import usersTable, { User } from '@/user/user.entity';
import { InferSelectModel } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const newsTable = pgTable('news', {
	id: serial('id').primaryKey(),
	title: text('title'),
	content: text('content'),
	author_id: integer('author_id').references(() => usersTable.id),
	created_at: timestamp('created_at').defaultNow(),
});

export default newsTable;

export type News = InferSelectModel<typeof newsTable>;

export type NewsAndAuthor = {
	user: Omit<User, 'password'>;
	news: News;
};
