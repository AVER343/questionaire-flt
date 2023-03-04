import { promisify } from 'util';
import { NotFoundError } from 'rxjs';
import {
  BadRequestException,
  Body,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from '@prisma/client';
import { JWT_COOKIE_KEY, JWT_COOKIE_SECRET } from 'config';
import { CreateUserDTO } from 'src/user/dto/createUser.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { LoginUserDTO } from './dto/login.dto';
import { scrypt as _scrypt } from 'crypto';
import { ResetPasswordDTO } from './dto/reset.password.dto';
import { PrismaService } from 'src/prisma/prisma.service';
const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(public userService: UserService,public prisma:PrismaService) {}

  async signup(data: CreateUserDTO): Promise<Users> {
    let user = await this.userService.createUser(data);
    return user;
  }
  async checkCredentials(data: LoginUserDTO): Promise<Users> {
    let user = await this.userService.findByUsername(data.username);

    if (!user) throw new NotFoundException('User not found !');

    let [hash, salt] = user.password.split('.');
    let hashedPassword = (await scrypt(data.password, salt, 32)) as Buffer;

    if (hash != hashedPassword.toString('hex'))
      throw new BadRequestException('Invalid credentials !');

    return user;
  }
  async resetPassword(data: ResetPasswordDTO) {}
  async verifyOTP(data:ResetPasswordDTO){
    
  }
  generateOTP(length?: number) {
    let otp = ``;
    Array(length || 6)
      .fill((e) => 3)
      .map((e) => (otp = otp + Math.floor(Math.random() * 9.9)));
    return otp;
  }
}
