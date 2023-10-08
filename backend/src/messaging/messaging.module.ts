import { Module } from "@nestjs/common";
import { MessagingController } from "./messaging.controller";
import { MailService } from "./mail.service";



@Module({
  controllers: [MessagingController],
  providers: [MailService]
  // exports: [CmsService]
})
export class MessagingModule {}
