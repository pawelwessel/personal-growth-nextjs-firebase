import { NextResponse } from "next/server";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const stripe = require("stripe")(process.env.STRIPE_SECRET);
import { userPurchasesService } from "@/lib/userPurchasesService";

export async function POST(req: Request) {
  try {
    const { session_id } = await req.json();

    if (!session_id) {
      return NextResponse.json({
        success: false,
        error: "No session_id provided",
      });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    // Check if this is a course purchase or subscription
    const isCoursePurchase = session.metadata?.type === "course_purchase";

    if (isCoursePurchase) {
      // Handle course purchase
      const courseId = session.metadata.courseId;
      const userId = session.metadata.userId;
      const courseTitle = session.metadata.courseTitle;

      // Record the purchase in the database
      await userPurchasesService.addPurchase({
        userId,
        courseId,
        courseTitle,
        purchaseDate: new Date().toISOString(),
        amount: session.amount_total / 100, // Convert from cents
        currency: session.currency.toUpperCase(),
        transactionId: session.id,
        status: "completed",
      });

      console.log(
        `Course purchase successful: Course ${courseId} for user ${userId}`
      );

      return NextResponse.json({
        success: true,
        purchaseType: "course",
        courseId,
        userId,
        session,
      });
    } else {
      // Handle subscription (existing logic)
      const subscriptionId = session.subscription;
      const customerId = session.customer;

      const paymentData = {
        amount: session.amount_total,
        date: Date.now(),
        result: session.payment_status,
      };

      // Update user subscription data (you'll need to implement this)
      // await updateUserSubscriptionData(
      //   session.metadata.uid,
      //   subscriptionId,
      //   customerId,
      //   paymentData
      // );

      return NextResponse.json({
        success: true,
        purchaseType: "subscription",
        subscriptionId,
        customerId,
        session,
      });
    }
  } catch (error: any) {
    console.error("Error retrieving session:", error.message);
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
