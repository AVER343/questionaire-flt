import { AdminService } from './admin.service';
/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CheckAPIAuthorization } from 'src/common/guards/authorization.guard';
import { SetApiName } from 'src/common/decorator/set-api-name.decorator';
import { API_NAME } from 'src/common/enums/api.names.enum';
import { Serialize } from 'src/common/interceptor/serialize.interceptor';
import { UserDto } from 'src/user/dto/user.dto';

@Controller('/admin')
@Serialize(UserDto)
export class AdminController {
  constructor(private adminService: AdminService) {}
  @Get('/all')
  @SetApiName(API_NAME.GET_ADMIN)
  @UseGuards(CheckAPIAuthorization)
  async getAdmin() {
    let admins = await this.adminService.getAdmins();
    return admins;
  }
}
