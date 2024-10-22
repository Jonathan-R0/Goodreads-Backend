import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class LoginDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	password: string;

	@IsEmail()
	@IsNotEmpty()
	@ApiProperty()
	email: string;
}
