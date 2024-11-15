import { pgTable, serial, integer, text, timestamp } from 'drizzle-orm/pg-core';
import usersTable, { User } from '@/user/user.entity';
import { InferSelectModel } from 'drizzle-orm';
import { Answer } from './answer/answer.entity';

export const questionsTable = pgTable('question', {
	id: serial('id').primaryKey(),
	authorId: integer('author_id')
		.notNull()
		.references(() => usersTable.id),
	userId: integer('user_id')
		.notNull()
		.references(() => usersTable.id),
	content: text('content').notNull(),
	created_at: timestamp('created_at').defaultNow(),
});

export default questionsTable;

export type Question = InferSelectModel<typeof questionsTable>;

export type QuestionAndUser = {
	user: Omit<User, 'password'>;
	question: Question;
	answers: Answer[];
};
