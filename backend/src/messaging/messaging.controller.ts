import { Body, Controller, Post } from "@nestjs/common";
import { MailService } from "./mail.service";
import { ApiTags } from "@nestjs/swagger";
import { EnquiryDto } from "./mail.dto";
import mailConfig from './mail.config'

@Controller('api')
export class MessagingController {
  constructor(
    private readonly mailService: MailService
  ) {}

    @ApiTags('Messaging')
    @Post('messaging/enquiry-form')
    sendEnquiry(
      @Body() data:EnquiryDto
    ) {

      return this.mailService.sendMail({
        to: {
          email: data.email
        },
        bcc: {
          email: mailConfig.sender
        },
        from: mailConfig.sender,
        dynamicTemplateData: data,
        templateId: mailConfig.template.genericEnquiry
      })
    }


}