import { Optional } from '@nestjs/common';
import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  Validate,
} from 'class-validator';

export class ResetPasswordDTO {
  @IsString()
  @IsOptional()
  @MaxLength(63)
  username: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  @Validate((obj)=>!obj.phoneNumber)
  email:string;

  @Optional()
  @Validate((obj)=>!obj.email)
  @IsPhoneNumber()
  phoneNumber: number;
  
}
