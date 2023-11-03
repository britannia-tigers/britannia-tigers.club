import { Body, Controller, Param, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ApiTags } from '@nestjs/swagger';
import { PaymentCreateDto } from './payment.dto';

@Controller('api/payments')
export class PaymentController {

  constructor(private readonly paymentService:PaymentService){}

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

}
