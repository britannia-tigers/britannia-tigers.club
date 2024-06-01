import { Injectable } from '@nestjs/common';
import { stripeClient } from '../client/stripe';
import { UnixTimestamp, CheckoutSession } from './payment.interface';

/**
 * Payment Service
 */
@Injectable()
export class PaymentService {

  readonly endpointSecret:string;
  readonly domainUrl: string;

  constructor() {
    this.domainUrl = process.env.DOMAIN_URL;
    this.endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    }

    
  /**
   * create session payment
   * @param sessionId 
   * @param userId 
   * @param priceId 
   * @param quantity 
   * @returns 
   */
  async createSessionPayment(
    sessionId: string,
    userId: string,
    priceId: string,
    quantity?: number
  ) {
  
    const sess = await stripeClient().checkout.sessions.create({
      mode: 'payment',
      line_items: [{
        price: priceId,
        quantity
      }],
      success_url: `${this.domainUrl}/session/${sessionId}?status=payment_success`,
      cancel_url: `${this.domainUrl}/session/${sessionId}?status=payment_cancel`,
      metadata: {
        sessionId,
        userId
      }
    });

    return sess;
  }

  async getCheckoutCompleted(
    startDate?: UnixTimestamp,
    endDate?: UnixTimestamp
  ) {
    return this.getEvents(startDate, endDate);
  }


  /**
   * get events
   * @param startDate 
   * @param endDate 
   * @param limit 
   * @param type 
   * @returns 
   */
  async getEvents(
    startDate?: UnixTimestamp,
    endDate?: UnixTimestamp,
    limit: number = 100,
    // type:string = CheckoutSession.COMPLETED,
  ) {
    const params = endDate ? {
      created: {
        gt: startDate,
        lte: endDate
      }
    } : {};

    return await stripeClient().events.list({
      ...params,
      limit,
      // type,
    });
  }
}
