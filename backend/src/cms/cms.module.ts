import { Module } from '@nestjs/common';
import { CmsController } from './cms.controller';
import { CmsService } from './cms.service';
import { MailService } from 'src/messaging/mail.service';
import { SmsService } from 'src/messaging/sms.service';
import { UserService } from 'src/user/user.service';

const isDev = process.env.NODE_ENV === 'development'
const envFilePath = isDev ? ['.dev.env', '.env'] : ['.env']

@Module({
  controllers: [CmsController],
  providers: [MailService, SmsService, CmsService, UserService]
  // exports: [CmsService]
})
export class CmsModule {}
