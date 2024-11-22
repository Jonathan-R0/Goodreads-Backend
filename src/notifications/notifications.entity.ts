import usersTable from '@/user/user.entity';
import { InferSelectModel } from 'drizzle-orm';
import {
	boolean,
	integer,
	pgTable,
	serial,
	text,
	timestamp,
} from 'drizzle-orm/pg-core';

export const notificationTable = pgTable('notification', {
	id: serial('id').primaryKey(),
	user_id: integer('user_id').references(() => usersTable.id),
	type: text('type'),
	read: boolean('read').default(false),
	reference_id: integer('reference_id'),
	created_at: timestamp('created_at').defaultNow(),
});

export default notificationTable;

export type Notification = InferSelectModel<typeof notificationTable>;

export interface NotificationsResponse {
	notifications: Notification[];
	unreadCount: number;
}
