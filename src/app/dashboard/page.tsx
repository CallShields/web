import DashboardNavbar from "@/components/dashboard-navbar";
import { createClient } from "../../../supabase/server";
import { redirect } from "next/navigation";

import { Shield, CreditCard, TrendingUp, Cloud, FileText } from "lucide-react";

function formatNumber(n: number) {
  return n.toLocaleString("en-US");
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Fetch credit balance and plan from profiles
  const { data: profileData } = await supabase
    .from("profiles")
    .select("credits_balance, credit_cap, plan_tier")
    .eq("id", user.id)
    .single();

  const currentCredits = profileData?.credits_balance ?? 0;
  const totalCredits = profileData?.credit_cap ?? currentCredits;
  const analysesRemaining = Math.floor(currentCredits / 300);
  const percentUsed =
    totalCredits > 0
      ? Math.round(((totalCredits - currentCredits) / totalCredits) * 100)
      : 0;
  const percentRemaining = 100 - percentUsed;

  // Fetch analyses this month from credit_transactions (debits = usage)
  const now = new Date();
  const monthStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    1,
  ).toISOString();

  const { data: monthlyTransactions } = await supabase
    .from("credit_transactions")
    .select("id")
    .eq("user_id", user.id)
    .eq("transaction_type", "debit")
    .gte("created_at", monthStart);

  const analysesThisMonth = monthlyTransactions?.length ?? 0;

  const planTier = profileData?.plan_tier ?? "Free";

  // Fetch usage history from credit_transactions (last 10 transactions)
  const { data: usageHistory } = await supabase
    .from("credit_transactions")
    .select(
      "id, created_at, amount, description, balance_after, transaction_type",
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(10);

  return (
    <>
      <DashboardNavbar />
      <main className="min-h-screen bg-[#F0F4F8]">
        <div className="container mx-auto px-4 py-10 max-w-5xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[#0A2540]">Dashboard</h1>
            <p className="text-[#64748B] text-sm mt-1">{user.email}</p>
          </div>

          {/* Credits Overview Card */}
          <div className="bg-[#0A2540] rounded-2xl p-8 mb-8 relative overflow-hidden shadow-xl">
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#00D4AA]/5 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#00D4AA]/5 rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />

            <div className="relative">
              {/* Card label */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#00D4AA]/15 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-[#00D4AA]" />
                </div>
                <span className="text-white/50 text-sm tracking-wide uppercase font-medium">
                  Credits Balance
                </span>
              </div>

              {/* Balance */}
              <div className="text-5xl font-extrabold text-white tracking-tight mb-1">
                {formatNumber(currentCredits)}{" "}
                <span className="text-3xl font-semibold text-white/40">
                  credits
                </span>
              </div>
              <div className="text-[#00D4AA] text-sm mb-6">
                ≈ {formatNumber(analysesRemaining)} analyses remaining
              </div>

              {/* Progress bar */}
              <div className="mb-2 flex justify-between items-center text-xs text-white/40">
                <span>{percentUsed}% used</span>
                <span>{percentRemaining}% remaining</span>
              </div>
              <div className="h-2.5 bg-white/10 rounded-full mb-6 max-w-sm">
                <div
                  className="h-2.5 bg-gradient-to-r from-[#00D4AA] to-[#00B896] rounded-full"
                  style={{ width: `${Math.max(percentRemaining, 2)}%` }}
                />
              </div>

              {/* Mode badge + Top Up button */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#00D4AA]/10 border border-[#00D4AA]/20 text-[#00D4AA] text-xs font-semibold rounded-full">
                    <Cloud className="w-3.5 h-3.5" />
                    Cloud Mode
                  </span>
                  <span className="text-white/30 text-xs">
                    Change in app settings
                  </span>
                </div>

                <a
                  href="https://billing.stripe.com/p/login/test_fZu4gzfZC61aedS0NZ1RC00"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#00D4AA] hover:bg-[#00C49A] text-[#0A2540] text-sm font-bold px-5 py-2.5 rounded-xl transition-colors shadow-md"
                >
                  Manage Subscription →
                </a>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              {
                icon: <TrendingUp className="w-5 h-5" />,
                label: "Analyses this month",
                value: formatNumber(analysesThisMonth),
              },
              {
                icon: <Shield className="w-5 h-5" />,
                label: "Scams blocked",
                value: "–",
              },
              {
                icon: <CreditCard className="w-5 h-5" />,
                label: "Current plan",
                value: planTier,
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 bg-[#00D4AA]/10 rounded-xl flex items-center justify-center text-[#00D4AA]">
                    {stat.icon}
                  </div>
                  <span className="text-[#64748B] text-sm">{stat.label}</span>
                </div>
                <div className="text-2xl font-bold text-[#0A2540]">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* Usage History Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-[#0A2540] font-semibold text-base">
                Usage History
              </h2>
              <span className="text-[#94A3B8] text-xs">
                Last 10 transactions
              </span>
            </div>

            {/* Table header */}
            <div className="grid grid-cols-4 px-6 py-3 bg-[#F8FAFC] border-b border-gray-100 text-xs font-semibold text-[#94A3B8] uppercase tracking-wide">
              <span>Date</span>
              <span>Description</span>
              <span>Credits</span>
              <span>Balance After</span>
            </div>

            {/* Table rows */}
            <div className="divide-y divide-gray-50">
              {usageHistory && usageHistory.length > 0 ? (
                usageHistory.map((row) => (
                  <div
                    key={row.id}
                    className="grid grid-cols-4 items-center px-6 py-4 hover:bg-[#F8FAFC] transition-colors"
                  >
                    <span className="text-[#0A2540] text-sm font-medium">
                      {row.created_at ? formatDate(row.created_at) : "—"}
                    </span>
                    <span className="text-[#64748B] text-sm capitalize truncate pr-2">
                      {row.description ?? row.transaction_type}
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        row.transaction_type === "debit"
                          ? "text-[#E53E3E]"
                          : "text-[#00A887]"
                      }`}
                    >
                      {row.transaction_type === "debit" ? "-" : "+"}
                      {formatNumber(Math.abs(row.amount))}
                    </span>
                    <span className="text-[#64748B] text-sm">
                      {formatNumber(row.balance_after)}
                    </span>
                  </div>
                ))
              ) : (
                <div className="px-6 py-10 text-center text-[#94A3B8] text-sm">
                  No usage history yet.
                </div>
              )}
            </div>
          </div>

          {/* Settings Section */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mt-8">
            <div className="px-6 py-5 border-b border-gray-100">
              <h2 className="text-[#0A2540] font-semibold text-base">
                Settings & Legal
              </h2>
            </div>
            <div className="p-6">
              <a
                href="/terms"
                className="flex items-center gap-3 p-4 rounded-xl hover:bg-[#F8FAFC] transition-colors group"
              >
                <div className="w-10 h-10 bg-[#0A2540]/5 group-hover:bg-[#0A2540]/10 rounded-xl flex items-center justify-center transition-colors">
                  <FileText className="w-5 h-5 text-[#0A2540]" />
                </div>
                <div className="flex-1">
                  <div className="text-[#0A2540] font-medium text-sm">
                    Terms & Conditions
                  </div>
                  <div className="text-[#64748B] text-xs">
                    View our terms of service
                  </div>
                </div>
                <div className="text-[#94A3B8] group-hover:text-[#0A2540] transition-colors">
                  →
                </div>
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
