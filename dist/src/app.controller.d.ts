import { MailingProducerService } from './communication/email/message.producer.service';
export declare class AppController {
    private readonly messageProducerService;
    constructor(messageProducerService: MailingProducerService);
}
