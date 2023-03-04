import { JwtService } from '@nestjs/jwt';
import { UserEmail, Users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/createUser.dto';
export declare class UserService {
    prisma: PrismaService;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    findById(id: number): Promise<Users | null>;
    getEmail(user_id: number): Promise<UserEmail | null>;
    createUser(data: CreateUserDTO): Promise<Users | null>;
    getJWT(user: Users): Promise<string>;
    findByEmail(email: string): Promise<Users | null>;
    findByUsername(username: string): Promise<Users | null>;
    verifyJWT(JWT: string): Promise<Partial<Users>>;
}
