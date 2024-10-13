import { InferSelectModel } from 'drizzle-orm';
import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 256 }),
	email: text('email'),
	password: text('password'),
	role: text('role'),
});

export default usersTable;

export type User = InferSelectModel<typeof usersTable>;
