import { PrismaService } from 'src/prisma/prisma.service';
/*
https://docs.nestjs.com/providers#services
*/
import { Users } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AdminService {
  constructor(public prisma: PrismaService, public userService: UserService) {}
  async getAdmins() {
    let admins: any = (
      await this.prisma.userRole.findMany({
        where: {
          user_role_type: { user_role: 'ADMIN' },
        },
      })
    ).map((e) => e.user_id);
    admins = admins.map((e) => this.userService.findById(e));
    admins = (await Promise.all(admins)) as unknown as any[];
    admins = admins.filter((e) => e.status <= 2);
    return admins;
  }
  
}
