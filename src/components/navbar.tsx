import Link from "next/link";
import { createClient } from "../../supabase/server";
import { Shield } from "lucide-react";
import UserProfile from "./user-profile";

export default async function Navbar() {
  const supabase = createClient();
  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  return (
    <nav className="w-full sticky top-0 z-50 bg-[#0A2540] backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <Link href="/" prefetch className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#00D4AA] rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-[#0A2540]" />
          </div>
          <span className="text-white font-semibold text-lg tracking-tight">
            CallShields
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-white/70 hover:text-white text-sm font-medium transition-colors">
            How It Works
          </a>
          <a href="#privacy" className="text-white/70 hover:text-white text-sm font-medium transition-colors">
            Privacy
          </a>
          <a href="#pricing" className="text-white/70 hover:text-white text-sm font-medium transition-colors">
            Pricing
          </a>
          <a
            href="https://github.com/CallShields"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white text-sm font-medium transition-colors"
          >
            GitHub ↗
          </a>
        </div>

        {/* Auth Actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="text-white/80 hover:text-white text-sm font-medium transition-colors hidden md:block"
              >
                Dashboard
              </Link>
              <UserProfile />
            </>
          ) : (
            <Link
              href="/sign-in"
              className="px-4 py-2 text-sm font-medium text-white border border-[#00D4AA] rounded-lg hover:bg-[#00D4AA]/10 transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
