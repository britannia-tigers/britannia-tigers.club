import Stripe from 'stripe';

export const stripeClient = () => (
  new Stripe(process.env.STRIPE_SECRET, {
    apiVersion: "2023-08-16"
  })
)