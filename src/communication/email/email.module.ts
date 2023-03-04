import { JWT_COOKIE_SECRET, QUEUES } from 'config';
/*
https://docs.nestjs.com/modules
*/

import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { MailingService } from './utils/_email.service';
import { MailingConsumerService } from './message.consumer.service';
import { MailingProducerService } from './message.producer.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    BullModule.registerQueue({
      name: QUEUES.SEND_EMAIL,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: JWT_COOKIE_SECRET,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [
    MailingService,
    MailingConsumerService,
    MailingProducerService,
    PrismaService,
    UserService,
  ],
  exports: [MailingService, MailingConsumerService, MailingProducerService],
})
export class EmailModule {}
