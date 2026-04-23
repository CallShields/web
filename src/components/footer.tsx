import Link from "next/link";
import { Github, Shield } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A2540] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-10">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#00D4AA] rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#0A2540]" />
              </div>
              <span className="text-white font-semibold text-lg">CallShields</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Open-source scam protection for everyone.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-10">
            <div>
              <h4 className="text-white/80 font-semibold text-sm mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#how-it-works" className="text-white/50 hover:text-[#00D4AA] text-sm transition-colors">How It Works</a></li>
                <li><a href="#privacy" className="text-white/50 hover:text-[#00D4AA] text-sm transition-colors">Privacy</a></li>
                <li><a href="#pricing" className="text-white/50 hover:text-[#00D4AA] text-sm transition-colors">Pricing</a></li>
                <li>
                  <Link href="/dashboard" className="text-white/50 hover:text-[#00D4AA] text-sm transition-colors">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white/80 font-semibold text-sm mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy-policy" className="text-white/50 hover:text-[#00D4AA] text-sm transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-white/50 hover:text-[#00D4AA] text-sm transition-colors">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/license" className="text-white/50 hover:text-[#00D4AA] text-sm transition-colors">
                    License
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {currentYear} CallShields
          </p>
          <a
            href="https://github.com/CallShields"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/50 hover:text-[#00D4AA] text-sm transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>View on GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

