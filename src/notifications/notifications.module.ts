import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { NotificationService } from './notifications.service';
import { NotificationController } from './notifications.controller';
import { NotificationRepository } from './notifications.repository';
import { BookModule } from '@/book/book.module';
dotenv.config();

@Module({
	imports: [BookModule],
	controllers: [NotificationController],
	providers: [NotificationService, NotificationRepository],
	exports: [NotificationService],
})
export class NotificationModule {}
