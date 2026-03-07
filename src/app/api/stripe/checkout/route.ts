import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
});

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, amount, anonymous } = await request.json();

    if (!firstName || !email || !amount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const amountInCents = Math.round(parseFloat(amount) * 100);
    if (isNaN(amountInCents) || amountInCents < 50) {
      return NextResponse.json(
        { error: "Invalid donation amount (minimum $0.50 CAD)" },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "cad",
            unit_amount: amountInCents,
            product_data: {
              name: "Donation to OCRSS",
              description:
                "Oromo Cultural Resettlement Services Society — your gift supports settlement, education, and community programs.",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        firstName,
        lastName: lastName || "",
        email,
        amount: String(amount),
        anonymous: anonymous ? "true" : "false",
      },
      success_url: `${baseUrl}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/donate/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe checkout error", error);
    return NextResponse.json(
      { error: error.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
