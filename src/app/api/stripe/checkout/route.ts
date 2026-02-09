import { stripe } from "@/lib/stripe";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { CustomJWTPayload } from "../../convert-xml/route";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const token = req.cookies.get(process.env.COOKIE_NAME as string)?.value;
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { priceId } = await req.json();

  const token_data = jwt.verify(
    token,
    process.env.JWT_SECRET_KEY as string
  ) as CustomJWTPayload;

  const user = await prisma.user.findUnique({
    where: { id: token_data.id },
  });

  if (!user)
    return NextResponse.json({ error: "no user found" }, { status: 401 });

  let customerId = user?.stripeCustomerId;

  if (!customerId) {
    const customer = await stripe.customers.create({
      metadata: { userId: user.id },
    });
    customerId = customer.id;

    await prisma.user.update({
      where: { id: token_data.id },
      data: { stripeCustomerId: customerId },
    });
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing?canceled=true`,
    metadata: { userId: user.id },
  });
  console.log({ url: checkoutSession.url });

  return NextResponse.json({ url: checkoutSession.url });
}
