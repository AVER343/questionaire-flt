/*
https://docs.nestjs.com/middleware#middleware
*/

import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { JWT_COOKIE_KEY } from 'config';
import { Request, Response } from 'express';
import { UserService } from 'src/user/user.service';
import { Users } from '@prisma/client';
@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(public userService: UserService) {}
  async use(req: Request, res: Response, next: Function) {
    let user = null;
    let token = (req.cookies && req.cookies[JWT_COOKIE_KEY]) || null;
    if (token) {
      let __user = await this.userService.verifyJWT(token);
      if (__user) {
        user = await this.userService.findById(__user.id);
        if (user && user.status > 2) {
          let reason = (
            await this.userService.prisma.status.findFirst({
              where: { id: user.status },
            })
          ).status;
          throw new BadRequestException(`Your account has been ${reason}`);
        }
        if (user) delete user.password;
      }
    }
    req.user = user;
    next();
  }
}
