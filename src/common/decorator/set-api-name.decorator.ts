import { SetMetadata } from '@nestjs/common';
import { API_NAME } from '../enums/api.names.enum';

export const SetApiName = (api_name: API_NAME) =>
  SetMetadata('API_NAME', api_name);
