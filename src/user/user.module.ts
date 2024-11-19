import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import * as dotenv from 'dotenv';
import { UserRepository } from './user.repository';
import { FollowService } from './follows/follow.service';
import { FollowRepository } from './follows/follow.repository';
import { RecommendedService } from './recommended/recommended.service';
import { RecommendedRepository } from './recommended/recommended.repository';
dotenv.config();

@Module({
	imports: [],
	controllers: [UserController],
	providers: [
		UserService,
		FollowService,
		UserRepository,
		FollowRepository,
		RecommendedService,
		RecommendedRepository,
	],
	exports: [UserService, FollowRepository],
})
export class UserModule {}
