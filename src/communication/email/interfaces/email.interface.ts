import { UserEmail } from '@prisma/client';
import { emailTemplateId } from 'src/common/enums/email.enum';

export enum TemplateNames {
  send_otp_email = 'send_otp_email',
}

export interface ISendEmail {
  to: string;
  subject: string;
  text: string;
  templateId?: emailTemplateId;
  html?: string;
  personalization: Personalization[];
}
export type ISendEmailWithTemplate = {
  html?: string;
  from?: string;
} & ISendEmail;

export interface ISendOTPEmail {
  props: { email: string ,user_id?:number; queue_id:number;};
  data: IComsumeEmail;
}
export interface IComsumeEmail extends ISendEmail {
  personalization: ISendOTPPersonalization[];
}
export type MappingTemplateNameToFunction = {
  [key in TemplateNames]: (...args) => void;
};

export interface To {
  email: string;
}

export interface Personalization {
  to: To | string;
  dynamicTemplateData: any;
}
export interface ISendOTPPersonalization {
  to: To | string;
  dynamicTemplateData: { name: string; otp: string; validTill: string };
}
