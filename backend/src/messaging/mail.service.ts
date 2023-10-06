import { Injectable } from "@nestjs/common";
import { 
  MailService as SendgridService
} from '@sendgrid/mail';
import { SendMailProps } from "./mail.interface";


@Injectable()
export class MailService {

  readonly sendgrid:SendgridService;

  constructor() {
    this.sendgrid = new SendgridService();
    this.sendgrid.setApiKey(process.env.SENDGRID_API);
  }

  /**
   * Send mail
   * @param param0 
   * @returns 
   */
  async sendMail({
    to,
    from,
    dynamicTemplateData,
    templateId
  }:SendMailProps) {

    try {
      const res = await this.sendgrid.send({
        from,
        personalizations: [{
          to,
          dynamicTemplateData
        }],
        templateId
      });

      return res[0];
    } catch(e) {
      console.error(e.message);
      throw e;
    }
  }

}