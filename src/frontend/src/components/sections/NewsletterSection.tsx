import { useFadeUp } from "@/hooks/useFadeUp";
import { useAddSubscriber } from "@/hooks/useQueries";
import { AlertCircle, CheckCircle, Loader2, Mail } from "lucide-react";
import { useState } from "react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const ref = useFadeUp<HTMLDivElement>();
  const { mutateAsync, isPending } = useAddSubscriber();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    try {
      await mutateAsync(email);
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <section
      id="newsletter"
      data-ocid="newsletter.section"
      className="py-20 lg:py-28 bg-[#1F2933] relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-[#C9A227]/5 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#C9A227]/4 blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div ref={ref}>
          {/* Icon */}
          <div className="w-14 h-14 rounded-full bg-[#C9A227]/15 flex items-center justify-center mx-auto mb-6 border border-[#C9A227]/30">
            <Mail className="w-7 h-7 text-[#C9A227]" />
          </div>

          {/* Heading */}
          <span className="inline-block text-[#C9A227] text-xs font-body font-medium tracking-[0.2em] uppercase mb-3">
            Community
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Join The Growth Circle
          </h2>
          <p className="font-body text-white/55 max-w-lg mx-auto text-base mb-10 leading-relaxed">
            Weekly insights on wealth, mindset, and intentional living. No spam,
            only the ideas that move the needle.
          </p>

          {/* Form */}
          {status === "success" ? (
            <div
              data-ocid="newsletter.success_state"
              className="inline-flex items-center gap-3 bg-[#C9A227]/15 border border-[#C9A227]/30 rounded-xl px-6 py-4 text-[#C9A227]"
            >
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span className="font-body text-sm">
                You're in! Welcome to The Growth Circle.
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                data-ocid="newsletter.input"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder="Enter your email address"
                className="flex-1 bg-white/8 border border-white/15 text-white placeholder-white/35 rounded-md px-4 py-3 text-sm font-body focus:outline-none focus:border-[#C9A227]/60 focus:ring-1 focus:ring-[#C9A227]/40 transition-colors"
              />
              <button
                data-ocid="newsletter.submit_button"
                type="submit"
                disabled={isPending}
                className="btn-gold px-6 py-3 rounded-md text-sm font-heading font-semibold flex items-center gap-2 whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                {isPending ? "Joining..." : "Join Now"}
              </button>
            </form>
          )}

          {/* Error state */}
          {status === "error" && (
            <div
              data-ocid="newsletter.error_state"
              className="mt-3 inline-flex items-center gap-2 text-red-400 text-sm font-body"
            >
              <AlertCircle className="w-4 h-4" />
              {errorMsg}
            </div>
          )}

          {/* Trust note */}
          {status !== "success" && (
            <p className="mt-4 text-white/30 text-xs font-body">
              Join 10,000+ disciplined thinkers. Unsubscribe anytime.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
