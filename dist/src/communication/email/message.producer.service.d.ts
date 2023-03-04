import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Users } from '@prisma/client';
import { Queue } from 'bull';
export declare class MailingProducerService {
    private queue;
    private userService;
    private prismaService;
    constructor(queue: Queue, userService: UserService, prismaService: PrismaService);
    sendOTP(user: Users, _data: {
        otp: string;
    }): Promise<void>;
}
