import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, UserService]
})
export class PaymentModule {}
