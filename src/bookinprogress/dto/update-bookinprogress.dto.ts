import { PartialType } from '@nestjs/mapped-types';
import { CreateBookInProgressDto } from './create-bookinprogress.dto';

export class UpdateBookInProgressDto extends PartialType(CreateBookInProgressDto) {}
