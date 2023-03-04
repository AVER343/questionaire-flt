import { Optional } from '@nestjs/common';
import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginUserDTO {
  @IsString()
  @MaxLength(63)
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}
