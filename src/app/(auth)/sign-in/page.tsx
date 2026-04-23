import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Shield } from "lucide-react";

interface LoginProps {
  searchParams: Promise<Message>;
}

export default async function SignInPage({ searchParams }: LoginProps) {
  const message = await searchParams;

  if ("message" in message) {
    return (
      <div className="flex h-screen w-full flex-1 items-center justify-center p-4 sm:max-w-md">
        <FormMessage message={message} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F1419] flex flex-col items-center justify-center px-4 py-12">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-10">
        <div className="w-9 h-9 bg-[#00D4AA] rounded-xl flex items-center justify-center">
          <Shield className="w-5 h-5 text-[#0A2540]" />
        </div>
        <span className="text-white font-semibold text-xl">CallShields</span>
      </Link>

      <div className="w-full max-w-md bg-[#1A1F26] rounded-2xl border border-white/10 p-8 shadow-2xl">
        <form className="flex flex-col gap-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-1">Welcome back</h1>
            <p className="text-white/50 text-sm">
              Sign in to access your account
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-white/70 text-sm mb-1.5 block">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#00D4AA] focus:ring-[#00D4AA]/20"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <Label htmlFor="password" className="text-white/70 text-sm">Password</Label>
                <Link className="text-xs text-white/40 hover:text-[#00D4AA] transition-colors" href="/forgot-password">
                  Forgot Password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Your password"
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#00D4AA] focus:ring-[#00D4AA]/20"
              />
            </div>
          </div>

          <SubmitButton
            className="w-full bg-[#00D4AA] text-[#0A2540] font-bold hover:bg-[#00D4AA]/90 rounded-xl py-3"
            pendingText="Signing in..."
            formAction={signInAction}
          >
            Sign in
          </SubmitButton>

          <FormMessage message={message} />
        </form>
      </div>
    </div>
  );
}
