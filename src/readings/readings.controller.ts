import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	UseGuards,
	Query,
	HttpException,
	HttpStatus,
	Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReadingsService } from './readings.service';
import { CreateReadingsDto } from './dto/create-readings.dto';
import { PagedResult, StandardResponse, success } from '@/util/utils';
import { AuthGuard } from '@/auth/auth.guard';
import { Book } from '@/book/book.entity';

@ApiTags('Readings')
@Controller('readings')
export class ReadingsController {
	constructor(private readonly readingsService: ReadingsService) {}

	@Post('/')
	@ApiOperation({ summary: 'Create Reading' })
	@ApiResponse({ status: 201, description: 'Creates a reading entry.' })
	@UseGuards(AuthGuard)
	public async createReading(
		@Body() createReadingDto: CreateReadingsDto,
	): Promise<StandardResponse<void>> {
		await this.readingsService.createReading(createReadingDto);
		return success();
	}

	@Get('/:userId/book/:bookId')
	@ApiOperation({ summary: 'Get User Reading' })
	@ApiResponse({
		status: 200,
		description: 'Returns reading categorized by type.',
	})
	public async getTypeReading(
		@Param('userId') userId: number,
		@Param('bookId') bookId: number,
	): Promise<StandardResponse<any>> {
		const readings = await this.readingsService.getTypeReadingByUser(
			userId,
			bookId,
		);
		return success(readings);
	}

	@Delete('/:userId/book/:bookId')
	@ApiOperation({ summary: 'Delete User Reading' })
	@ApiResponse({
		status: 200,
		description: 'Deletes a reading entry.',
	})
	@UseGuards(AuthGuard)
	public async deleteReading(
		@Param('userId') userId: number,
		@Param('bookId') bookId: number,
	): Promise<StandardResponse<void>> {
		await this.readingsService.deleteReading(userId, bookId);
		return success();
	}

	@Get('/:userId/type/:type')
	@ApiOperation({ summary: 'Get User Readings' })
	@ApiResponse({
		status: 200,
		description: 'Returns readings categorized by type.',
	})
	@ApiResponse({
		status: 400,
		description: 'Invalid pagination parameters (page or pageSize)',
	})
	public async getReadingsByType(
		@Param('userId') userId: number,
		@Param('type') type: string,
		@Query('page') page: string = '1',
		@Query('pageSize') pageSize: string = '10',
	): Promise<StandardResponse<PagedResult<Book[]>>> {
		const pageInt = parseInt(page);
		const pageSizeInt = parseInt(pageSize);

		if (isNaN(pageInt) || pageInt <= 0) {
			throw new HttpException(
				'Page parameter must be a positive number.',
				HttpStatus.BAD_REQUEST,
			);
		}

		if (isNaN(pageSizeInt) || pageSizeInt <= 0) {
			throw new HttpException(
				'PageSize parameter must be a positive number.',
				HttpStatus.BAD_REQUEST,
			);
		}

		const books = await this.readingsService.getReadingsByType(
			userId,
			type,
			pageInt,
			pageSizeInt,
		);
		return success(books);
	}
}
