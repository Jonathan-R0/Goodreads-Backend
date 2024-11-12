import usersTable from '@/user/user.entity';
import { InferSelectModel } from 'drizzle-orm';
import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const newsTable = pgTable('news', {
	id: serial('id').primaryKey(),
	title: text('title'),
	content: text('content'),
	author_id: integer('author_id').references(() => usersTable.id),
});

export default newsTable;

export type News = InferSelectModel<typeof newsTable>;
