import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { BookController } from './book.controller';
import { BookRepository } from './book.repository';
import { BookService } from './book.service';
import { UserModule } from '@/user/user.module';
dotenv.config();

@Module({
	imports: [UserModule],
	controllers: [BookController],
	providers: [BookService, BookRepository],
	exports: [BookService],
})
export class BookModule {}
