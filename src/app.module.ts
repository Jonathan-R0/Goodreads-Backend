import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BasicController } from './util/basic.controller';
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';
import { BookInProgressModule } from './bookinprogress/bookinprogress.module';
import { ReviewModule } from './book/reviews/reviews.module';
import { CommentsModule } from './bookinprogress/comments/comments.module';
import { QuestionsModule } from './questions/questions.module';
import { NewsModule } from './news/news.module';
import { NotificationModule } from './notifications/notifications.module';

@Module({
	imports: [
		UserModule,
		BookModule,
		AuthModule,
		BookInProgressModule,
		ReviewModule,
		CommentsModule,
		QuestionsModule,
		NewsModule,
		NotificationModule,
	],
	controllers: [BasicController],
	providers: [],
})
export class AppModule {}
