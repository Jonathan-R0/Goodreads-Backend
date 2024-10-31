import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, Min, Max } from "class-validator";

export class CreateCommentsDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    @Min(15)
    @Max(500)
    content: string;

    @IsInt()
    @IsNotEmpty()
    @ApiProperty()
    userId: number;
}
