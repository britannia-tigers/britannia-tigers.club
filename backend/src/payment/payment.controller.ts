import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ApiTags } from '@nestjs/swagger';
import { PaymentCreateDto, PaymentGetDto } from './payment.dto';
import * as moment from 'moment';
import { PaymentCheckoutEventObject } from './payment.interface';
import { UserService } from 'src/user/user.service';

@Controller('api/payments')
export class PaymentController {

  constructor(
    private readonly paymentService:PaymentService,
    private readonly userService: UserService
  ){}

  @ApiTags('Payments')
  @Post('session/:sessionId')
  async createPayment(
    @Param('sessionId') sessionId:string, 
    @Body() {
      priceId, quantity, userId
    }:PaymentCreateDto
  ) {
    return  this.paymentService.createSessionPayment(
      sessionId, userId, priceId, quantity || 1)
  }

  @ApiTags('Payments')
  @Get('session/:sessionId')
  async getPayments(
    @Param('sessionId') sessionId:string,
    @Query() {
      date
    }:PaymentGetDto
  ) {
    const endDate = date && moment(date).unix();
    const startDate = date && moment(date).clone().subtract(1, 'month').unix();

    const res = await this.paymentService.getCheckoutCompleted(startDate, endDate);
    const allUsers = (await this.userService.getUserList({ per_page: 100 })).data;
    const outData = res.data.filter(p => {
      const { metadata } = p.data.object as PaymentCheckoutEventObject;
      return metadata?.sessionId === sessionId
    }).map(d => {
      let obj = d.data.object as PaymentCheckoutEventObject;
      if(obj.metadata.userId) {
        const user = allUsers.find(u => u.user_id === obj.metadata.userId);
        obj = {...obj, user} as any;
      }

      return obj;
    });

    return [...outData];
  }

}
