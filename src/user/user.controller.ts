import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Users } from '@prisma/client';
import { Response, Request } from 'express';
import { Serialize } from 'src/common/interceptor/serialize.interceptor';
import { GetUserDTO } from './dto/getUser.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
@Serialize(UserDto)
export class UserController {
  constructor(private usersService: UserService) {}

  @Get('/:id')
  async getUser(
    @Param() params: GetUserDTO,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Users | null> {
    let { id } = params;
    let user = await this.usersService.findById(parseInt(id));
    if (!user) {
      throw new NotFoundException(`User not found !`);
    }
    //user account deleted/suspended
    if (user.status > 2) {
      throw new BadRequestException(`Account is no longer accessible`);
    }
    return user;
  }

  
}
