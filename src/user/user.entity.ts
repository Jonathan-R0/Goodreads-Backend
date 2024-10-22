import { InferSelectModel } from 'drizzle-orm';
import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 256 }),
	email: text('email').unique(),
	password: text('password'),
	role: text('role'),
	biography: text('biography'),
});

export default usersTable;

export type User = InferSelectModel<typeof usersTable>;

export type PasswordlessUser = Omit<User, 'password'>;
