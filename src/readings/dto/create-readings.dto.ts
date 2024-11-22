import { IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ReadingType } from './reading-type.enum';

export class CreateReadingsDto {
	@IsNumber()
	@IsNotEmpty()
	@ApiProperty()
	userId: number;

	@IsNumber()
	@IsNotEmpty()
	@ApiProperty()
	booksId: number;

	@IsEnum(ReadingType)
	@IsNotEmpty()
	@ApiProperty({ enum: ReadingType })
	type: ReadingType;
}
