import { NextResponse } from "next/server";

const stripe = require("stripe")(`${process.env.STRIPE_SECRET}`);

export async function GET() {
  try {
    const orders = await stripe.checkout.sessions.list();

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
