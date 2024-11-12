import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { BookInProgressService } from './bookinprogress.service';
import { BookInProgressController } from './bookinprogress.controller';
import { UserModule } from '@/user/user.module';
import { BookInProgressRepository } from './bookinprogrees.repository';
dotenv.config();

@Module({
	imports: [UserModule],
	controllers: [BookInProgressController],
	providers: [BookInProgressService, BookInProgressRepository],
	exports: [BookInProgressService],
})
export class BookInProgressModule {}
