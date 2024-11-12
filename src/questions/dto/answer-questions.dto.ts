import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AnswerQuestionsDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	answer: string;
}
