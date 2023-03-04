import { Optional } from '@nestjs/common';
import { IsNumber } from 'class-validator';
import { isStringObject } from 'util/types';

export class GetUserDTO {
  id: string;
}
