"use client";

import { User } from "@supabase/supabase-js";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { supabase } from "../../supabase/supabase";
import { Check, Crown, Users, Zap } from "lucide-react";

// Mock pricing data with features - replace with actual data from your plans
const pricingFeatures = {
  free: [
    "Basic scam detection",
    "Single device protection",
    "English language support",
    "Community threat database",
  ],
  premium: [
    "Advanced AI detection",
    "Real-time threat updates",
    "Multilingual support (Cantonese, English, Mandarin)",
    "Educational scam summaries",
    "Priority customer support",
    "Call recording analysis",
  ],
  family: [
    "Everything in Premium",
    "Up to 6 family members",
    "Centralized family dashboard",
    "Parental controls",
    "Family threat sharing",
    "Bulk device management",
  ],
};

const planIcons = {
  free: <Zap className="w-5 h-5" />,
  premium: <Crown className="w-5 h-5" />,
  family: <Users className="w-5 h-5" />,
};

export default function PricingCard({
  item,
  user,
}: {
  item: any;
  user: User | null;
}) {
  // Handle checkout process
  const handleCheckout = async (priceId: string) => {
    if (!user) {
      // Redirect to login if user is not authenticated
      window.location.href = "/sign-in?redirect=pricing";
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke(
        "supabase-functions-create-checkout",
        {
          body: {
            price_id: priceId,
            user_id: user.id,
            return_url: `${window.location.origin}`,
          },
          headers: {
            "X-Customer-Email": user.email || "",
          },
        },
      );

      if (error) {
        throw error;
      }

      // Redirect to Stripe checkout
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  // Determine plan type based on name or amount
  const planType = item.name?.toLowerCase().includes("family")
    ? "family"
    : item.name?.toLowerCase().includes("premium")
      ? "premium"
      : "free";

  const features =
    pricingFeatures[planType as keyof typeof pricingFeatures] ||
    pricingFeatures.free;
  const icon = planIcons[planType as keyof typeof planIcons] || planIcons.free;

  return (
    <Card
      className={`w-full max-w-[350px] relative overflow-hidden ${item.popular ? "border-2 border-red-500 shadow-xl scale-105" : "border border-gray-200"} bg-white`}
    >
      {item.popular && (
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-orange-50 opacity-30" />
      )}
      <CardHeader className="relative pb-4">
        {item.popular && (
          <Badge className="px-3 py-1 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-orange-600 w-fit mb-4">
            Most Popular
          </Badge>
        )}
        <div className="flex items-center gap-2 mb-2">
          <div className="text-red-600">{icon}</div>
          <CardTitle className="text-2xl font-bold tracking-tight text-gray-900">
            {item.name}
          </CardTitle>
        </div>
        <CardDescription className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-gray-900">
            {item?.amount === 0 ? "Free" : `${item?.amount / 100}`}
          </span>
          {item?.amount > 0 && (
            <span className="text-gray-600">/{item?.interval}</span>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-6">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="relative pt-0 flex flex-col gap-2">
        <Button
          onClick={async () => {
            await handleCheckout(item.id);
          }}
          className={`w-full py-3 text-base font-medium ${
            item.popular
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-gray-900 hover:bg-gray-800 text-white"
          }`}
        >
          {item?.amount === 0 ? "Get Started Free" : "Start 7-Day Free Trial"}
        </Button>
        {item?.amount > 0 && (
          <p className="text-xs text-center text-gray-500">
            No charge for 7 days. Cancel anytime.
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
