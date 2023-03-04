import { ISendEmailWithTemplate } from '../interfaces/email.interface';
import { SendGridService } from '@ntegral/nestjs-sendgrid';
export declare class MailingService {
    private readonly sendgridService;
    constructor(sendgridService: SendGridService);
    delegate_consumerSendMail(data: ISendEmailWithTemplate): Promise<void>;
    deleteFromActive(err: any, res: any, data: any): Promise<void>;
}
