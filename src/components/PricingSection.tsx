"use client";
// import { plans } from "@/constant/plans";
import { loadStripe } from "@stripe/stripe-js";
import { Check, Star } from "lucide-react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

const plans = [
  {
    name: "Free",
    monthly: 0,
    yearly: 24,
    priceId: "price_1STeqD3Vu7PCR4WVGRzUrFN5test",
    features: [
      "5 document conversions",
      "Basic XML structure",
      "Standard support",
      "PDF & DOCX support",
      "No file storage",
    ],
    highlight: false,
  },
  {
    name: "Pro",
    monthly: 29,
    yearly: 66,
    priceId: "price_1STeqD3Vu7PCR4WVGRzUrFN5",
    features: [
      "100 conversions",
      "Advanced XML formatting",
      "Priority support",
      "All file formats",
      "Batch processing",
      "Custom templates",
    ],
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    monthly: 199,
    yearly: 166,
    priceId: "price_1STeqD3Vu7PCR4WVGRzUrFN5test",
    features: [
      "Volume pricing",
      "Dedicated support",
      "Custom integrations",
      "SLA guarantee",
      "Advanced security",
      "Team management",
      "Custom deployment",
    ],
    highlight: false,
  },
];

const PricingSection = () => {
  const handleSubscribe = async (priceId: string) => {
    const stripe = await stripePromise;
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId }),
    });
    const { url } = await res.json();
    window.location.href = url;
  };

  return (
    <>
      <section id="pricing" className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
              <Star className="w-5 h-5 text-primary" />
              <span className=" font-medium">Pricing Plans</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Simple, Transparent{" "}
              <span className="bg-gradient-to-br from-primary to-blue-600 bg-clip-text text-transparent">
                Pricing
              </span>
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Start free. Scale as you grow. No hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-7 card-hover ${
                  plan.highlight ? "glass border-primary/30 glow-blue" : "glass"
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-br from-primary to-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                    {plan.badge}
                  </span>
                )}

                <h3 className="font-display font-semibold text-xl mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="font-display text-4xl font-bold">
                    ${plan.monthly}
                  </span>
                  <span className="text-muted-foreground text-sm">/mo</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-xl font-medium text-sm transition-all ${
                    plan.highlight
                      ? "bg-gradient-to-br from-primary to-blue-600 text-white btn-glow hover:brightness-110"
                      : "glass border border-border hover:border-primary/30"
                  }`}
                  onClick={() => {
                    if (plan.name !== "Pro") return;
                    handleSubscribe(plan.priceId);
                  }}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PricingSection;
