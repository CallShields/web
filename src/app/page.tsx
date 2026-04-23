import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { createClient } from "../../supabase/server";
import {
  ArrowUpRight,
  CheckCircle2,
  Zap,
  Shield,
  Phone,
  Lock,
  Star,
  Code2,
  Cloud,
  Cpu,
  Check,
  X,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navbar />
      <Hero />

      {/* ─── How It Works ─── */}
      <section className="py-24 bg-[#F8F9FA]" id="how-it-works">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 bg-[#00D4AA]/10 text-[#00D4AA] text-xs font-semibold rounded-full uppercase tracking-widest mb-4">
              How It Works
            </div>
            <h2 className="text-3xl font-bold text-[#0A2540] mb-4">
              Scam protection in 3 simple steps
            </h2>
            <p className="text-[#64748B] max-w-xl mx-auto">
              CallShields works silently in the background — no setup required
              after installation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                icon: <Phone className="w-6 h-6" />,
                title: "Record the call",
                desc: "CallShields runs in the background using Android's Accessibility Service to capture call audio.",
              },
              {
                step: "02",
                icon: <Cpu className="w-6 h-6" />,
                title: "Transcribe locally",
                desc: "Vosk converts speech to text entirely on your device — no audio ever leaves your phone.",
              },
              {
                step: "03",
                icon: <Zap className="w-6 h-6" />,
                title: "AI scam detection",
                desc: "The transcript is analyzed by an LLM to score scam probability, flag red flags, and recommend action.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-4 right-4 text-6xl font-black text-[#0A2540]/5 leading-none select-none">
                  {item.step}
                </div>
                <div className="w-12 h-12 bg-[#00D4AA]/10 rounded-xl flex items-center justify-center text-[#00D4AA] mb-6">
                  {item.icon}
                </div>
                <h3 className="text-[#0A2540] font-semibold text-lg mb-3">{item.title}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-8 mt-12">
            {[
              { icon: <Zap className="w-4 h-4" />, label: "Fast" },
              { icon: <Lock className="w-4 h-4" />, label: "Private" },
              { icon: <Shield className="w-4 h-4" />, label: "Accurate" },
              { icon: <CheckCircle2 className="w-4 h-4" />, label: "Free tier" },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-2 text-[#64748B] text-sm">
                <span className="text-[#00D4AA]">{f.icon}</span>
                {f.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Privacy ─── */}
      <section className="py-24" id="privacy">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden max-w-5xl mx-auto shadow-xl">
            <div className="bg-[#0A2540] p-12 flex flex-col justify-center">
              <div className="inline-block px-3 py-1 bg-[#00D4AA]/10 text-[#00D4AA] text-xs font-semibold rounded-full uppercase tracking-widest mb-6">
                Privacy
              </div>
              <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
                Privacy first.<br />Always.
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-8">
                We built CallShields with the belief that privacy isn't a
                feature — it's a right. Every architectural decision reflects
                that commitment.
              </p>
              <a
                href="https://github.com/CallShields/android"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#00D4AA] text-sm font-semibold hover:opacity-80 transition-opacity"
              >
                View Source on GitHub <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
            <div className="bg-white p-12 flex flex-col gap-8 justify-center">
              {[
                {
                  icon: <Lock className="w-5 h-5" />,
                  title: "Local Mode",
                  desc: "Everything stays on your device. Vosk transcribes audio offline. Zero data sent to any server.",
                },
                {
                  icon: <Cloud className="w-5 h-5" />,
                  title: "Secure Cloud Mode",
                  desc: "Only anonymized text transcripts are sent — never audio. Secured with Supabase RLS and JWT auth.",
                },
                {
                  icon: <Code2 className="w-5 h-5" />,
                  title: "Open Source",
                  desc: "Our full source code is on GitHub. Audit every line. Trust through transparency, not promises.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 bg-[#00D4AA]/10 rounded-xl flex items-center justify-center text-[#00D4AA] flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-[#0A2540] font-semibold text-sm mb-1">{item.title}</h3>
                    <p className="text-[#64748B] text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Our Story ─── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-center mb-12">
            <div>
              <div className="inline-block px-3 py-1 bg-[#0A2540]/5 text-[#0A2540] text-xs font-semibold rounded-full uppercase tracking-widest mb-6">
                Our Story
              </div>
              <h3 className="text-2xl font-bold text-[#0A2540] mb-6">
                Why we built CallShields
              </h3>
              <div className="space-y-5 text-[#64748B] text-sm leading-relaxed">
                <p>
                  Phone fraud costs billions annually. The elderly and vulnerable
                  are hardest hit — often targeted by sophisticated social
                  engineering that plays on fear and urgency.
                </p>
                <p>
                  Existing solutions require cloud audio uploads or charge
                  expensive monthly fees. We wanted something anyone can use,
                  privately, without surrendering their data.
                </p>
                <p>
                  CallShields is built by developers who believe in open,
                  trustworthy tools. Our local mode is free forever — because
                  everyone deserves protection.
                </p>
              </div>
            </div>
            <div className="bg-[#0A2540] rounded-2xl p-8 border-2 border-[#00D4AA]/30">
              <div className="space-y-6">
                {[
                  { icon: "💸", label: "Scam call losses globally in 2025", value: "$80B+" },
                  { icon: "🛡️", label: "Codebase status", value: "Open source & auditable" },
                  { icon: "📱", label: "Platforms & modes", value: "Android · Local + Cloud" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <div className="text-[#00D4AA] font-semibold">{item.value}</div>
                      <div className="text-white/50 text-sm">{item.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Pricing ─── */}
      <section className="py-24 bg-white" id="pricing">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-block px-3 py-1 bg-[#00D4AA]/10 text-[#00D4AA] text-xs font-semibold rounded-full uppercase tracking-widest mb-4">
              Pricing
            </div>
            <h2 className="text-3xl font-bold text-[#0A2540] mb-3">
              Free or Paid? Your Choice
            </h2>
            <p className="text-[#64748B] text-sm max-w-2xl mx-auto">
              We offer two modes to fit your needs and privacy preferences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="bg-[#F8F9FA] rounded-2xl p-8 border border-gray-200">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-[#0A2540]/10 rounded-xl flex items-center justify-center">
                  <Lock className="w-5 h-5 text-[#0A2540]" />
                </div>
                <div>
                  <h4 className="text-[#0A2540] font-bold text-lg">Free Plan</h4>
                  <p className="text-[#64748B] text-xs">Local & Private</p>
                </div>
              </div>
              <p className="text-[#64748B] text-sm leading-relaxed mb-6">
                Just by downloading our app—no sign up required—you can enjoy local model support. All processing happens completely on your device, works without internet, and stays 100% private.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#00D4AA] flex-shrink-0 mt-0.5" />
                  <span className="text-[#64748B] text-sm">No account or sign-up needed</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#00D4AA] flex-shrink-0 mt-0.5" />
                  <span className="text-[#64748B] text-sm">Works completely offline</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#00D4AA] flex-shrink-0 mt-0.5" />
                  <span className="text-[#64748B] text-sm">Detects common scams (fake delivery, police impersonation) and generates brief summaries</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#00D4AA] flex-shrink-0 mt-0.5" />
                  <span className="text-[#64748B] text-sm">100% private—data never leaves your phone</span>
                </div>
                <div className="flex items-start gap-2">
                  <X className="w-4 h-4 text-[#EF4444] flex-shrink-0 mt-0.5" />
                  <span className="text-[#64748B] text-sm">Requires high computational power and may drain battery faster</span>
                </div>
              </div>
            </div>

            {/* Paid Plan */}
            <div className="bg-[#0A2540] rounded-2xl p-8 border-2 border-[#00D4AA]/30">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-[#00D4AA]/20 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#00D4AA]" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">Paid Plan</h4>
                  <p className="text-white/60 text-xs">Enhanced Protection · $14.80/month</p>
                </div>
              </div>
              <p className="text-white/80 text-sm leading-relaxed mb-6">
                For users at higher risk of targeted scams. Scammers often use personalized tactics and your personal information to seem credible. Our paid plan uses state-of-the-art language models to detect these nuanced attacks—notifying you seconds before you fall into their trap.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#00D4AA] flex-shrink-0 mt-0.5" />
                  <span className="text-white/80 text-sm">Faster, more accurate scam detection and call summaries</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#00D4AA] flex-shrink-0 mt-0.5" />
                  <span className="text-white/80 text-sm">Detects personalized & sophisticated tactics</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#00D4AA] flex-shrink-0 mt-0.5" />
                  <span className="text-white/80 text-sm">Real-time alerts powered by SOTA AI models</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#00D4AA] flex-shrink-0 mt-0.5" />
                  <span className="text-white/80 text-sm">Extra layer of protection for you & family</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#00D4AA] flex-shrink-0 mt-0.5" />
                  <span className="text-white/80 text-sm">Offloads processing to our secure servers to save your battery life</span>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="max-w-2xl mx-auto mt-16">
            <h3 className="text-center text-[#0A2540] font-semibold text-lg mb-8">
              Frequently Asked Questions
            </h3>
            <Accordion type="single" collapsible className="w-full">
              {[
                { q: "Is audio stored?", a: "Never. Audio is transcribed locally using Vosk. Only anonymized text transcripts are sent to the cloud in Secure Cloud mode." },
                { q: "Can I switch modes?", a: "Yes. You can switch between Local and Secure Cloud mode at any time in the app settings." },
                { q: "What AI models are used?", a: "Local mode uses Vosk for transcription + on-device LLM scoring. Cloud mode uses GPT-4o-mini for higher accuracy detection." },
              ].map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b border-gray-100">
                  <AccordionTrigger className="text-[#0A2540] font-medium text-sm text-left hover:no-underline py-4">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#64748B] text-sm leading-relaxed pb-4">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 bg-[#0A2540]">
        <div className="container mx-auto px-4 text-center">
          <div className="w-14 h-14 bg-[#00D4AA]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-7 h-7 text-[#00D4AA]" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Stop Phone Scams?
          </h2>
          <p className="text-white/60 mb-10 max-w-xl mx-auto text-sm leading-relaxed">
            Join thousands of residents who trust CallShields to protect them
            from fraudulent calls — privately, accurately, and for free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/CallShields/android/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-[#0A2540] bg-[#00D4AA] rounded-xl hover:bg-[#00D4AA]/90 transition-colors font-semibold text-sm"
            >
              Download Free on GitHub
              <ArrowUpRight className="ml-2 w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
