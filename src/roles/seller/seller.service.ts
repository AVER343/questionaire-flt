import { PrismaService } from 'src/prisma/prisma.service';
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SellerService {
  constructor(public prisma: PrismaService) {}
}
