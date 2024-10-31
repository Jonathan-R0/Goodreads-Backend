import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BasicController } from './util/basic.controller';
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';
import { BookInProgressModule } from './bookinprogress/bookinprogress.module';

@Module({
	imports: [UserModule, BookModule, AuthModule, BookInProgressModule],
	controllers: [BasicController],
	providers: [],
})
export class AppModule {}
