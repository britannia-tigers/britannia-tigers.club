import { Body, Controller, Get, Headers, Logger, Post, RawBodyRequest, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import Stripe from 'stripe'
import { stripeClient } from '../client/stripe'
import { CheckoutWebhookDto, UserRegistrationDto } from './webhook.dto';
import { Request } from 'express';
import { CmsService } from 'src/cms/cms.service';
import { StripeWebhookResponseObject } from './webhook.interface';
import { UserService } from 'src/user/user.service';
@ApiTags('Webhooks')
@Controller('webhooks')
export class WebhookController {

  readonly endpointSecret:string;

  constructor(
    private readonly cmsService:CmsService,
    private readonly userService:UserService
  ) {
    this.endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  }

  @Post('user')
  async postUserRegistration(
    @Body() { type, user: {
      user_id,
      ...restUser
    } }:UserRegistrationDto
  ) {

    Logger.log('user.postRegistration webhook: ', type, user_id);
    
    try {
      switch(type) {
        case 'user.postRegistration':
          await this.userService.assignUserRole(user_id, 'member');
          await this.userService.updateUser(user_id, { 
            app_metadata: {
              type: ['member'],
              isPaid: false
            },
            user_metadata: {
              description: '',
              stats: {
                weight: { unit: 'kg', value: 0 },
                height: { unit: 'cm', value: 0 },
                position: [],
                charts: {}
              },
              images: [],
              videos: []
            }
          });
          Logger.log('user.postRegistration success: ');
          break;
        default:
          console.info('unknown type received', type, user_id, restUser);
      }
    } catch(e) {
      console.error('User post registration failed: ', e);
    }
  }


  /**
   * Stripe webhook handler
   * @param body 
   * @param signature 
   */
  @Post('checkout')
  async stripeHooks(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature:string
  ) {

    let event:Stripe.Event | Buffer;
        
    if(this.endpointSecret) {
      try {

        event = await stripeClient().webhooks.constructEventAsync(req.rawBody, signature, this.endpointSecret);
  
        switch(event.type) {
          case 'checkout.session.async_payment_failed':
          const checkoutSessionAsyncPaymentFailed = event.data.object;
            // Then define and call a function to handle the event checkout.session.async_payment_failed
            console.error('stripe webhook checkout event async_payment_failed: ', checkoutSessionAsyncPaymentFailed);
            break;
          case 'checkout.session.async_payment_succeeded':
          case 'checkout.session.completed':
            const { userId, sessionId } = (event.data.object as StripeWebhookResponseObject<CheckoutWebhookDto>).metadata;
            const res  = await this.cmsService.addPaidParticipants(sessionId, [userId]);
            Logger.log('checkout complete and added paid participant: ', res);
            break;
          case 'checkout.session.expired':
            const checkoutSessionExpired = event.data.object;
            // Then define and call a function to handle the event checkout.session.expired
            Logger.warn('stripe webhook checkout event expired: ', checkoutSessionExpired);
            break;
          default:
            Logger.log(`Unhandled event type ${event.type}`);
        }

      } catch(e) {
        console.error('stripe webhook checkout event error', e);
        throw e;
      }
  
    } else {
      console.info('no endpointSecret: ', req.rawBody);
    }
  
    }

}
