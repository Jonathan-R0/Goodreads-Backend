import { Injectable } from '@nestjs/common';
import { CreateReadingsDto } from './dto/create-readings.dto';
import { BaseService } from '@/util/base.service';
import readingsTable from './readings.entity';
import ReadingsRepository from './readings.repository';
import { PagedResult } from '@/util/utils';
import { Book } from '@/book/book.entity';
import { BookService } from '@/book/book.service';

@Injectable()
export class ReadingsService extends BaseService<
	typeof readingsTable,
	ReadingsRepository
> {
	constructor(
		private readonly readingsRepository: ReadingsRepository,
		private readonly bookService: BookService,
	) {
		super(readingsRepository);
	}

	async createReading(readingsDto: CreateReadingsDto): Promise<void> {
		const existingReading = await this.readingsRepository.findOneWhere({
			where: {
				userId: readingsDto.userId,
				bookId: readingsDto.booksId,
			},
		});

		// Para evitar que haya un libro en dos listados
		if (existingReading) {
			if (existingReading.type === readingsDto.type) {
				return;
			} else {
				await this.readingsRepository.update({
					...existingReading,
					type: readingsDto.type,
				});
				return;
			}
		}
		await this.readingsRepository.create(readingsDto);
	}

	async getTypeReadingByUser(userId: number, bookId: number): Promise<any> {
		const result = await this.readingsRepository.findOneWhere({
			where: {
				userId: userId,
				bookId: bookId,
			},
		});

		if (!result) {
			return { type: 'NONE' };
		}

		return { type: result.type };
	}

	async getReadingsByType(
		userId: number,
		type: string,
		page: number,
		pageSize: number,
	): Promise<PagedResult<Book[]>> {
		const result = await this.readingsRepository.findAllByType(
			userId,
			type,
			page,
			pageSize,
		);

		const bookIds = result.data.map((reading) => reading.booksId);
		const books_list = [];

		for (const bookId of bookIds) {
			const book = await this.bookService.findById(bookId);
			books_list.push(book);
		}

		return {
			data: books_list,
			total: result.total,
			page: result.page,
			pageSize: result.pageSize,
		};
	}

	async deleteReading(userId: number, bookId: number): Promise<void> {
		await this.readingsRepository.deleteByAuthorIdAndBookId(userId, bookId);
	}
}
