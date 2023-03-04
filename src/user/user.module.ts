import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWT_COOKIE_SECRET } from 'config';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { CurrentUserMiddleware } from 'src/common/middleware/current-user.middleware';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: JWT_COOKIE_SECRET,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [UserService, PrismaService, JwtStrategy],
  exports: [UserModule],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
