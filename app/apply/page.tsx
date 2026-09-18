"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Briefcase,
  Wallet,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Loader2,
  ShieldCheck,
  PartyPopper,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { ApplicationData, EMPTY_APPLICATION } from "@/lib/applicationTypes";

const STEPS = [
  { title: "Personal", icon: User },
  { title: "Employment", icon: Briefcase },
  { title: "Loan Details", icon: Wallet },
  { title: "Address", icon: MapPin },
  { title: "Review", icon: CheckCircle2 },
];

const LOAN_TYPES = [
  "Personal Loan",
  "Home Loan",
  "Business Loan",
  "Education Loan",
  "Gold Loan",
  "Car Loan",
];

const EMPLOYMENT_TYPES = [
  "Salaried",
  "Self-Employed",
  "Business Owner",
  "Freelancer",
];

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-ink/70">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/10";

export default function ApplyPage() {
  const router = useRouter();

  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [step, setStep] = useState(0); // 0-indexed, steps 1–5 shown to user
  const [form, setForm] = useState<ApplicationData>(EMPTY_APPLICATION);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [checking, setChecking] = useState(true);

  // Guard: must have come from /apply-now with a saved lead id.
  useEffect(() => {
    const id = sessionStorage.getItem("uc_application_id");
    const mobile = sessionStorage.getItem("uc_mobile_number");
    if (!id) {
      router.replace("/apply-now");
      return;
    }
    setApplicationId(id);
    setMobileNumber(mobile ?? "");
    setChecking(false);
  }, [router]);

  function update<K extends keyof ApplicationData>(
    key: K,
    value: ApplicationData[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validateStep(current: number): string | null {
    if (current === 0) {
      if (!form.full_name.trim()) return "Please enter your full name.";
      if (!/^\S+@\S+\.\S+$/.test(form.email))
        return "Please enter a valid email address.";
      if (!form.dob) return "Please select your date of birth.";
      if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(form.pan_number.toUpperCase()))
        return "Please enter a valid PAN number.";
    }
    if (current === 1) {
      if (!form.employment_type) return "Please select your employment type.";
      if (!form.company_name.trim())
        return "Please enter your company / business name.";
      if (!form.monthly_income || Number(form.monthly_income) <= 0)
        return "Please enter your monthly income.";
    }
    if (current === 2) {
      if (!form.loan_type) return "Please select a loan type.";
      if (!form.loan_amount || Number(form.loan_amount) <= 0)
        return "Please enter the loan amount you need.";
      if (!form.tenure_months || Number(form.tenure_months) <= 0)
        return "Please enter a repayment tenure.";
    }
    if (current === 3) {
      if (!form.address.trim()) return "Please enter your address.";
      if (!form.city.trim()) return "Please enter your city.";
      if (!form.state.trim()) return "Please enter your state.";
      if (!/^\d{6}$/.test(form.pincode)) return "Please enter a valid 6-digit pincode.";
    }
    return null;
  }

  async function saveProgress(nextStep: number, finalSubmit = false) {
    if (!applicationId) return;
    setSaving(true);
    setError(null);
    try {
      const { error: dbError } = await supabase
        .from("loan_applications")
        .update({
          full_name: form.full_name || null,
          email: form.email || null,
          dob: form.dob || null,
          pan_number: form.pan_number || null,
          employment_type: form.employment_type || null,
          company_name: form.company_name || null,
          monthly_income: form.monthly_income
            ? Number(form.monthly_income)
            : null,
          loan_type: form.loan_type || null,
          loan_amount: form.loan_amount ? Number(form.loan_amount) : null,
          tenure_months: form.tenure_months
            ? Number(form.tenure_months)
            : null,
          loan_purpose: form.loan_purpose || null,
          address: form.address || null,
          city: form.city || null,
          state: form.state || null,
          pincode: form.pincode || null,
          current_step: nextStep + 1,
          status: finalSubmit ? "submitted" : "in_progress",
          updated_at: new Date().toISOString(),
        })
        .eq("id", applicationId);

      if (dbError) throw dbError;
      return true;
    } catch (err) {
      console.error(err);
      setError("Couldn't save your details. Please check your connection and try again.");
      return false;
    } finally {
      setSaving(false);
    }
  }

  async function handleNext() {
    const validationError = validateStep(step);
    if (validationError) {
      setError(validationError);
      return;
    }
    const ok = await saveProgress(step + 1);
    if (!ok) return;

    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleBack() {
    setError(null);
    setStep((s) => Math.max(0, s - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit() {
    const ok = await saveProgress(step, true);
    if (ok) {
      sessionStorage.removeItem("uc_application_id");
      sessionStorage.removeItem("uc_mobile_number");
      setSubmitted(true);
    }
  }

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAFAFE] font-sans">
        <Loader2 className="h-6 w-6 animate-spin text-brand" />
      </main>
    );
  }

  if (submitted) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#FAFAFE] px-4 py-16 font-sans antialiased">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl shadow-black/5">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-light">
            <PartyPopper className="h-8 w-8 text-brand" strokeWidth={1.5} />
          </span>
          <h1 className="mt-5 text-xl font-extrabold text-ink sm:text-2xl">
            Application Submitted!
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Thank you for applying with{" "}
            <span className="font-semibold text-ink">Utkarsh Capital</span>.
            Our team will review your details and reach out on{" "}
            <span className="font-semibold text-ink">+91 {mobileNumber}</span>{" "}
            within 24 hours.
          </p>
          <a
            href="/"
            className="mt-7 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-ink py-3.5 text-sm font-semibold text-white transition-colors hover:bg-black"
          >
            Back to Home
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAFE] pb-16 font-sans antialiased">
      {/* Header */}
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
          <a href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand font-extrabold text-white">
              U
            </span>
            <span className="text-sm font-bold tracking-tight text-ink sm:text-base">
              Utkarsh Capital
            </span>
          </a>
          <span className="flex items-center gap-1.5 text-xs font-medium text-muted">
            <ShieldCheck className="h-3.5 w-3.5 text-brand" /> +91 {mobileNumber}
          </span>
        </div>
      </header>

      {/* Stepper */}
      <div className="mx-auto max-w-3xl px-4 pt-8 sm:px-6">
        <div className="flex items-center">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const isActive = i === step;
            const isDone = i < step;
            return (
              <div key={s.title} className="flex flex-1 items-center last:flex-none">
                <div className="flex flex-col items-center gap-1.5">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors sm:h-10 sm:w-10 ${
                      isDone
                        ? "border-brand bg-brand text-white"
                        : isActive
                        ? "border-brand bg-white text-brand"
                        : "border-black/10 bg-white text-ink/30"
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" />
                    ) : (
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                  </span>
                  <span
                    className={`hidden text-[10px] font-medium sm:block ${
                      isActive ? "text-brand" : "text-ink/40"
                    }`}
                  >
                    {s.title}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`mx-1.5 h-0.5 flex-1 rounded-full transition-colors sm:mx-2 ${
                      isDone ? "bg-brand" : "bg-black/10"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-center text-xs font-medium text-muted sm:hidden">
          Step {step + 1} of {STEPS.length} — {STEPS[step].title}
        </p>
      </div>

      {/* Form card */}
      <div className="mx-auto mt-6 max-w-3xl px-4 sm:px-6">
        <div className="rounded-3xl bg-white p-6 shadow-sm shadow-black/[0.03] sm:p-8">
          {step === 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-extrabold text-ink sm:text-xl">
                Personal Details
              </h2>
              <Field label="Full Name">
                <input
                  className={inputClass}
                  value={form.full_name}
                  onChange={(e) => update("full_name", e.target.value)}
                  placeholder="As per your ID proof"
                />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Email Address">
                  <input
                    type="email"
                    className={inputClass}
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="you@example.com"
                  />
                </Field>
                <Field label="Date of Birth">
                  <input
                    type="date"
                    className={inputClass}
                    value={form.dob}
                    onChange={(e) => update("dob", e.target.value)}
                  />
                </Field>
              </div>
              <Field label="PAN Number">
                <input
                  className={`${inputClass} uppercase`}
                  maxLength={10}
                  value={form.pan_number}
                  onChange={(e) =>
                    update("pan_number", e.target.value.toUpperCase())
                  }
                  placeholder="ABCDE1234F"
                />
              </Field>
            </div>
          )}

          {step === 1 && (
            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-extrabold text-ink sm:text-xl">
                Employment Details
              </h2>
              <Field label="Employment Type">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {EMPLOYMENT_TYPES.map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => update("employment_type", type)}
                      className={`rounded-xl border px-3 py-3 text-xs font-semibold transition-colors sm:text-sm ${
                        form.employment_type === type
                          ? "border-brand bg-brand-light text-brand"
                          : "border-black/10 text-ink/60 hover:border-brand/40"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="Company / Business Name">
                <input
                  className={inputClass}
                  value={form.company_name}
                  onChange={(e) => update("company_name", e.target.value)}
                  placeholder="e.g. Acme Pvt. Ltd."
                />
              </Field>
              <Field label="Monthly Income (₹)">
                <input
                  type="number"
                  className={inputClass}
                  value={form.monthly_income}
                  onChange={(e) => update("monthly_income", e.target.value)}
                  placeholder="e.g. 45000"
                />
              </Field>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-extrabold text-ink sm:text-xl">
                Loan Details
              </h2>
              <Field label="Loan Type">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {LOAN_TYPES.map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => update("loan_type", type)}
                      className={`rounded-xl border px-3 py-3 text-xs font-semibold transition-colors sm:text-sm ${
                        form.loan_type === type
                          ? "border-brand bg-brand-light text-brand"
                          : "border-black/10 text-ink/60 hover:border-brand/40"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Loan Amount (₹)">
                  <input
                    type="number"
                    className={inputClass}
                    value={form.loan_amount}
                    onChange={(e) => update("loan_amount", e.target.value)}
                    placeholder="e.g. 500000"
                  />
                </Field>
                <Field label="Tenure (months)">
                  <input
                    type="number"
                    className={inputClass}
                    value={form.tenure_months}
                    onChange={(e) => update("tenure_months", e.target.value)}
                    placeholder="e.g. 24"
                  />
                </Field>
              </div>
              <Field label="Purpose of Loan (optional)">
                <textarea
                  className={`${inputClass} min-h-[90px] resize-none`}
                  value={form.loan_purpose}
                  onChange={(e) => update("loan_purpose", e.target.value)}
                  placeholder="Tell us briefly what the loan is for"
                />
              </Field>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-extrabold text-ink sm:text-xl">
                Address Details
              </h2>
              <Field label="Address">
                <textarea
                  className={`${inputClass} min-h-[80px] resize-none`}
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                  placeholder="House / Flat no., street, area"
                />
              </Field>
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="City">
                  <input
                    className={inputClass}
                    value={form.city}
                    onChange={(e) => update("city", e.target.value)}
                  />
                </Field>
                <Field label="State">
                  <input
                    className={inputClass}
                    value={form.state}
                    onChange={(e) => update("state", e.target.value)}
                  />
                </Field>
                <Field label="Pincode">
                  <input
                    className={inputClass}
                    maxLength={6}
                    value={form.pincode}
                    onChange={(e) =>
                      update("pincode", e.target.value.replace(/\D/g, ""))
                    }
                  />
                </Field>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="flex flex-col gap-5">
              <h2 className="text-lg font-extrabold text-ink sm:text-xl">
                Review &amp; Submit
              </h2>
              <p className="text-sm text-muted">
                Please review your details before submitting your application.
              </p>

              <div className="flex flex-col gap-4">
                <ReviewGroup title="Personal">
                  <ReviewRow label="Full Name" value={form.full_name} />
                  <ReviewRow label="Email" value={form.email} />
                  <ReviewRow label="Date of Birth" value={form.dob} />
                  <ReviewRow label="PAN" value={form.pan_number} />
                </ReviewGroup>
                <ReviewGroup title="Employment">
                  <ReviewRow label="Type" value={form.employment_type} />
                  <ReviewRow label="Company" value={form.company_name} />
                  <ReviewRow
                    label="Monthly Income"
                    value={form.monthly_income ? `₹${form.monthly_income}` : ""}
                  />
                </ReviewGroup>
                <ReviewGroup title="Loan">
                  <ReviewRow label="Type" value={form.loan_type} />
                  <ReviewRow
                    label="Amount"
                    value={form.loan_amount ? `₹${form.loan_amount}` : ""}
                  />
                  <ReviewRow
                    label="Tenure"
                    value={
                      form.tenure_months ? `${form.tenure_months} months` : ""
                    }
                  />
                </ReviewGroup>
                <ReviewGroup title="Address">
                  <ReviewRow
                    label="Address"
                    value={`${form.address}${form.city ? ", " + form.city : ""}${
                      form.state ? ", " + form.state : ""
                    }${form.pincode ? " - " + form.pincode : ""}`}
                  />
                </ReviewGroup>
              </div>
            </div>
          )}

          {error && (
            <p className="mt-4 text-xs font-medium text-red-500">{error}</p>
          )}

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between gap-3 border-t border-black/5 pt-6">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 0 || saving}
              className="inline-flex items-center gap-1.5 rounded-full border border-black/10 px-5 py-3 text-sm font-semibold text-ink/70 transition-colors hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>

            {step < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={saving}
                className="inline-flex items-center gap-1.5 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-70"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Next <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={saving}
                className="inline-flex items-center gap-1.5 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Submit Application <CheckCircle2 className="h-4 w-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function ReviewGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-[#FAFAFE] p-4 sm:p-5">
      <h3 className="text-xs font-bold uppercase tracking-wide text-brand">
        {title}
      </h3>
      <div className="mt-3 flex flex-col gap-2">{children}</div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <span className="text-muted">{label}</span>
      <span className="text-right font-medium text-ink">{value || "—"}</span>
    </div>
  );
}
