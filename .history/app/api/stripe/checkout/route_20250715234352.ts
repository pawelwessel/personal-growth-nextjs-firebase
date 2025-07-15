import { NextResponse } from "next/server";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const stripe = require("stripe")(process.env.STRIPE_SECRET);

export async function POST(req: Request) {
  try {
    const { courseId, courseTitle, coursePrice, userEmail, userId } =
      await req.json();

    // Create a Checkout Session for individual course purchase
    const session = await stripe.checkout.sessions.create({
      mode: "payment", // One-time payment
      payment_method_types: ["card"],
      customer_email: userEmail,
      line_items: [
        {
          price_data: {
            currency: "pln",
            product_data: {
              name: courseTitle,
              description: `Kurs: ${courseTitle}`,
            },
            unit_amount: coursePrice * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      metadata: {
        courseId,
        courseTitle,
        userId,
        type: "course_purchase",
      },
      success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/`,
    });

    return NextResponse.json({
      success: true,
      url: session.url,
    });
  } catch (error: any) {
    console.error("Error creating Stripe Checkout Session:", error.message);
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
