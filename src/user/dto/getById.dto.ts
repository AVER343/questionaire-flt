import { Optional } from '@nestjs/common';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  Validate,
} from 'class-validator';

export class GetByIdDTO {
  @IsNumber()
  id: string;
  
}
