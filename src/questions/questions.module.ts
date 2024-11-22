import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { UserModule } from '@/user/user.module';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { QuestionsRepository } from './questions.repository';
import { AnswersRepository } from './answer/answer.repository';
import { AnswersService } from './answer/answer.service';
import { NotificationModule } from '@/notifications/notifications.module';
dotenv.config();

@Module({
	imports: [UserModule, NotificationModule],
	controllers: [QuestionsController],
	providers: [
		QuestionsService,
		QuestionsRepository,
		AnswersService,
		AnswersRepository,
	],
	exports: [QuestionsService],
})
export class QuestionsModule {}
