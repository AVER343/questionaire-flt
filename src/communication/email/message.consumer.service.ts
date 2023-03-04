import { PrismaService } from './../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { QUEUES } from 'config';
import { MailingService } from './utils/_email.service';
import {
  ISendEmailWithTemplate,
  ISendOTPEmail,
  TemplateNames,
} from './interfaces/email.interface';
import { Prisma, UserEmail } from '@prisma/client';
import { UserService } from 'src/user/user.service';

@Injectable()
@Processor(QUEUES.SEND_EMAIL)
export class MailingConsumerService {
  userService: any;
  constructor(
    public mailerService: MailingService,
    public prismaService: PrismaService,
  ) {}
  //process fom queue
  @Process('message-job')
  async consumerSendOTP(job: Job<ISendOTPEmail>) {
    try {
      let { data } = job.data;
      //add to actiive queue with email
      let new_data: ISendEmailWithTemplate = {
        ...data,
        html: `<h1> STRONG START ${JSON.stringify(data)}</h1>`,
      };
      await this.mailerService.delegate_consumerSendMail(new_data);
    } catch (e) {
      console.error(e);
    }
  }
  @OnQueueCompleted()
  async handleQueueCompleted(job: Job, result: any) {
    console.log({ job });
    let { props, data } = job.data;
    await this.prismaService.jobStatusTable.create({
      data: { queue_type: props.queue_type, data, user_id: props.user_id || 0 },
    });
    await this.prismaService.queueActive.delete({
      where: { id: props.queue_id },
    });
  }
}
