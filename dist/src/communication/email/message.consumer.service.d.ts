import { PrismaService } from './../../prisma/prisma.service';
import { Job } from 'bull';
import { MailingService } from './utils/_email.service';
import { ISendOTPEmail } from './interfaces/email.interface';
export declare class MailingConsumerService {
    mailerService: MailingService;
    prismaService: PrismaService;
    userService: any;
    constructor(mailerService: MailingService, prismaService: PrismaService);
    consumerSendOTP(job: Job<ISendOTPEmail>): Promise<void>;
    handleQueueCompleted(job: Job, result: any): Promise<void>;
}
