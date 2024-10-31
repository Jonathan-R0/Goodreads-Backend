import {
	pgTable,
	serial,
	integer,
	text,
	decimal,
	timestamp,
	real,
} from 'drizzle-orm/pg-core';
import bookTable from '../book.entity';
import usersTable from '@/user/user.entity';
import { InferSelectModel } from 'drizzle-orm';

export const reviewsTable = pgTable('reviews', {
	id: serial('id').primaryKey(),
	bookId: integer('bookInProgressTable_id')
		.notNull()
		.references(() => bookTable.id),
	userId: integer('user_id')
		.notNull()
		.references(() => usersTable.id),
	content: text('content').notNull(),
	rating: real('rating').notNull(),
	created_at: timestamp('created_at').defaultNow(),
});

export default reviewsTable;

export type Review = InferSelectModel<typeof reviewsTable>;
