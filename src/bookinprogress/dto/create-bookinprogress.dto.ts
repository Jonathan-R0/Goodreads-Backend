import { ApiProperty } from '@nestjs/swagger';
import {
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsString,
	Min,
	Max,
} from 'class-validator';

export class CreateBookInProgressDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	title: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	description: string;

	@IsInt()
	@IsOptional()
	@Min(0)
	@Max(100)
	@ApiProperty({ default: 0 })
	progress_percentage?: number;

	@IsString()
	@IsOptional()
	@ApiProperty()
	book_excerpt?: string;

	@IsInt()
	@IsNotEmpty()
	@ApiProperty()
	author_id: number;

	@IsOptional()
	@ApiProperty({ default: false })
	isPublished?: boolean;
}
