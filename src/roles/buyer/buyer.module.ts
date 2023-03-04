import { BuyerService } from './buyer.service';
import { BuyerController } from './buyer.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [BuyerController],
  providers: [BuyerService],
})
export class BuyerModule {}
