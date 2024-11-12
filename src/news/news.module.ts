import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { NewsController } from './news.controller';
import { NewsRepository } from './news.repository';
import { NewsService } from './news.service';
import { UserModule } from '@/user/user.module';
import { FollowService } from '@/user/follows/follow.service';
import { FollowRepository } from '@/user/follows/follow.repository';
dotenv.config();

@Module({
	imports: [UserModule],
	controllers: [NewsController],
	providers: [NewsService, NewsRepository, FollowService, FollowRepository],
	exports: [NewsService],
})
export class NewsModule {}