import { pgTable, integer, serial, text, timestamp } from 'drizzle-orm/pg-core';
import questionsTable from '../questions.entity';
import { InferSelectModel } from 'drizzle-orm';

export const answerTable = pgTable('answer', {
	id: serial('id').primaryKey(),
	text: text('text'),
	questionId: integer('questionId').references(() => questionsTable.id),
	created_at: timestamp('created_at').defaultNow(),
});

export default answerTable;

export type Answer = InferSelectModel<typeof answerTable>;
