import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { UserModule } from '@/user/user.module';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { QuestionsRepository } from './questions.repository';
dotenv.config();

@Module({
	imports: [UserModule],
	controllers: [QuestionsController],
	providers: [QuestionsService, QuestionsRepository],
	exports: [QuestionsService],
})
export class QuestionsModule {}
