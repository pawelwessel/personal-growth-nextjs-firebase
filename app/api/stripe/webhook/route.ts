import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  apiVersion: "2025-02-24.acacia",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig!, endpointSecret!);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case "customer.subscription.created":
      const subscriptionCreated = event.data.object as Stripe.Subscription;
      console.log("Subscription created:", subscriptionCreated.id);
      // Here you would update the user's subscription status in your database
      break;

    case "customer.subscription.updated":
      const subscriptionUpdated = event.data.object as Stripe.Subscription;
      console.log("Subscription updated:", subscriptionUpdated.id);
      // Handle subscription updates
      break;

    case "customer.subscription.deleted":
      const subscriptionDeleted = event.data.object as Stripe.Subscription;
      console.log("Subscription deleted:", subscriptionDeleted.id);
      // Handle subscription cancellation
      break;

    case "invoice.payment_succeeded":
      const invoiceSucceeded = event.data.object as Stripe.Invoice;
      console.log("Payment succeeded:", invoiceSucceeded.id);
      // Handle successful payment
      break;

    case "invoice.payment_failed":
      const invoiceFailed = event.data.object as Stripe.Invoice;
      console.log("Payment failed:", invoiceFailed.id);
      // Handle failed payment
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
