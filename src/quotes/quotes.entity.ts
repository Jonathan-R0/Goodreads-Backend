import { InferSelectModel } from 'drizzle-orm';
import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const quotesTable = pgTable('quotes', {
	id: serial('id').primaryKey(),
	text: text('text'),
	author: varchar('author', { length: 256 }),
});

export default quotesTable;

export type Quote = InferSelectModel<typeof quotesTable>;
