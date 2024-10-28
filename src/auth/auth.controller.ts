import {
	Body,
	Controller,
	Get,
	HttpCode,
	Injectable,
	Post,
	Req,
	UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { UserService } from '@/user/user.service';
import { StandardResponse, successWithoutUserPassword } from '@/util/utils';
import { PasswordlessUser } from '@/user/user.entity';

@Injectable()
@Controller('auth')
export class AuthController {
	constructor(
		private readonly usersService: UserService,
		private readonly authService: AuthService,
	) {}

	@Post('login')
	@ApiOperation({ summary: 'Login with your user credentials.' })
	@ApiResponse({
		status: 200,
		description: 'Returns session token',
	})
	@HttpCode(200)
	public signIn(
		@Body() signInDto: LoginDto,
	): Promise<{ id: number; access_token: string; role: string }> {
		return this.authService.signIn(signInDto.email, signInDto.password);
	}

	@Get('profile')
	@UseGuards(AuthGuard)
	@ApiOperation({
		summary: 'Get your own profile information based on your login token',
	})
	@ApiResponse({
		status: 200,
		description: 'Returns my user',
	})
	@HttpCode(200)
	public async getProfile(
		@Req() req: Request & { user: Record<string, any> },
	): Promise<StandardResponse<PasswordlessUser>> {
		return successWithoutUserPassword(
			await this.usersService.getUserByEmail(req.user.sub),
		);
	}
}
