import { Injectable } from '@nestjs/common';
import { stripeClient } from '../client/stripe';


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
}
