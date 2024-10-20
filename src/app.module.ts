import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BasicController } from './util/basic.controller';

@Module({
	imports: [UserModule],
	controllers: [BasicController],
	providers: [],
})
export class AppModule {}
