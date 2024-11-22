import { BaseRepository } from '@/util/base.repository';
import notificationTable, {
	NotificationsResponse,
} from './notifications.entity';
import { and, count, eq } from 'drizzle-orm';
import db from '@/config/db.config';

export class NotificationRepository extends BaseRepository<
	typeof notificationTable
> {
	constructor() {
		super(notificationTable, notificationTable.id);
	}

	public async findByUserId(user_id: number): Promise<NotificationsResponse> {
		const [notifications, countResult] = await Promise.all([
			db
				.select()
				.from(notificationTable)
				.where(eq(notificationTable.user_id, user_id)),

			db
				.select({
					count: count(notificationTable.id),
				})
				.from(notificationTable)
				.where(
					and(
						eq(notificationTable.user_id, user_id),
						eq(notificationTable.read, false),
					),
				),
		]);
		return {
			notifications: notifications,
			unreadCount: countResult[0]?.count || 0,
		};
	}
}
