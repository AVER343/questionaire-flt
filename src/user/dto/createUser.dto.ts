import { Optional } from '@nestjs/common';
import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class CreateUserDTO {
  @ValidateIf((obj) => !obj.phoneNumber)
  @IsEmail()
  email: string;

  @ValidateIf((obj) => !obj.email)
  @IsPhoneNumber()
  phoneNumber: number;

  @IsString()
  @MaxLength(63)
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}
