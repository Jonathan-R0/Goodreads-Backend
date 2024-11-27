import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { BookInProgressService } from './bookinprogress.service';
import { BookInProgressController } from './bookinprogress.controller';
import { UserModule } from '@/user/user.module';
import { BookInProgressRepository } from './bookinprogrees.repository';
import { NotificationModule } from '@/notifications/notifications.module';
import { BookInProgressUpdateRepository } from './bookinprogressupdate/bookinprogressupdate.repository';
import { BookInProgressUpdateService } from './bookinprogressupdate/bookinprogressupdate.service';
import { FollowService } from '@/user/follows/follow.service';
dotenv.config();

@Module({
	imports: [UserModule, NotificationModule],
	controllers: [BookInProgressController],
	providers: [
		BookInProgressService,
		BookInProgressRepository,
		BookInProgressUpdateRepository,
		BookInProgressUpdateService,
		FollowService,
	],
	exports: [BookInProgressService],
})
export class BookInProgressModule {}
