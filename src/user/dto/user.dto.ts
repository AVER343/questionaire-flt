import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  created_time: any;

  @Expose()
  modified_time: any;
  @Expose()
  status: number;
}
