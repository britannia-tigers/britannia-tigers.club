import { Injectable } from "@nestjs/common";
import { Twilio } from 'twilio';
import { SendSmsProps } from "./sms.interface";

@Injectable()
export class SmsService {

  readonly twilio:Twilio;

  constructor() {
    console.log('jaja: ', process.env.TWILIO_SID, process.env.TWILIO_SECRET)
    this.twilio = new Twilio(
      process.env.TWILIO_SID,
      process.env.TWILIO_SECRET
    );
  }


  async sendMessage({
    from, to, body
  }:SendSmsProps) {

    const res = await this.twilio.messages.create({
      from,
      to,
      body
    })
  }
}