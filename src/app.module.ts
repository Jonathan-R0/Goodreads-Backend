import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BasicController } from './util/basic.controller';
import { BookModule } from './book/book.module';

@Module({
	imports: [UserModule, BookModule],
	controllers: [BasicController],
	providers: [],
})
export class AppModule {}
