"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Phone,
  ArrowRight,
  ShieldCheck,
  Clock,
  Lock,
  Loader2,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function ApplyNowPage() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [agree, setAgree] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValidPhone = /^[6-9]\d{9}$/.test(phone);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!isValidPhone) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!agree) {
      setError("Please accept the Terms and Privacy Policy to continue.");
      return;
    }

    setLoading(true);
    try {
      const { data, error: dbError } = await supabase
        .from("loan_applications")
        .insert({
          mobile_number: phone,
          status: "new",
          current_step: 1,
        })
        .select("id")
        .single();

      if (dbError) throw dbError;

      // Keep the id so the /apply wizard knows which record to update.
      sessionStorage.setItem("uc_application_id", data.id);
      sessionStorage.setItem("uc_mobile_number", phone);

      router.push("/apply");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-brand-deep via-[#2E2494] to-brand px-4 py-16 font-sans antialiased sm:px-6">
      {/* decorative glow, consistent with homepage hero */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl sm:h-96 sm:w-96" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl sm:h-96 sm:w-96" />

      <div className="relative w-full max-w-md">
        <a href="/" className="mb-8 flex items-center justify-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white font-extrabold text-brand">
            U
          </span>
          <span className="text-lg font-bold tracking-tight text-white">
            Utkarsh Capital
          </span>
        </a>

        <div className="rounded-3xl bg-white p-6 shadow-2xl shadow-black/20 sm:p-8">
          <div className="text-center">
            <h1 className="text-xl font-extrabold text-ink sm:text-2xl">
              Apply for Your Loan
            </h1>
            <p className="mt-2 text-sm text-muted">
              Enter your mobile number to get started — it only takes a
              minute.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4">
            <div>
              <div
                className={`flex items-center gap-2 rounded-full border bg-white px-4 py-3.5 shadow-sm transition-colors ${
                  error && !isValidPhone
                    ? "border-red-300"
                    : "border-black/10 focus-within:border-brand"
                }`}
              >
                <Phone className="h-4 w-4 shrink-0 text-brand/60" />
                <span className="text-sm text-ink/50">+91</span>
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  placeholder="Enter mobile number"
                  className="w-full bg-transparent text-sm text-ink placeholder:text-ink/40 focus:outline-none"
                />
              </div>
            </div>

            {error && (
              <p className="text-xs font-medium text-red-500">{error}</p>
            )}

            <label className="flex items-start gap-2 text-xs text-muted">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-0.5 h-3.5 w-3.5 accent-[#4F3FF0]"
              />
              I agree to the{" "}
              <a href="#" className="font-medium text-brand underline underline-offset-2">
                Terms
              </a>{" "}
              and{" "}
              <a href="#" className="font-medium text-brand underline underline-offset-2">
                Privacy Policy
              </a>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-ink py-3.5 text-sm font-semibold text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Please wait...
                </>
              ) : (
                <>
                  Continue <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-black/5 pt-5 text-[11px] text-muted">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-brand" /> Bank-level security
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-brand" /> 2-min process
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-brand" /> 100% confidential
            </span>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-white/60">
          No impact on your credit score for checking eligibility.
        </p>
      </div>
    </main>
  );
}
