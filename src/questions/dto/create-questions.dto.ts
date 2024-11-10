import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min, Max } from 'class-validator';

export class CreateQuestionsDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	@Min(15)
	@Max(300)
	content: string;

	@IsInt()
	@IsNotEmpty()
	@ApiProperty()
	userId: number;

	@IsInt()
	@IsNotEmpty()
	@ApiProperty()
	authorId: number;
}
