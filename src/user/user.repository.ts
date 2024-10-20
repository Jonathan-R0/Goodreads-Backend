import { BaseRepository } from '@/util/base.repository';
import usersTable from './user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends BaseRepository<typeof usersTable> {
	constructor() {
		super(usersTable, usersTable.id);
	}
}
