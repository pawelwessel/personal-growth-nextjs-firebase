import { NextResponse } from "next/server";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const stripe = require("stripe")(process.env.STRIPE_SECRET);

export async function POST(req: Request) {
  try {
    const { dietId, dietTitle, dietPrice, userEmail, userId, dietData } =
      await req.json();

    // Generate a unique order ID
    const orderId = `diet_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    // Prepare metadata with all necessary order information
    const metadata: any = {
      orderId,
      dietId,
      dietTitle,
      type: "diet_purchase",
      orderData: JSON.stringify({
        dietId,
        dietTitle,
        dietPrice,
        dietData: {
          duration: dietData.duration,
          difficulty: dietData.difficulty,
          calories: dietData.calories,
          meals: dietData.meals,
          category: dietData.category,
          nutritionistName: dietData.nutritionistName,
          nutritionistCredentials: dietData.nutritionistCredentials,
          benefits: dietData.benefits,
          targetAudience: dietData.targetAudience,
          mealPlanStructure: dietData.mealPlanStructure,
          shoppingList: dietData.shoppingList,
          preparationTips: dietData.preparationTips,
          progressTracking: dietData.progressTracking,
          maintenancePhase: dietData.maintenancePhase,
          scientificReferences: dietData.scientificReferences,
          clinicalStudies: dietData.clinicalStudies,
          averageWeightLoss: dietData.averageWeightLoss,
          averageTimeToResults: dietData.averageTimeToResults,
          successRate: dietData.successRate,
          faq: dietData.faq,
          testimonials: dietData.testimonials,
          beforeAfterStories: dietData.beforeAfterStories,
        },
      }),
    };

    // If user is logged in, add user information
    if (userId) {
      metadata.userId = userId;
      metadata.userEmail = userEmail;
    } else {
      // For anonymous users, generate a temporary user ID
      metadata.anonymousUserId = `anon_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      metadata.userEmail = userEmail || "anonymous@example.com";
    }

    // Create a Checkout Session for diet purchase
    const session = await stripe.checkout.sessions.create({
      mode: "payment", // One-time payment
      payment_method_types: ["card"],
      customer_email: userEmail,
      line_items: [
        {
          price_data: {
            currency: "pln",
            product_data: {
              name: dietTitle,
              description: `Plan dietetyczny: ${dietTitle}`,
              images: dietData.image ? [dietData.image] : [],
            },
            unit_amount: dietPrice * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      metadata,
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}&type=diet`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/`,
    });

    return NextResponse.json({
      success: true,
      url: session.url,
      orderId,
    });
  } catch (error: any) {
    console.error(
      "Error creating Stripe Checkout Session for diet:",
      error.message
    );
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
