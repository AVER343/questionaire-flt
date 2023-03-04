import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { InjectQueue } from '@nestjs/bull';
import { Inject, Injectable } from '@nestjs/common';
import { Prisma, UserEmail, Users } from '@prisma/client';
import { Queue } from 'bull';
import { QUEUES } from 'config';
import { IComsumeEmail, ISendOTPEmail } from './interfaces/email.interface';
import { emailTemplateId } from 'src/common/enums/email.enum';

@Injectable()
export class MailingProducerService {
  constructor(
    @InjectQueue(QUEUES.SEND_EMAIL) private queue: Queue,
    private userService: UserService,
    private prismaService: PrismaService,
  ) {}

  async sendOTP(user: Users, _data: { otp: string }) {
    let opted_out = [];
    let data = {
      otp: _data.otp,
      name: user.username,
      validTill: new Date(Date.now() + 60 * 15).toString(),
    };
    let userEmail: UserEmail = await this.userService.getEmail(user.id);
    // data pushed to queue
    let send_message: IComsumeEmail = {
      to: userEmail.email,
      personalization: [
        {
          to: { email: userEmail.email },
          dynamicTemplateData: data,
        },
      ],
      subject: 'OTP',
      text: 'Hi welcome to our app',
      html: `<h1>${JSON.stringify(data)}</h1>`,
      // templateId: emailTemplateId.SEND_OTP,
    };
    //added to queue in database
    let activeQueue = await this.prismaService.queueActive.create({
      data: {
        user_id: userEmail.user_id,
        queue_type: QUEUES.SEND_EMAIL,
        data: send_message as unknown as Prisma.JsonObject,
      },
    });
    //add to queue bulljs
    await this.queue.add('message-job', {
      props: {
        queue_id: activeQueue.id,
        email: userEmail.email,
        user_id: userEmail.user_id,
        queue_type: QUEUES.SEND_EMAIL,
      },
      data: send_message,
    });
  }
}
