import { Module } from '@nestjs/common';
import { BookInProgressService } from './bookinprogress.service';
import { BookinprogressController } from './bookinprogress.controller';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [BookinprogressController],
  providers: [BookInProgressService],
  exports: [BookInProgressService],
})
export class BookInProgressModule {}




