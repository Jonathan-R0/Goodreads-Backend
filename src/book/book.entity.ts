import usersTable, { User } from '@/user/user.entity';
import { InferSelectModel } from 'drizzle-orm';
import { pgTable, integer, serial, varchar, text } from 'drizzle-orm/pg-core';

export const booksTable = pgTable('books', {
	id: serial('id').primaryKey(),
	title: varchar('title', { length: 256 }),
	description: text('description'),
	genre: varchar('genre', { length: 256 }),
	publisher: varchar('publisher', { length: 256 }),
	publication_date: varchar('publication_date', { length: 256 }),
	language: varchar('language', { length: 256 }),
	image: text('image'),
	author_id: integer('author_id').references(() => usersTable.id),
});

export default booksTable;

export type Book = InferSelectModel<typeof booksTable>;

export type BookAndAuthor = { user: Omit<User, 'password'>; book: Book };
