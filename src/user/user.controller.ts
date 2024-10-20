import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService as UserService } from './user.service';
import { User } from '@/user/user.entity';
import { StandardResponse, success } from '@/util/utils';
import { UserDto } from './user.dto';

@ApiTags('Users')
@Controller()
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('/:id')
	@ApiOperation({ summary: 'Get User' })
	@ApiResponse({ status: 200, description: 'Returns a user object.' })
	async getUser(@Param('id') id: number): Promise<StandardResponse<User>> {
		return success(await this.userService.findById(Number(id)));
	}

	@Post('/')
	@ApiOperation({ summary: 'Create User' })
	@ApiResponse({ status: 201, description: 'Creates a user object.' })
	public async createUser(
		@Body() user: UserDto,
	): Promise<StandardResponse<User>> {
		return success(await this.userService.create(user));
	}

	@Put('/:id')
	@ApiOperation({ summary: 'Update User' })
	@ApiResponse({ status: 200, description: 'Updates a user object.' })
	public async updateUser(
		@Param('id') id: number,
		@Body() user: UserDto,
	): Promise<StandardResponse<User>> {
		return success(
			await this.userService.update({ ...user, id: Number(id) }),
		);
	}

	@Delete('/:id')
	@ApiOperation({ summary: 'Delete User' })
	@ApiResponse({
		status: 200,
		description: 'Deletes and returns a user object.',
	})
	public async deleteUser(
		@Param('id') id: string,
	): Promise<StandardResponse<User>> {
		return success(await this.userService.delete(id));
	}
}
