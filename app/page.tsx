"use client";

import { useMemo, useState } from "react";
import {
  ShieldCheck,
  PiggyBank,
  TrendingUp,
  Globe2,
  Home as HomeIcon,
  Briefcase,
  GraduationCap,
  Coins,
  Car,
  Rocket,
  Handshake,
  Tag,
  Headphones,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Facebook,
  Linkedin,
  Instagram,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Content — edit these arrays to change what the page displays       */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Loans", href: "#loans" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const LOAN_OPTIONS = [
  {
    icon: PiggyBank,
    title: "Personal Loan",
    rate: "10.49% onwards",
    desc: "Quick access to funds for your personal needs with minimal documentation.",
  },
  {
    icon: HomeIcon,
    title: "Home Loan",
    rate: "8.75% onwards",
    desc: "Turn your dream of owning a home into reality with our flexible home loan options.",
  },
  {
    icon: Briefcase,
    title: "Business Loan",
    rate: "11.25% onwards",
    desc: "Power your business growth with tailored financing built for entrepreneurs.",
  },
  {
    icon: GraduationCap,
    title: "Education Loan",
    rate: "8.75% onwards",
    desc: "Make education affordable with our easy and flexible student loan plans.",
  },
  {
    icon: Coins,
    title: "Gold Loan",
    rate: "10.25% onwards",
    desc: "Unlock your gold's potential — get a quick loan to achieve your goals today.",
  },
  {
    icon: Car,
    title: "Car Loan",
    rate: "10.49% onwards",
    desc: "Drive your dream car home with our low-interest car loan options.",
  },
];

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "100% Transparent Process",
    desc: "Clear documentation and upfront information about all terms and conditions.",
  },
  {
    icon: Rocket,
    title: "Fast Approvals",
    desc: "Get your loan approved within 24 hours through our streamlined process.",
  },
  {
    icon: Handshake,
    title: "Trusted Lenders",
    desc: "Partner with India's top banks and NBFCs for secure lending.",
  },
  {
    icon: Tag,
    title: "No Hidden Fees",
    desc: "All charges clearly disclosed upfront with no surprise costs.",
  },
  {
    icon: Headphones,
    title: "24/7 Customer Support",
    desc: "Round-the-clock assistance for all your loan-related queries.",
  },
];

const CHARGES = [
  {
    title: "Interest Rate",
    desc: "Starting interest rate varies based on credit history, financial obligations, and lender discretion.",
  },
  {
    title: "Eligibility",
    desc: "Loan approval is subject to successful KYC and income verification.",
  },
  {
    title: "APR & Repayment Schedule",
    desc: "Min APR – 5.99%, Max APR – 18%. Repayment tenure: 6 to 120 months. T&C apply.",
  },
  {
    title: "Processing / Facilitation Fee",
    desc: "Ranges from 2% to 5% of the approved loan.",
  },
  {
    title: "Foreclosure Policy",
    desc: "No part payments. Full payment allowed only after paying at least 3 EMIs.",
  },
  {
    title: "Overdue EMI Charges",
    desc: "2% per month on outstanding amount.",
  },
  {
    title: "Cheque Bounce",
    desc: "₹500 per bounce.",
  },
  {
    title: "Loan Cancellation",
    desc: "No extra charges. Interest between disbursement and cancellation is payable. Processing fees are non-refundable.",
  },
  {
    title: "Example",
    desc: "Loan of ₹1L at 8% p.a. for 24 months = EMI of ₹4,523.",
  },
];

const FAQS = [
  {
    q: "What documents do I need to apply for a loan?",
    a: "You'll typically need a valid ID proof, address proof, income proof (salary slips or ITR), and bank statements from the last three months. Specific document lists vary by loan type.",
  },
  {
    q: "How long does the loan approval process take?",
    a: "Most applications are reviewed within 24 hours of submitting complete documentation. Disbursal timelines depend on the lender and loan type.",
  },
  {
    q: "What is the minimum credit score required for loan approval?",
    a: "A CIBIL score of 700 or above generally improves your chances, though eligibility also depends on income, existing obligations, and the lending partner's policy.",
  },
  {
    q: "Can I repay my loan before the tenure ends?",
    a: "Foreclosure is allowed only after at least 3 EMIs have been paid, and part payments are not permitted. See our charges section for details.",
  },
  {
    q: "How are interest rates determined for my loan?",
    a: "Rates are set based on your credit profile, income stability, loan amount, tenure, and the specific lending partner's risk assessment.",
  },
  {
    q: "Is there a processing fee for loan applications?",
    a: "Yes, a facilitation fee of 2% to 5% of the approved loan amount applies and is non-refundable, even if the loan is later cancelled.",
  },
];

/* ------------------------------------------------------------------ */
/*  Small helpers                                                      */
/* ------------------------------------------------------------------ */

function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-sm">
        <span className="text-white/60">{label}</span>
        <span className="font-semibold text-white">
          {suffix === "₹" ? formatINR(value) : `${value}${suffix}`}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-[#C89B3C]"
      />
    </div>
  );
}

function FaqItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[#E4E0D6]">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 py-5 text-left"
      >
        <span className="font-serif text-lg text-ink">{q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-brand transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
        style={{ display: "grid" }}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl text-sm leading-relaxed text-muted">{a}</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [agree, setAgree] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [amount, setAmount] = useState(2500000);
  const [tenure, setTenure] = useState(31);
  const [rate, setRate] = useState(12.4);

  const { emi, interest, total } = useMemo(() => {
    const r = rate / 12 / 100;
    const n = tenure;
    const monthly =
      r === 0 ? amount / n : (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayable = monthly * n;
    return {
      emi: Math.round(monthly),
      interest: Math.round(totalPayable - amount),
      total: Math.round(totalPayable),
    };
  }, [amount, tenure, rate]);

  const principalShare = amount / total;
  const circumference = 2 * Math.PI * 70;
  const principalDash = circumference * principalShare;

  return (
    <main className="bg-cream font-sans text-ink antialiased">
      {/* ---------------------------------------------------------- */}
      {/* Header                                                     */}
      {/* ---------------------------------------------------------- */}
      <header className="sticky top-0 z-50 border-b border-[#E4E0D6] bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#home" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand font-serif text-base text-white">
              U
            </span>
            <span className="font-serif text-lg tracking-tight text-ink">
              Utkarsh Capital
            </span>
          </a>

          <nav className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-ink/70 transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 text-sm text-ink/70 md:flex">
            <span>Member since 2019</span>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-[#E4E0D6] bg-cream px-6 pb-6 md:hidden">
            <nav className="flex flex-col gap-4 pt-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-ink/80"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* ---------------------------------------------------------- */}
      {/* Hero                                                        */}
      {/* ---------------------------------------------------------- */}
      <section id="home" className="relative overflow-hidden bg-ink">
        {/* decorative concentric rings, not a stock gradient blob */}
        <svg
          className="pointer-events-none absolute -right-24 top-1/2 hidden h-[560px] w-[560px] -translate-y-1/2 opacity-70 md:block"
          viewBox="0 0 560 560"
          fill="none"
        >
          {[260, 210, 160, 110, 60].map((r, i) => (
            <circle
              key={r}
              cx="280"
              cy="280"
              r={r}
              stroke={i % 2 === 0 ? "#C89B3C" : "#4F42B0"}
              strokeOpacity={0.35}
              strokeWidth="1"
            />
          ))}
          <circle cx="280" cy="280" r="34" fill="#C89B3C" fillOpacity="0.9" />
        </svg>

        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="max-w-2xl">
            <h1 className="font-serif text-5xl leading-[1.08] text-white md:text-6xl">
              Unlock your financial freedom
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/70">
              Simple, secure, and smart personal loans — tailored to your
              journey, with flexible EMIs and support you can trust.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <div className="flex flex-1 items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-3.5">
                <Phone className="h-4 w-4 text-white/40" />
                <span className="text-sm text-white/50">+91</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter mobile number"
                  className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="whitespace-nowrap rounded-lg bg-gold px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-[#DBB65C]"
              >
                Apply Now
              </button>
            </form>

            <label className="mt-4 flex items-center gap-2 text-xs text-white/50">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="h-3.5 w-3.5 accent-[#C89B3C]"
              />
              I agree to the{" "}
              <a href="#" className="underline underline-offset-2">
                Terms
              </a>{" "}
              and{" "}
              <a href="#" className="underline underline-offset-2">
                Privacy Policy
              </a>
            </label>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-6 text-xs text-white/60">
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-gold" /> Trusted
              </span>
              <span className="flex items-center gap-2">
                <PiggyBank className="h-4 w-4 text-gold" /> Savings
              </span>
              <span className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-gold" /> Growth
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Who we are                                                  */}
      {/* ---------------------------------------------------------- */}
      <section id="about" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-14 md:grid-cols-2 md:items-center">
          <div className="relative">
            <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-[#E4E0D6] bg-white">
              <Globe2 className="h-28 w-28 text-brand/25" strokeWidth={1} />
            </div>
            <div className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-xl border border-[#E4E0D6] bg-white px-5 py-4 shadow-[0_12px_30px_-12px_rgba(23,19,55,0.25)]">
              <ShieldCheck className="h-8 w-8 text-brand" />
              <div className="text-sm">
                <p className="font-semibold text-ink">Finance with Trust</p>
                <p className="text-xs text-muted">RBI-recognized NBFC partner</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-serif text-3xl leading-tight text-ink md:text-4xl">
              Simple, secure &amp; built for growth
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted">
              We&apos;re not just another credit platform. We&apos;re your
              growth partner — helping you save smarter, borrow with
              confidence, and build wealth step by step.
            </p>

            <div className="mt-8 flex flex-wrap gap-8 text-sm">
              <span className="flex items-center gap-2 text-ink/80">
                <ShieldCheck className="h-4 w-4 text-brand" /> Trusted
              </span>
              <span className="flex items-center gap-2 text-ink/80">
                <PiggyBank className="h-4 w-4 text-brand" /> Smart
              </span>
              <span className="flex items-center gap-2 text-ink/80">
                <TrendingUp className="h-4 w-4 text-brand" /> Growth
              </span>
            </div>

            <a
              href="#about"
              className="mt-8 inline-flex items-center gap-2 rounded-lg border border-ink px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-white"
            >
              Explore our story <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Loan options                                                */}
      {/* ---------------------------------------------------------- */}
      <section id="loans" className="border-y border-[#E4E0D6] bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl text-ink md:text-4xl">
              Explore our loan options
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              At Utkarsh Capital, we strictly practice robust, responsible
              lending — from personal needs to big dreams, choose the right
              loan with flexible plans and competitive rates.
            </p>
          </div>

          <div className="mt-12 grid divide-y divide-[#E4E0D6] border-y border-[#E4E0D6] md:grid-cols-2 md:divide-x md:divide-y-0">
            {LOAN_OPTIONS.map((loan, i) => {
              const Icon = loan.icon;
              return (
                <div
                  key={loan.title}
                  className={`group relative flex items-start gap-5 px-2 py-8 md:px-8 ${
                    i >= 2 ? "border-t border-[#E4E0D6] md:border-t" : ""
                  }`}
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand/8 text-brand">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-serif text-lg text-ink">{loan.title}</h3>
                      <span className="whitespace-nowrap rounded-full bg-gold/15 px-3 py-1 text-[11px] font-medium text-[#8A6A1F]">
                        {loan.rate}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {loan.desc}
                    </p>
                    <a
                      href="#contact"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand"
                    >
                      Apply Now
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Why choose us                                               */}
      {/* ---------------------------------------------------------- */}
      <section className="mx-auto max-w-4xl px-6 py-24">
        <div className="text-center">
          <h2 className="font-serif text-3xl text-ink md:text-4xl">Why choose us</h2>
          <span className="mx-auto mt-4 block h-px w-16 bg-gold" />
          <p className="mx-auto mt-5 max-w-md text-sm text-muted">
            Discover how we make financing simple, transparent, and truly
            built around you.
          </p>
        </div>

        <div className="relative mt-16">
          <span className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-[#E4E0D6] md:block" />
          <div className="flex flex-col gap-4">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              const fromRight = i % 2 === 1;
              return (
                <div
                  key={f.title}
                  className={`relative flex md:w-1/2 ${
                    fromRight ? "md:ml-auto md:flex-row-reverse md:text-right" : ""
                  }`}
                >
                  <div
                    className={`flex items-center gap-4 rounded-xl border border-[#E4E0D6] bg-white px-6 py-5 ${
                      fromRight ? "md:mr-8" : "md:ml-8"
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/8 text-brand ${
                        fromRight ? "md:order-2" : ""
                      }`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <div>
                      <h3 className="font-serif text-base text-ink">{f.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {f.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="mt-16 text-center text-sm text-muted">
          Over <span className="font-semibold text-ink">12,000+</span> businesses
          growing with us
        </p>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* EMI calculator                                              */}
      {/* ---------------------------------------------------------- */}
      <section className="bg-ink py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="text-sm text-white/50">Your Monthly EMI</p>
            <p className="mt-2 font-serif text-5xl text-white">
              {formatINR(emi)}
            </p>
          </div>

          <div className="mt-12 grid gap-10 rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:grid-cols-[220px_1fr] md:p-10">
            <div className="mx-auto flex flex-col items-center justify-center">
              <svg viewBox="0 0 180 180" className="h-44 w-44 -rotate-90">
                <circle
                  cx="90"
                  cy="90"
                  r="70"
                  fill="none"
                  stroke="#4F42B0"
                  strokeWidth="16"
                />
                <circle
                  cx="90"
                  cy="90"
                  r="70"
                  fill="none"
                  stroke="#C89B3C"
                  strokeWidth="16"
                  strokeDasharray={`${principalDash} ${circumference}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="mt-4 flex gap-5 text-xs text-white/60">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-gold" /> Principal
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-brand-light" /> Interest
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-lg border border-white/10 px-4 py-3">
                  <p className="text-[11px] text-white/50">Principal</p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    {formatINR(amount)}
                  </p>
                </div>
                <div className="rounded-lg border border-white/10 px-4 py-3">
                  <p className="text-[11px] text-white/50">Interest</p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    {formatINR(interest)}
                  </p>
                </div>
                <div className="rounded-lg border border-gold/30 bg-gold/10 px-4 py-3">
                  <p className="text-[11px] text-white/50">Total Payable</p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    {formatINR(total)}
                  </p>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-3">
                <Slider
                  label="Loan Amount"
                  value={amount}
                  min={50000}
                  max={5000000}
                  step={10000}
                  suffix="₹"
                  onChange={setAmount}
                />
                <Slider
                  label="Tenure"
                  value={tenure}
                  min={3}
                  max={84}
                  step={1}
                  suffix=" Months"
                  onChange={setTenure}
                />
                <Slider
                  label="Interest Rate"
                  value={rate}
                  min={6}
                  max={24}
                  step={0.1}
                  suffix="%"
                  onChange={setRate}
                />
              </div>

              <a
                href="#contact"
                className="mt-2 inline-flex w-fit items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-[#DBB65C]"
              >
                Apply for This Loan
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Rates & charges                                             */}
      {/* ---------------------------------------------------------- */}
      <section className="mx-auto max-w-3xl px-6 py-24">
        <div className="text-center">
          <h2 className="font-serif text-3xl text-ink md:text-4xl">
            Loan interest rates &amp; charges
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted">
            Every fee and policy laid out transparently — because at Utkarsh
            Capital, we believe clarity is the first step to trust.
          </p>
        </div>

        <div className="relative mt-14 pl-10">
          <span className="absolute left-[15px] top-2 h-[calc(100%-1rem)] w-px bg-[#E4E0D6]" />
          <div className="flex flex-col gap-8">
            {CHARGES.map((c, i) => (
              <div key={c.title} className="relative">
                <span className="absolute -left-10 top-0.5 flex h-8 w-8 items-center justify-center rounded-full border border-gold/40 bg-white font-serif text-xs text-[#8A6A1F]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-base text-ink">{c.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-14 rounded-xl bg-brand/5 px-6 py-4 text-center text-xs text-muted">
          Rates &amp; charges are indicative and depend on credit profile and
          lender approval.
        </p>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* FAQ                                                         */}
      {/* ---------------------------------------------------------- */}
      <section id="faq" className="border-y border-[#E4E0D6] bg-white py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center">
            <h2 className="font-serif text-3xl text-ink md:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-sm text-muted">
              Get quick answers to the most common queries about Utkarsh
              Capital loans.
            </p>
          </div>

          <div className="mt-12 border-t border-[#E4E0D6]">
            {FAQS.map((item, i) => (
              <FaqItem
                key={item.q}
                q={item.q}
                a={item.a}
                open={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-muted">
            Can&apos;t find your answer?{" "}
            <a href="#contact" className="font-medium text-brand underline underline-offset-2">
              Contact support
            </a>{" "}
            — we&apos;re here to help.
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Grievance redressal                                         */}
      {/* ---------------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 rounded-2xl border border-[#E4E0D6] bg-white p-8 md:grid-cols-2 md:items-center md:p-12">
          <div>
            <h2 className="font-serif text-2xl text-ink md:text-3xl">
              Grievance redressal
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted">
              At Utkarsh Capital, we strictly adhere to RBI directives and
              have established a robust Grievance Redressal Cell to address
              all concerns promptly. We are committed to responsible lending,
              ensuring that our loan offerings are convenient to repay. Our
              recovery methods are ethical, and we never resort to coercive
              tactics; if you have any complaints, we take them seriously and
              strive to resolve all issues within 5 working days.
            </p>
            <p className="mt-4 text-xs text-muted">
              We are proudly registered as{" "}
              <span className="font-medium text-ink">
                Uni-Corn Fincorp Private Limited
              </span>
              , a Non-Banking Financial Company (NBFC) recognized and
              approved by the Reserve Bank of India (RBI).
            </p>
            <p className="mt-3 inline-block rounded-md bg-gold/10 px-3 py-1.5 text-[11px] text-[#8A6A1F]">
              Our Corporate Identity Number (CIN): U65923GJ2018PTC104572
            </p>
          </div>
          <div className="flex aspect-[4/3] items-center justify-center rounded-xl bg-cream">
            <Handshake className="h-24 w-24 text-brand/25" strokeWidth={1} />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Footer                                                      */}
      {/* ---------------------------------------------------------- */}
      <footer id="contact" className="bg-ink pt-20 text-white/70">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-16 md:grid-cols-[1.3fr_1fr_1fr_1.3fr]">
          <div>
            <a href="#home" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold font-serif text-base text-ink">
                U
              </span>
              <span className="font-serif text-lg text-white">Utkarsh Capital</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Fair, reliable loans from ₹50,000 to ₹50 lakh, tailored to your
              needs and business financial journey.
            </p>
            <div className="mt-6 flex gap-4">
              {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-serif text-sm text-white">Quick Links</h4>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              {["Home", "About", "FAQ", "Contact", "Apply Now"].map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-white">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm text-white">Legal</h4>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              {["Refund Policy", "Terms & Conditions", "Privacy Policy"].map(
                (l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-white">
                      {l}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm text-white">Contact Us</h4>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gold" /> info@utkarshcapital.com
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-gold" />
                4th street, Colva, Goa, 403708
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 py-6">
          <p className="text-center text-xs text-white/40">
            © {new Date().getFullYear()} Utkarsh Capital. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
