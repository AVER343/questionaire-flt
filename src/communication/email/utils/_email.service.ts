import {
  ISendEmail,
  ISendEmailWithTemplate,
  TemplateNames,
} from '../interfaces/email.interface';
import { Injectable } from '@nestjs/common';
import { MailService } from '@sendgrid/mail';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class MailingService {
  constructor(@InjectSendGrid() private readonly sendgridService: SendGridService) {}

  async delegate_consumerSendMail(data: ISendEmailWithTemplate) {
    data.from = 'aver343.sendgrid@gmail.com';
    //add to database
    //TODO
    this.sendgridService.send(data, false, (err, result) => console.log({ err, result:JSON.stringify(result) }));
    
  }
  async deleteFromActive(err: any, res: any, data: any) {
    //db change status
    if (err) {
      console.error(err);
    } else {
      //has worked
      
      //TODO
    }
  }
}
