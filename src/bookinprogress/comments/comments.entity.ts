import { pgTable, serial, integer, text, timestamp } from 'drizzle-orm/pg-core';
import bookInProgressTable from '../bookinprogress.entity';
import usersTable, { User } from '@/user/user.entity';
import { InferSelectModel } from 'drizzle-orm';

export const commentsTable = pgTable('comments', {
    id: serial('id').primaryKey(),
    bookId: integer('bookInProgressTable_id').notNull().references(() => bookInProgressTable.id),
    userId: integer('user_id').notNull().references(() => usersTable.id),
    content: text('content').notNull(),
    created_at: timestamp('created_at').defaultNow(),
});

export default commentsTable;

export type Comment = InferSelectModel<typeof commentsTable>;


