import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BasicController } from './util/basic.controller';
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [UserModule, BookModule, AuthModule],
	controllers: [BasicController],
	providers: [],
})
export class AppModule {}
