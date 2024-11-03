import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { UserModule } from '@/user/user.module';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { ReviewsRepository } from './reviews.repository';
dotenv.config();

@Module({
	imports: [UserModule],
	controllers: [ReviewsController],
	providers: [ReviewsService, ReviewsRepository],
	exports: [ReviewsService],
})
export class ReviewModule {}
