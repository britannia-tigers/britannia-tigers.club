import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import Stripe from 'stripe'


@ApiTags('Webhooks')
@Controller('webhooks')
export class WebhookController {

  readonly stripe:Stripe;
  readonly endpointSecret:string;

  constructor() {

    this.endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
    this.stripe = new Stripe(process.env.STRIPE_KEY, {
      apiVersion: "2023-08-16"
    });
    

  }


  /**
   * Stripe webhook handler
   * @param body 
   * @param signature 
   */
  @Post('stripe')
  async stripeHooks(
    @Body() body,
    @Headers('stripe-signature') signature:string
  ) {
    let event:Stripe.Event;
    
    try {
      event = await this.stripe.webhooks.constructEventAsync(body, signature, this.endpointSecret);
    } catch(e) {
      throw e;
    }

    switch(event.type) {
      case 'checkout.session.async_payment_failed':
      const checkoutSessionAsyncPaymentFailed = event.data.object;
        // Then define and call a function to handle the event checkout.session.async_payment_failed
        break;
      case 'checkout.session.async_payment_succeeded':
        const checkoutSessionAsyncPaymentSucceeded = event.data.object;
        // Then define and call a function to handle the event checkout.session.async_payment_succeeded
        break;
      case 'checkout.session.completed':
        const checkoutSessionCompleted = event.data.object;
        // Then define and call a function to handle the event checkout.session.completed
        break;
      case 'checkout.session.expired':
        const checkoutSessionExpired = event.data.object;
        // Then define and call a function to handle the event checkout.session.expired
        break;
      case 'credit_note.created':
        const creditNoteCreated = event.data.object;
        // Then define and call a function to handle the event credit_note.created
        break;
      case 'credit_note.updated':
        const creditNoteUpdated = event.data.object;
        // Then define and call a function to handle the event credit_note.updated
        break;
      case 'credit_note.voided':
        const creditNoteVoided = event.data.object;
        // Then define and call a function to handle the event credit_note.voided
        break;
      case 'order.created':
        const orderCreated = event.data.object;
        // Then define and call a function to handle the event order.created
        break;
      case 'payment_intent.amount_capturable_updated':
        const paymentIntentAmountCapturableUpdated = event.data.object;
        // Then define and call a function to handle the event payment_intent.amount_capturable_updated
        break;
      case 'payment_intent.canceled':
        const paymentIntentCanceled = event.data.object;
        // Then define and call a function to handle the event payment_intent.canceled
        break;
      case 'payment_intent.created':
        const paymentIntentCreated = event.data.object;
        // Then define and call a function to handle the event payment_intent.created
        break;
      case 'payment_intent.partially_funded':
        const paymentIntentPartiallyFunded = event.data.object;
        // Then define and call a function to handle the event payment_intent.partially_funded
        break;
      case 'payment_intent.payment_failed':
        const paymentIntentPaymentFailed = event.data.object;
        // Then define and call a function to handle the event payment_intent.payment_failed
        break;
      case 'payment_intent.processing':
        const paymentIntentProcessing = event.data.object;
        // Then define and call a function to handle the event payment_intent.processing
        break;
      case 'payment_intent.requires_action':
        const paymentIntentRequiresAction = event.data.object;
        // Then define and call a function to handle the event payment_intent.requires_action
        break;
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object;
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      case 'payment_link.created':
        const paymentLinkCreated = event.data.object;
        // Then define and call a function to handle the event payment_link.created
        break;
      case 'payment_link.updated':
        const paymentLinkUpdated = event.data.object;
        // Then define and call a function to handle the event payment_link.updated
        break;
      case 'payout.canceled':
        const payoutCanceled = event.data.object;
        // Then define and call a function to handle the event payout.canceled
        break;
      case 'payout.created':
        const payoutCreated = event.data.object;
        // Then define and call a function to handle the event payout.created
        break;
      case 'payout.failed':
        const payoutFailed = event.data.object;
        // Then define and call a function to handle the event payout.failed
        break;
      case 'payout.paid':
        const payoutPaid = event.data.object;
        // Then define and call a function to handle the event payout.paid
        break;
      case 'payout.reconciliation_completed':
        const payoutReconciliationCompleted = event.data.object;
        // Then define and call a function to handle the event payout.reconciliation_completed
        break;
      case 'payout.updated':
        const payoutUpdated = event.data.object;
        // Then define and call a function to handle the event payout.updated
        break;
      case 'refund.created':
        const refundCreated = event.data.object;
        // Then define and call a function to handle the event refund.created
        break;
      case 'refund.updated':
        const refundUpdated = event.data.object;
        // Then define and call a function to handle the event refund.updated
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }


  }

}
