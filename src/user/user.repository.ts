import { BaseRepository } from '@/util/base.repository';
import usersTable from './user.entity';
import db from '@/config/db.config';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm/expressions';
import { takeUniqueOrThrow } from '@/util/utils';

@Injectable()
export class UserRepository extends BaseRepository<typeof usersTable> {
	constructor() {
		super(usersTable, usersTable.id);
	}

	public async findByEmail(email: string) {
		return await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.email, email))
			.then(takeUniqueOrThrow);
	}
}
