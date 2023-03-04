import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [PrismaService],
  controllers: [SellerController],
  providers: [SellerService, PrismaService],
})
export class SellerModule {}
