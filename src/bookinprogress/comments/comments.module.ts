import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { CommentsController } from './comments.controller';
import { CommentsRepository } from './comments.repository';
import { CommentsService } from './comments.service';
import { UserModule } from '@/user/user.module';
dotenv.config();

@Module({
	imports: [UserModule],
	controllers: [CommentsController],
	providers: [CommentsService, CommentsRepository],
	exports: [CommentsService],
})
export class CommentsModule {}
