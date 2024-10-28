import { UserService } from '@/user/user.service';
import {
	Injectable,
	Dependencies,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
@Dependencies(UserService, JwtService)
export class AuthService {
	constructor(
		private readonly usersService: UserService,
		private readonly jwtService: JwtService,
	) {
		this.usersService = usersService;
	}

	public async signIn(
		email: string,
		pass: string,
	): Promise<{ id: number; access_token: string; role: string }> {
		const user = await this.usersService.getUserByEmail(email);
		if (!(user && (await bcrypt.compare(pass, user.password || '')))) {
			throw new UnauthorizedException();
		}
		return {
			id: user.id,
			role: user.role!,
			access_token: await this.jwtService.signAsync({
				sub: user.email,
				username: user.name,
			}),
		};
	}
}
