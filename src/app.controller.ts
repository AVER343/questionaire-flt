import { Controller, Get, Query } from '@nestjs/common';
import { MailingProducerService } from './communication/email/message.producer.service';
import { ISendOTPEmail } from './communication/email/interfaces/email.interface';

@Controller('')
export class AppController {
  constructor(
    private readonly messageProducerService: MailingProducerService,
  ) {}

  // @Get('invoke-msg')
  // getInvokeMsg(@Query('msg') msg: ISendOTPEmailConsumer) {
  //   this.messageProducerService.sendOTP(msg);
  //   return msg;
  // }
}
