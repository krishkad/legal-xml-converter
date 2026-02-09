import { subscriptionPlans } from "@/constant/plans";
import { SubscriptionStatus } from "@/generated/prisma/enums";
import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { addDays } from "date-fns";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const relevantEvents = new Set([
  "checkout.session.completed",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const header = await headers();
  const signature = header.get("stripe-signature")!;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  if (!relevantEvents.has(event.type)) {
    return NextResponse.json({ received: true });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = event.data.object as any;

  try {
    switch (event.type) {
      case "checkout.session.completed":
        const session = data;
        const userId = session.metadata.userId;
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription,
        );

        const startDate = new Date(subscription.start_date * 1000);
        const endDate = new Date(
          startDate.getTime() + 30 * 24 * 60 * 60 * 1000,
        );

        const plan = subscriptionPlans.find(
          (p) => p.priceId === subscription.items.data[0].price.id,
        );

        const user_last_active_subscription =
          await prisma.subscription.findFirst({
            where: { userId, status: "ACTIVE" },
            orderBy: {
              endDate: "desc",
            },
          });

        console.log({ user_last_active_subscription });

        console.log({ price_id: subscription.items.data[0].price.id });
        const subs = await prisma.subscription.upsert({
          where: { stripeSubscriptionId: subscription.id },
          create: {
            userId: userId as string,
            stripeSubscriptionId: subscription.id,
            status: subscription.status.toUpperCase() as SubscriptionStatus,
            startDate: new Date(subscription.start_date * 1000),
            endDate: user_last_active_subscription
              ? addDays(user_last_active_subscription?.endDate, 30)
              : endDate,
            plan: subscription.items.data[0].price.id.includes(
              "price_1STeqD3Vu7PCR4WVGRzUrFN5",
            )
              ? "PRO"
              : "FREE",
            amount: subscription.items.data[0].price.unit_amount as number,
            maxConversions: plan?.maxConversions as number,
            conversions_done: 0,
          },
          update: {
            status: subscription.status.toUpperCase() as SubscriptionStatus,
            endDate:
              subscription.status === "active"
                ? user_last_active_subscription
                  ? addDays(user_last_active_subscription?.endDate, 30)
                  : endDate
                : new Date(subscription.start_date * 1000),
          },
        });

        console.log({ subs });
        break;

      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        const sub = data;
        await prisma.subscription.update({
          where: { stripeSubscriptionId: sub.id },
          data: {
            status: sub.status.toUpperCase() as SubscriptionStatus,
            endDate: new Date(sub.current_period_end * 1000),
          },
        });
        break;
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 400 },
    );
  }

  return NextResponse.json({ received: true });
}
