import usersTable from '@/user/user.entity';
import { InferSelectModel } from 'drizzle-orm';
import { pgTable, integer, serial, varchar, text } from 'drizzle-orm/pg-core';

export const booksTable = pgTable('books', {
	id: serial('id').primaryKey(),
	title: varchar('title', { length: 256 }),
	description: text('description'),
	author_id: integer('author_id').references(() => usersTable.id),
});

export default booksTable;

export type Book = InferSelectModel<typeof booksTable>;
