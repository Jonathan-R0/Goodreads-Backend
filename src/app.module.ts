import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BasicController } from './util/basic.controller';
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';
import { BookInProgressModule } from './bookinprogress/bookinprogress.module';
import { ReviewModule } from './book/reviews/reviews.module';

@Module({
	imports: [
		UserModule,
		BookModule,
		AuthModule,
		BookInProgressModule,
		ReviewModule,
	],
	controllers: [BasicController],
	providers: [],
})
export class AppModule {}
