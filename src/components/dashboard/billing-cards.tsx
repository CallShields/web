"use client";

import { User } from "@supabase/supabase-js";
import { supabase } from "../../../supabase/supabase";
import { Zap, Star, Rocket } from "lucide-react";

const PACKAGES = [
  {
    id: "starter",
    name: "Starter",
    credits: "500,000",
    price: "$9.90",
    perAnalysis: "~$0.00002",
    icon: <Zap className="w-5 h-5" />,
    priceId: "price_starter", // replace with real Stripe price ID
  },
  {
    id: "standard",
    name: "Standard",
    credits: "1,500,000",
    price: "$24.90",
    perAnalysis: "~$0.000017",
    icon: <Star className="w-5 h-5" />,
    priceId: "price_standard",
    popular: true,
  },
  {
    id: "pro",
    name: "Pro",
    credits: "5,000,000",
    price: "$39.90",
    perAnalysis: "~$0.000008",
    icon: <Rocket className="w-5 h-5" />,
    priceId: "price_pro",
  },
];

export default function BillingCards({ user }: { user: User }) {
  const handleCheckout = async (priceId: string) => {
    if (!user) {
      window.location.href = "/sign-in";
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke(
        "supabase-functions-create-checkout",
        {
          body: {
            price_id: priceId,
            user_id: user.id,
            return_url: `${window.location.origin}/dashboard/billing`,
          },
          headers: {
            "X-Customer-Email": user.email || "",
          },
        }
      );

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {PACKAGES.map((pkg) => (
        <div
          key={pkg.id}
          className={`rounded-2xl p-6 relative ${
            pkg.popular
              ? "bg-[#0A2540] border-2 border-[#00D4AA]/40"
              : "bg-white border border-gray-100 shadow-sm"
          }`}
        >
          {pkg.popular && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-[#00D4AA] text-[#0A2540] text-xs font-bold px-4 py-1.5 rounded-full">
                Best Value
              </span>
            </div>
          )}

          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
              pkg.popular
                ? "bg-[#00D4AA]/10 text-[#00D4AA]"
                : "bg-[#0A2540]/5 text-[#0A2540]"
            }`}
          >
            {pkg.icon}
          </div>

          <div className={`font-semibold text-lg mb-1 ${pkg.popular ? "text-white" : "text-[#0A2540]"}`}>
            {pkg.name}
          </div>
          <div className={`text-3xl font-bold mb-1 ${pkg.popular ? "text-white" : "text-[#0A2540]"}`}>
            {pkg.price}
          </div>
          <div className={`text-sm mb-4 ${pkg.popular ? "text-[#00D4AA]" : "text-[#64748B]"}`}>
            {pkg.credits} credits
          </div>
          <div className={`text-xs mb-6 ${pkg.popular ? "text-white/50" : "text-[#64748B]"}`}>
            {pkg.perAnalysis} per analysis
          </div>

          <button
            onClick={() => handleCheckout(pkg.priceId)}
            className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors ${
              pkg.popular
                ? "bg-[#00D4AA] text-[#0A2540] hover:bg-[#00D4AA]/90"
                : "bg-[#0A2540] text-white hover:bg-[#0A2540]/90"
            }`}
          >
            Buy {pkg.name}
          </button>
        </div>
      ))}
    </div>
  );
}
