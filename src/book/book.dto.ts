import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class BookDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	title: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	description: string;

	@IsInt()
	@IsNotEmpty()
	@ApiProperty()
	author_id: number;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	genre: string;

	@IsString()
	@IsNotEmpty()
	@IsOptional()
	@ApiProperty()
	publisher: string;

	@IsString()
	@IsNotEmpty()
	@IsOptional()
	@ApiProperty()
	publication_date: string;

	@IsString()
	@IsNotEmpty()
	@IsOptional()
	@ApiProperty()
	language: string;

	@IsString()
	@IsNotEmpty()
	@IsOptional()
	@ApiProperty()
	image: string;
}
