"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { plans } from "@/constant/plans";
import { loadStripe } from "@stripe/stripe-js";
import { Check, Star } from "lucide-react";
import { features } from "process";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

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
    <section id="pricing" className="py-20 gradient-hero-glass">
      <div className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <Star className="w-5 h-5 text-primary" />
            <span className=" font-medium">Pricing Plans</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Choose Your{" "}
            <span className="bg-gradient-to-br from-primary to-blue-600 bg-clip-text text-transparent">
              Perfect Plan
            </span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Scale your document conversion workflow with flexible pricing
            options designed for individuals, teams, and enterprises.
          </p>
        </div>

        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <Card
                key={plan.name}
                className={`relative transition-smooth hover:shadow-glow ${
                  plan.popular
                    ? "border-primary shadow-glow scale-105 lg:scale-110"
                    : "border-border hover:border-blue-600/30"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-br from-primary to-blue-600 text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}

                <CardHeader className="text-center pb-6">
                  <div className="flex justify-center mb-4">
                    <div
                      className={`p-3 rounded-full ${
                        plan.popular
                          ? "bg-gradient-to-br from-primary to-blue-600 text-white"
                          : "bg-blue-500/10 text-blue-400"
                      }`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>

                  <CardTitle className="text-2xl font-bold">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {plan.description}
                  </CardDescription>

                  <div className="pt-4">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-foreground">
                        {plan.price}
                      </span>
                      <span className="text-muted-foreground">
                        /{plan.period}
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.variant === "hero" ? "default" : "outline"}
                    size="lg"
                    className="w-full h-12 text-base font-medium"
                    onClick={() =>
                      plan.name === "Pro Plan"
                        ? handleSubscribe("price_1STeqD3Vu7PCR4WVGRzUrFN5")
                        : null
                    }
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Money-back guarantee */}
        <div
          className="text-center mt-12 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <p className="text-muted-foreground">
            <span className="font-medium text-foreground">
              30-day money-back guarantee
            </span>{" "}
            · No setup fees · Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
