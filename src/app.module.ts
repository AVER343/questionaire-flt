import { BuyerModule } from './roles/buyer/buyer.module';
import { SellerModule } from './roles/seller/seller.module';
import { AdminModule } from './roles/admin/admin.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BullModule } from '@nestjs/bull';
import { JWT_COOKIE_SECRET, QUEUES } from 'config';
import { SendGridModule } from '@ntegral/nestjs-sendgrid';
import { EmailModule } from './communication/email/email.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CurrentUserMiddleware } from './common/middleware/current-user.middleware';
@Module({
  imports: [
    BuyerModule,
    SellerModule,
    AdminModule,
    EmailModule,
    PrismaModule,
    UserModule,
    AuthModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: JWT_COOKIE_SECRET,
      }),
      inject: [ConfigService],
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),

    SendGridModule.forRoot({
      apiKey: process.env.SENDGRID_SECRET,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
