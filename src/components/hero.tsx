import Link from "next/link";
import { ArrowUpRight, Shield, Lock, Smartphone, GitFork } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-[#0F1419]">
      {/* Teal radial glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] -translate-y-1/2 bg-[#00D4AA]/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[#0A2540]/80 rounded-full blur-[80px]" />
      </div>

      <div className="relative pt-20 pb-28 sm:pt-28 sm:pb-36">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-12 items-center max-w-6xl mx-auto">
            {/* Left column (60%) */}
            <div className="lg:col-span-3 text-left">
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00D4AA]/10 border border-[#00D4AA]/30 rounded-full text-[#00D4AA] text-sm font-medium mb-8">
                <span>🛡️</span>
                <span>Open Source · Android · Free to start</span>
              </div>

              <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
                Your AI Shield Against{" "}
                <span className="text-[#00D4AA]">Phone Scams</span>
              </h1>

              <p className="text-xl text-[#64748B] mb-10 leading-relaxed max-w-xl">
                CallShields listens in the background and alerts you the moment
                a call shows scam signals — privately processed on your device
                or secured in the cloud.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <a
                  href="https://github.com/CallShields/android/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 text-[#0A2540] bg-[#00D4AA] rounded-xl hover:bg-[#00D4AA]/90 transition-colors text-base font-semibold"
                >
                  Download on GitHub
                  <ArrowUpRight className="ml-2 w-5 h-5" />
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center px-8 py-4 text-white border border-white/20 rounded-xl hover:bg-white/5 transition-colors text-base font-medium"
                >
                  See How It Works
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-6 text-sm text-[#64748B]">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#00D4AA]" />
                  <span>No Audio Stored</span>
                </div>
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-[#00D4AA]" />
                  <span>Android</span>
                </div>
                <div className="flex items-center gap-2">
                  <GitFork className="w-4 h-4 text-[#00D4AA]" />
                  <span>Open Source</span>
                </div>
              </div>
            </div>

            {/* Right column — Phone mockup (40%) */}
            <div className="lg:col-span-2 relative flex justify-center">
              {/* Glow ring behind phone */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-72 h-72 bg-[#00D4AA]/20 rounded-full blur-3xl" />
              </div>

              <div className="relative mx-auto w-64 bg-[#1A1F26] rounded-[2rem] p-[3px] shadow-2xl border border-white/10">
                {/* Phone frame */}
                <div className="w-full bg-[#0F1419] rounded-[1.85rem] overflow-hidden">
                  {/* Notch */}
                  <div className="flex justify-center pt-3 pb-2">
                    <div className="w-24 h-1.5 bg-[#1A1F26] rounded-full" />
                  </div>

                  <div className="px-4 pb-6">
                    {/* Status bar */}
                    <div className="flex justify-between items-center mb-5 text-xs text-white/40">
                      <span>9:41</span>
                      <div className="flex gap-1 items-center">
                        <div className="w-3 h-1.5 bg-[#00D4AA] rounded-sm" />
                        <div className="w-3 h-1.5 bg-[#00D4AA] rounded-sm" />
                        <div className="w-3 h-1.5 bg-[#00D4AA]/40 rounded-sm" />
                      </div>
                    </div>

                    {/* App header */}
                    <div className="flex items-center gap-2 mb-5">
                      <div className="w-7 h-7 bg-[#00D4AA] rounded-lg flex items-center justify-center">
                        <Shield className="w-4 h-4 text-[#0A2540]" />
                      </div>
                      <span className="text-white text-sm font-semibold">CallShields</span>
                      <div className="ml-auto flex items-center gap-1">
                        <div className="w-2 h-2 bg-[#00D4AA] rounded-full animate-pulse" />
                        <span className="text-[#00D4AA] text-xs">Active</span>
                      </div>
                    </div>

                    {/* Incoming call */}
                    <div className="bg-[#1A1F26] rounded-2xl p-4 mb-3 border border-white/5">
                      <div className="text-xs text-white/40 mb-1">Incoming call</div>
                      <div className="text-white font-semibold text-base mb-1">+852 9123 4567</div>
                      <div className="text-xs text-white/40">Unknown number</div>
                    </div>

                    {/* AI Analysis */}
                    <div className="bg-[#1A1F26] rounded-2xl p-4 mb-3 border border-white/5">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-[#00D4AA] rounded-full animate-pulse" />
                        <span className="text-[#00D4AA] text-xs font-medium">AI Analyzing...</span>
                      </div>
                      <div className="space-y-1.5">
                        <div className="h-1.5 bg-[#00D4AA]/30 rounded-full w-full" />
                        <div className="h-1.5 bg-[#00D4AA]/20 rounded-full w-3/4" />
                        <div className="h-1.5 bg-[#00D4AA]/10 rounded-full w-1/2" />
                      </div>
                    </div>

                    {/* Scam alert */}
                    <div className="bg-[#FF4D4D]/10 border border-[#FF4D4D]/30 rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-base">⚠️</span>
                        <span className="text-[#FF4D4D] text-xs font-bold tracking-wide">SCAM DETECTED</span>
                      </div>
                      <p className="text-white/60 text-xs leading-relaxed">
                        "Bank account" + "urgent verification" pattern detected.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-3 -right-3 bg-[#00D4AA] text-[#0A2540] px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                🔊 Alert Active
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
