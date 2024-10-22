import usersTable, { User } from '@/user/user.entity';
import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { BaseService } from '@/util/base.service';

@Injectable()
export class UserService extends BaseService<
	typeof usersTable,
	UserRepository
> {
	constructor(private readonly userRepository: UserRepository) {
		super(userRepository);
	}

	public async getUserByEmail(email: string): Promise<User> {
		return await this.userRepository.findByEmail(email);
	}
}
