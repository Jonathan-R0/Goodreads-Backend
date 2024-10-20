import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import * as dotenv from 'dotenv';
import { UserRepository } from './user.repository';
import { FollowService } from './follows/follow.service';
import { FollowRepository } from './follows/follow.repository';
dotenv.config();

@Module({
	imports: [],
	controllers: [UserController],
	providers: [UserService, FollowService, UserRepository, FollowRepository],
	exports: [UserService],
})
export class UserModule {}
