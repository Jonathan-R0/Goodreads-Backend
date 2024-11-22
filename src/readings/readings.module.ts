import { Module } from '@nestjs/common';
import { ReadingsService } from './readings.service';
import { ReadingsController } from './readings.controller';
import { UserModule } from '@/user/user.module';
import { BookModule } from '@/book/book.module';
import { ReadingsRepository } from './readings.repository';

@Module({
	imports: [UserModule, BookModule],
	controllers: [ReadingsController],
	providers: [ReadingsService, ReadingsRepository],
	exports: [ReadingsService],
})
export class ReadingsModule {}
