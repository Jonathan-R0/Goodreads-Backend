import { pgTable, serial, integer, text } from 'drizzle-orm/pg-core';
import usersTable from '@/user/user.entity';
import { InferSelectModel } from 'drizzle-orm';
import booksTable from '@/book/book.entity';

export const readingsTable = pgTable('readings', {
	id: serial('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => usersTable.id, {
			onDelete: 'cascade',
		}),
	booksId: integer('books_id')
		.notNull()
		.references(() => booksTable.id, {
			onDelete: 'cascade',
		}),
	type: text('type').notNull(),
});

export default readingsTable;

export type Reading = InferSelectModel<typeof readingsTable>;
