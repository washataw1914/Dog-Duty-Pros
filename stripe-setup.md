# Stripe Integration Setup Guide

This guide will help you set up Stripe integration for the Dog Duty Pros website.

## Prerequisites

1. A Stripe account (create one at [stripe.com](https://stripe.com) if you don't have one)
2. Your website domain ready for deployment

## Step 1: Get Your API Keys

1. Log in to your Stripe Dashboard at [dashboard.stripe.com](https://dashboard.stripe.com)
2. Go to Developers > API keys
3. Make note of your publishable key (starts with `pk_`) and secret key (starts with `sk_`)
   - For testing, use the test keys
   - For production, use the live keys

## Step 2: Update Environment Variables

Add these environment variables to your SiteGround Node.js application:

```
STRIPE_SECRET_KEY=your_stripe_secret_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

## Step 3: Set Up Stripe Products and Prices

1. Go to Products > Add Product in your Stripe Dashboard
2. Create products for each of your service plans:
   - Basic Service Plan
   - Premium Service Plan
   - One-time Cleanup Service
   - Sanitization Services
3. For each product, create prices with the appropriate:
   - Price amount
   - Currency (USD)
   - Billing period (monthly, quarterly, etc.) for subscription products
   - Tax behavior

## Step 4: Configure Webhooks (Optional but Recommended)

1. Go to Developers > Webhooks in your Stripe Dashboard
2. Click "Add endpoint"
3. Enter your webhook URL: `https://yourdomain.com/api/stripe-webhook`
4. Select events to listen for:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.paid`
   - `invoice.payment_failed`

5. Add the webhook signing secret to your environment variables:
```
STRIPE_WEBHOOK_SECRET=your_webhook_secret
```

## Step 5: Test the Integration

1. Make a test purchase on your website using Stripe's test card:
   - Card number: 4242 4242 4242 4242
   - Expiration: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits

2. Verify that the payment is recorded in your Stripe Dashboard under Payments

## Common Issues and Solutions

### Payment Failing

- Check that your API keys are correctly set up
- Ensure your product and price IDs are correctly referenced in your code
- Verify that your account is properly activated and able to accept payments

### Webhook Events Not Being Received

- Check your webhook endpoint URL is publicly accessible
- Ensure your server is properly handling the webhook signature verification
- Check that you've selected the correct events to listen for

## Going Live Checklist

Before going live with real payments:

1. Complete Stripe account activation with all required business information
2. Switch from test API keys to live API keys
3. Test the complete payment flow in your live environment
4. Set up proper error handling and user notifications for payment failures
5. Implement proper logging for payment events

For more help, consult the [Stripe Documentation](https://stripe.com/docs) or contact Stripe support.