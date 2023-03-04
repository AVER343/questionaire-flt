import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEmail, Users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/createUser.dto';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
const scrypt = promisify(_scrypt);
@Injectable()
export class UserService {
  constructor(public prisma: PrismaService, private jwtService: JwtService) {}
  async findById(id: number): Promise<Users | null> {
    if (!id) {
      return null;
    }
    let user = await this.prisma.users.findFirst({ where: { id } });
    return user;
  }
  async getEmail(user_id: number): Promise<UserEmail | null> {
    let userEmail = await this.prisma.userEmail.findFirst({
      where: { user_id },
    });
    return userEmail;
  }
  async createUser(data: CreateUserDTO): Promise<Users | null> {
    let { email, password, phoneNumber, username } = data;
    if (!email && !phoneNumber) {
      throw new Error(`email / phone number is required`);
    }
    if (await this.prisma.users.findFirst({ where: { username } })) {
      throw new BadRequestException('Account with username already exists');
    }
    if (await this.prisma.userEmail.findFirst({ where: { email } })) {
      throw new BadRequestException('Account with email already exist');
    }
    if (
      await this.prisma.userPhone.findFirst({
        where: { phone_number: phoneNumber },
      })
    ) {
      throw new BadRequestException('Account with phone number already exists');
    }
    //create salt
    const salt = randomBytes(12).toString('hex');

    //Generate hash
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    //password would be hash and salt
    password = hash.toString('hex') + '.' + salt;

    //save user
    let created_user = await this.prisma.users.create({
      data: { username, password },
    });

    //add if email provided
    if (email) {
      await this.prisma.userEmail.create({
        data: { email, user_id: created_user.id },
      });
    }

    //add if phone number provided
    if (phoneNumber) {
      await this.prisma.userPhone
        .create({
          data: { phone_number: phoneNumber, user_id: created_user.id },
        })
        .catch((e) => {
          throw new BadRequestException(e.message);
        });
    }
    return created_user;
  }
  async getJWT(user: Users) {
    let _user = { ...user };
    delete _user.password;
    let token = await this.jwtService.signAsync(_user, { expiresIn: '3d' });
    return token;
  }
  async findByEmail(email: string): Promise<Users | null> {
    if (!email) return null;
    let userEmail = await this.prisma.userEmail.findFirst({ where: { email } });
    if (!userEmail) return null;
    let user = await this.prisma.users.findFirst({
      where: { id: userEmail.user_id },
    });
    return user;
  }
  async findByUsername(username: string): Promise<Users | null> {
    if (!username) return null;
    let user = await this.prisma.users.findFirst({ where: { username } });
    if (!user) return null;
    return user;
  }
  async verifyJWT(JWT: string): Promise<Partial<Users>> {
    let verified_user = await this.jwtService.verifyAsync(JWT);
    return verified_user;
  }
}
