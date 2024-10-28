import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService as UserService } from './user.service';
import { PasswordlessUser } from '@/user/user.entity';
import {
	StandardResponse,
	success,
	successWithoutUserPassword,
	successWithoutUsersPasswords,
} from '@/util/utils';
import { UserDto } from './user.dto';
import { FollowService } from './follows/follow.service';
import * as bcrypt from 'bcryptjs';
import { AuthGuard } from '@/auth/auth.guard';

@ApiTags('Users')
@Controller('user')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly followService: FollowService,
	) {}

	@Get('/:id')
	@ApiOperation({ summary: 'Get User' })
	@ApiResponse({ status: 200, description: 'Returns a user object.' })
	@UseGuards(AuthGuard)
	async getUser(
		@Param('id') id: number,
	): Promise<StandardResponse<PasswordlessUser>> {
		return successWithoutUserPassword(
			await this.userService.findById(Number(id)),
		);
	}

	@Post('/')
	@ApiOperation({ summary: 'Create User' })
	@ApiResponse({ status: 201, description: 'Creates a user object.' })
	public async createUser(
		@Body() user: UserDto,
	): Promise<StandardResponse<PasswordlessUser>> {
		return successWithoutUserPassword(
			await this.userService.createUser({
				...user,
				password: bcrypt.hashSync(user.password),
			}),
		);
	}

	@Put('/:id')
	@ApiOperation({ summary: 'Update User' })
	@ApiResponse({ status: 200, description: 'Updates a user object.' })
	@UseGuards(AuthGuard)
	public async updateUser(
		@Param('id') id: number,
		@Body() user: UserDto,
	): Promise<StandardResponse<PasswordlessUser>> {
		return successWithoutUserPassword(
			await this.userService.update({ ...user, id: Number(id) }),
		);
	}

	@Delete('/:id')
	@ApiOperation({ summary: 'Delete User' })
	@ApiResponse({
		status: 200,
		description: 'Deletes and returns a user object.',
	})
	@UseGuards(AuthGuard)
	public async deleteUser(
		@Param('id') id: string,
	): Promise<StandardResponse<PasswordlessUser>> {
		return successWithoutUserPassword(await this.userService.delete(id));
	}

	@Post(':id/follow/:otherId')
	@ApiOperation({ summary: 'Follow User' })
	@ApiResponse({ status: 200, description: 'Follows a user.' })
	@UseGuards(AuthGuard)
	public async followUser(
		@Param('id') id: number,
		@Param('otherId') otherId: number,
	): Promise<StandardResponse<void>> {
		return success(
			await this.followService.follow(Number(id), Number(otherId)),
		);
	}

	@Delete(':id/unfollow/:otherId')
	@ApiOperation({ summary: 'Unfollow User' })
	@ApiResponse({ status: 200, description: 'Unfollows a user.' })
	@UseGuards(AuthGuard)
	public async unfollowUser(
		@Param('id') id: number,
		@Param('otherId') otherId: number,
	): Promise<StandardResponse<void>> {
		return success(
			await this.followService.unfollow(Number(id), Number(otherId)),
		);
	}

	@Get('/followers/:id')
	@ApiOperation({ summary: 'Get Followers' })
	@ApiResponse({ status: 200, description: 'Returns a list of followers.' })
	@UseGuards(AuthGuard)
	public async getFollowers(
		@Param('id') userId: number,
	): Promise<StandardResponse<PasswordlessUser[]>> {
		return successWithoutUsersPasswords(
			await this.followService.getFollowers(Number(userId)),
		);
	}

	@Get('/following/:id')
	@ApiOperation({ summary: 'Get Following' })
	@ApiResponse({ status: 200, description: 'Returns a list of following.' })
	@UseGuards(AuthGuard)
	public async getFollowing(
		@Param('id') userId: number,
	): Promise<StandardResponse<PasswordlessUser[]>> {
		return successWithoutUsersPasswords(
			await this.followService.getFollowing(Number(userId)),
		);
	}

	@Get('/:id/following/:otherId')
	@ApiOperation({ summary: 'Check if following a user' })
	@ApiResponse({
		status: 200,
		description: 'Returns true if following, false otherwise.',
	})
	@UseGuards(AuthGuard)
	public async isFollowing(
		@Param('id') id: number,
		@Param('otherId') otherId: number,
	): Promise<StandardResponse<boolean>> {
		const isFollowing = await this.followService.isFollowing(
			Number(id),
			Number(otherId),
		);
		return success(isFollowing);
	}
}
