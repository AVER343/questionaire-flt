import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
export declare class AdminService {
    prisma: PrismaService;
    userService: UserService;
    constructor(prisma: PrismaService, userService: UserService);
    getAdmins(): Promise<any>;
}
