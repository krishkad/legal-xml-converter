import { Check, Star, Zap } from "lucide-react";

export const plans = [
  {
    name: "Free Trial",
    price: "$0",
    period: "7 days",
    description: "Perfect for testing our platform",
    features: [
      "5 document conversions",
      "Basic XML structure",
      "Standard support",
      "PDF & DOCX support",
      "No file storage",
    ],
    cta: "Start Free Trial",
    variant: "outline" as const,
    popular: false,
    icon: Zap,
  },
  {
    name: "Pro Plan",
    price: "$29",
    amount: "29",
    period: "per month",
    description: "Ideal for professionals and small teams",
    features: [
      "100 conversions",
      "Advanced XML formatting",
      "Priority support",
      "All file formats",
      "Batch processing",
      "Custom templates",
      "API access",
    ],
    cta: "Get Pro",
    variant: "hero" as const,
    popular: true,
    icon: Star,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    description: "Tailored for large organizations",
    features: [
      "Volume pricing",
      "Dedicated support",
      "Custom integrations",
      "SLA guarantee",
      "Advanced security",
      "Team management",
      "Custom deployment",
    ],
    cta: "Contact Sales",
    variant: "outline" as const,
    popular: false,
    icon: Star,
  },
];

export const subscriptionPlans = [
  {
    id: "free_trial",
    name: "Free Trial",
    price: 0,
    period: 7, // days
    interval: "trial",
    maxConversions: 5,
    storageLimit: 0, // MB
    priceId: "", // empty as requested
    isTrial: true,
    isPopular: false,
    features: [
      "5 document conversions",
      "Basic XML structure",
      "Standard support",
      "PDF & DOCX support",
      "No file storage",
    ],
  },

  {
    id: "pro_monthly",
    name: "Pro Plan",
    price: 29,
    period: 1, // 1 month
    interval: "month",
    maxConversions: 100,
    storageLimit: 5000, // 5GB
    priceId: "price_1STeqD3Vu7PCR4WVGRzUrFN5", // ⭐ your price ID
    isTrial: false,
    isPopular: true,
    features: [
      "100 conversions",
      "Advanced XML formatting",
      "Priority support",
      "All file formats",
      "Batch processing",
      "Custom templates",
      "API access",
    ],
  },

  {
    id: "enterprise",
    name: "Enterprise",
    price: 0, // custom
    period: null,
    interval: "custom",
    maxConversions: "unlimited",
    storageLimit: "unlimited",
    priceId: "", // empty as requested
    isTrial: false,
    isPopular: false,
    features: [
      "Volume pricing",
      "Dedicated support",
      "Custom integrations",
      "SLA guarantee",
      "Advanced security",
      "Team management",
      "Custom deployment",
    ],
  },
];
