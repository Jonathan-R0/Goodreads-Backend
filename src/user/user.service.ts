import usersTable, { User } from '@/user/user.entity';
import { HttpException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { BaseService } from '@/util/base.service';
import { UserDto } from './user.dto';

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

	public async createUser(user: UserDto): Promise<User> {
		const userFoundByEmail = await this.userRepository.findByEmail(
			user.email || '',
		);
		if (userFoundByEmail.email === user.email) {
			throw new HttpException('Repeated email', 400);
		}
		const userFoundByName = await this.userRepository.findByEmail(
			user.name || '',
		);
		if (userFoundByName.name === user.name) {
			throw new HttpException('Repeated name', 400);
		}
		return await this.create(user);
	}
}
