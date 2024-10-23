import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class UserDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	name: string;

	@IsEmail()
	@IsNotEmpty()
	@ApiProperty()
	email: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	password: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	role: string;

	@IsEmail()
	@IsNotEmpty()
	@ApiProperty()
	biography: string;
}
