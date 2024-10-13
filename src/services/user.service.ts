import db from '@/config/db.config';
import usersTable, { User } from '@/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

@Injectable()
export class UserService {
	async getUser(id: number): Promise<User[]> {
		const resp = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.id, id));
		return resp;
	}
}
