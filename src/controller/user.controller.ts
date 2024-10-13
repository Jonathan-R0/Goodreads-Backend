import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService as UserService } from '../services/user.service';
import { User } from '@/entities/user.entity';

@ApiTags('Users')
@Controller()
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('health')
	@ApiOperation({ summary: 'Test service health status.' })
	@ApiResponse({
		status: 200,
		description: 'Returns ok response if the service is up.',
	})
	@HttpCode(200)
	emptyResponse() {
		return { status: 'ok' };
	}

	@Get('/user/:id')
	@ApiOperation({ summary: 'Get User' })
	@ApiResponse({ status: 200, description: 'Returns a user object.' })
	async getUser(@Param('id') id: number): Promise<User[]> {
		return await this.userService.getUser(id);
	}
}
