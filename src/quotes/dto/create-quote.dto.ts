import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateQuoteDto {
	@IsNotEmpty()
	@ApiProperty()
	readonly text: string;
	@IsNotEmpty()
	@ApiProperty()
	readonly author: string;
}
