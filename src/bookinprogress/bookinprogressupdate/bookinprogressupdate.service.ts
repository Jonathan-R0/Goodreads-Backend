import { BaseService } from '@/util/base.service';
import { Injectable } from '@nestjs/common';
import { BookInProgressUpdateRepository } from './bookinprogressupdate.repository';
import bookInProgressUpdateTable from './bookinprogressupdate.entity';
import { User } from '@/user/user.entity';

@Injectable()
export class BookInProgressUpdateService extends BaseService<
	typeof bookInProgressUpdateTable,
	BookInProgressUpdateRepository
> {
	constructor(
		private readonly bookInProgressUpdateRepository: BookInProgressUpdateRepository,
	) {
		super(bookInProgressUpdateRepository);
	}

	public async listExcerpt(
		authors: User[],
		page?: number,
		pageSize?: number,
	) {
		return await this.bookInProgressUpdateRepository.listExcerpt(
			authors,
			page,
			pageSize,
		);
	}

	public async listProgress(
		authors: User[],
		page?: number,
		pageSize?: number,
	) {
		return await this.bookInProgressUpdateRepository.listProgress(
			authors,
			page,
			pageSize,
		);
	}
}
