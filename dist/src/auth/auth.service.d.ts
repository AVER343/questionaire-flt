import { Users } from '@prisma/client';
import { CreateUserDTO } from 'src/user/dto/createUser.dto';
import { UserService } from 'src/user/user.service';
import { LoginUserDTO } from './dto/login.dto';
import { ResetPasswordDTO } from './dto/reset.password.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class AuthService {
    userService: UserService;
    prisma: PrismaService;
    constructor(userService: UserService, prisma: PrismaService);
    signup(data: CreateUserDTO): Promise<Users>;
    checkCredentials(data: LoginUserDTO): Promise<Users>;
    resetPassword(data: ResetPasswordDTO): Promise<void>;
    verifyOTP(data: ResetPasswordDTO): Promise<void>;
    generateOTP(length?: number): string;
}
