import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { UserModule } from '@/user/user.module';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { ReviewsRepository } from './reviews.repository';
import { NotificationModule } from '@/notifications/notifications.module';
import { BookModule } from '@/book/book.module';
dotenv.config();

@Module({
	imports: [UserModule, BookModule, NotificationModule],
	controllers: [ReviewsController],
	providers: [ReviewsService, ReviewsRepository],
	exports: [ReviewsService],
})
export class ReviewModule {}
