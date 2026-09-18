"use client";

import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  User,
  FileText,
  Home,
  CircleDollarSign,
  Landmark,
  ArrowRight,
  ArrowLeft,
  Check,
  ShieldCheck,
  Clock,
  Sliders,
  CheckCircle2,
} from "lucide-react";

// Initialize Supabase Client (Ensure these variables exist in your .env.local file)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define form structure types
interface FormData {
  id?: string;
  mobile: string;
  // Step 1: Personal Info
  fullName: string;
  email: string;
  // Step 2: Documents
  aadharNumber: string;
  panNumber: string;
  // Step 3: Address
  address: string;
  pinCode: string;
  state: string;
  city: string;
  // Step 4: Loan Details
  loanAmount: string;
  loanPurpose: string;
  loanTenure: string;
  emi: string;
  interestRate: string;
  // Step 5: Bank Details
  accountHolderName: string;
  ifscCode: string;
  accountNumber: string;
  accountType: string;
  bankName: string;
  branch: string;
}

export default function ApplyPage() {
  const [currentStep, setCurrentStep] = useState<number>(0); // 0 = Mobile Step, 1-5 = Form Steps
  const [loading, setLoading] = useState<boolean>(false);
  const [agreed, setAgreed] = useState<boolean>(true);
  const [applicationId, setApplicationId] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    mobile: "",
    fullName: "",
    email: "",
    aadharNumber: "",
    panNumber: "",
    address: "",
    pinCode: "",
    state: "",
    city: "",
    loanAmount: "80000",
    loanPurpose: "Personal Loan",
    loanTenure: "24 months",
    emi: "3654.78",
    interestRate: "7714.71",
    accountHolderName: "",
    ifscCode: "",
    accountNumber: "",
    accountType: "Savings",
    bankName: "",
    branch: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Step 0: Save mobile number to Supabase first and obtain application ID
  const handleMobileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.mobile || formData.mobile.length < 10) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("loan_applications")
        .insert([{ mobile: formData.mobile, current_step: 1 }])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setApplicationId(data.id);
        setCurrentStep(1);
      }
    } catch (err: any) {
      console.error("Error saving mobile number:", err.message);
      // Fallback transition for frontend display/testing if Supabase isn't connected yet
      setCurrentStep(1);
    } finally {
      setLoading(false);
    }
  };

  // Steps 1 to 5: Update record dynamically on step change
  const handleStepSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (applicationId) {
        await supabase
          .from("loan_applications")
          .update({
            ...formData,
            current_step: currentStep + 1,
          })
          .eq("id", applicationId);
      }

      if (currentStep < 5) {
        setCurrentStep((prev) => prev + 1);
      } else {
        alert("Application submitted successfully!");
      }
    } catch (err: any) {
      console.error("Error updating application:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const stepsList = [
    { id: 1, label: "Personal Info", icon: User },
    { id: 2, label: "Document", icon: FileText },
    { id: 3, label: "Address", icon: Home },
    { id: 4, label: "Loan", icon: CircleDollarSign },
    { id: 5, label: "Bank", icon: Landmark },
  ];

  return (
    <div className="min-h-screen bg-[#f4f6fb] font-sans text-slate-800 flex flex-col">
      {/* Top Header */}
      <header className="w-full bg-white border-b border-slate-200 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center center text-white font-bold text-lg justify-center">
            U
          </div>
          <span className="font-bold text-lg text-slate-900 tracking-tight">
            Utkarsh Capital
          </span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
          <a href="#" className="hover:text-indigo-600 transition">HOME</a>
          <a href="#" className="hover:text-indigo-600 transition">ABOUT</a>
          <a href="#" className="hover:text-indigo-600 transition">LOANS</a>
          <a href="#" className="hover:text-indigo-600 transition">FAQ</a>
          <a href="#" className="hover:text-indigo-600 transition">CONTACT</a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="text-xs md:text-sm font-semibold text-slate-700 hover:text-indigo-600">
            Check Status
          </button>
          <button className="bg-indigo-600 text-white px-5 py-2 rounded-full text-xs md:text-sm font-semibold shadow-md hover:bg-indigo-700 transition">
            Apply Now
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl w-full mx-auto px-4 py-8 flex-grow">
        {/* Banner Headers */}
        {currentStep === 0 ? (
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              START AN APPLICATION
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-1">
              Find a loan that fits your plans.
            </h1>
            <p className="text-slate-500 text-sm mt-2 max-w-lg mx-auto">
              Share your mobile number to begin. This first step only helps us set
              up your application — it is not a loan approval.
            </p>
          </div>
        ) : (
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              LOAN APPLICATION
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-1">
              Let's get this one clear step at a time.
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Save your progress as you go. Keep your identity, income and bank
              details ready before you begin.
            </p>
          </div>
        )}

        {/* STEP 0: Mobile Number Entry View */}
        {currentStep === 0 && (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 grid grid-cols-1 md:grid-cols-12 mb-12">
            {/* Left Info Panel */}
            <div className="md:col-span-6 bg-[#1a234d] text-white p-8 md:p-10 flex flex-col justify-between">
              <div>
                <span className="text-xs text-indigo-300 font-semibold uppercase tracking-wider">
                  START AN APPLICATION
                </span>
                <h2 className="text-2xl md:text-3xl font-bold mt-2">
                  Find a loan that fits your plans.
                </h2>
                <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                  Share your mobile number to begin. This first step only helps us
                  set up your application — it is not a loan approval.
                </p>
              </div>

              <div className="space-y-4 my-8">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-700/60 text-indigo-300 text-xs flex items-center justify-center font-bold">
                    01
                  </span>
                  <span className="text-xs text-slate-200">
                    Takes about a minute to begin
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-700/60 text-indigo-300 text-xs flex items-center justify-center font-bold">
                    02
                  </span>
                  <span className="text-xs text-slate-200">
                    Review your details before submitting
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-700/60 text-indigo-300 text-xs flex items-center justify-center font-bold">
                    03
                  </span>
                  <span className="text-xs text-slate-200">
                    Your application is handled securely
                  </span>
                </div>
              </div>
            </div>

            {/* Right Mobile Form */}
            <div className="md:col-span-6 p-8 md:p-10 flex flex-col justify-center">
              <span className="text-xs font-bold text-indigo-600 uppercase">
                Step 1 of 2
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                Your mobile number
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                We will use it to continue your application and keep you updated.
              </p>

              <form onSubmit={handleMobileSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Mobile number
                  </label>
                  <div className="flex rounded-xl border border-slate-200 overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                    <span className="bg-slate-50 px-3 py-3 text-xs text-slate-500 font-medium border-r border-slate-200 flex items-center">
                      +91
                    </span>
                    <input
                      type="tel"
                      name="mobile"
                      required
                      maxLength={10}
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="10-digit number"
                      className="w-full px-3 py-3 text-xs outline-none text-slate-800 font-medium"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="terms" className="text-[11px] text-slate-500">
                    I agree to the{" "}
                    <a href="#" className="underline text-indigo-600">
                      Terms
                    </a>{" "}
                    and{" "}
                    <a href="#" className="underline text-indigo-600">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading || !agreed}
                  className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-full text-xs flex items-center justify-center gap-2 hover:bg-indigo-700 transition disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Continue"} <ArrowRight size={14} />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* STEPS 1 TO 5: Multi-Step Application Flow */}
        {currentStep > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-4 space-y-3">
              {stepsList.map((step) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;

                return (
                  <div
                    key={step.id}
                    className={`flex items-center gap-4 p-4 rounded-2xl transition ${
                      isActive
                        ? "bg-[#1a234d] text-white shadow-md"
                        : "bg-indigo-50/50 text-slate-600 hover:bg-indigo-50"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isActive
                          ? "bg-indigo-600 text-white"
                          : isCompleted
                          ? "bg-indigo-200 text-indigo-800"
                          : "bg-indigo-100 text-indigo-500"
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    <div>
                      <div
                        className={`text-[10px] font-bold uppercase tracking-wider ${
                          isActive ? "text-indigo-300" : "text-slate-400"
                        }`}
                      >
                        STEP {step.id}
                      </div>
                      <div className="font-semibold text-sm">{step.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Step Form Wrapper */}
            <div className="lg:col-span-8 bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden flex flex-col justify-between">
              {/* Top Banner Notice */}
              <div className="bg-[#1a234d] text-white px-6 py-3 text-xs flex items-center gap-2">
                <span className="text-slate-300">
                  Your information is used only to process this loan application.
                </span>
              </div>

              <form onSubmit={handleStepSubmit} className="p-6 md:p-8 flex-grow flex flex-col justify-between">
                <div>
                  {/* Step 1: Personal Info */}
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            required
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Document */}
                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Aadhar Number
                          </label>
                          <input
                            type="text"
                            name="aadharNumber"
                            required
                            value={formData.aadharNumber}
                            onChange={handleChange}
                            placeholder="Aadhar Number"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            PAN Number
                          </label>
                          <input
                            type="text"
                            name="panNumber"
                            required
                            value={formData.panNumber}
                            onChange={handleChange}
                            placeholder="PAN Number"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Address */}
                  {currentStep === 3 && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">
                          Permanent Address
                        </h4>
                        <p className="text-[11px] text-slate-500 mb-3">
                          Please enter the permanent address same as Aadhar card
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Address
                          </label>
                          <input
                            type="text"
                            name="address"
                            required
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter your permanent address"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            PIN Code
                          </label>
                          <input
                            type="text"
                            name="pinCode"
                            required
                            value={formData.pinCode}
                            onChange={handleChange}
                            placeholder="PIN Code"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            State
                          </label>
                          <input
                            type="text"
                            name="state"
                            required
                            value={formData.state}
                            onChange={handleChange}
                            placeholder="State"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            City
                          </label>
                          <input
                            type="text"
                            name="city"
                            required
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="City"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Loan */}
                  {currentStep === 4 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Loan Amount
                          </label>
                          <input
                            type="text"
                            name="loanAmount"
                            value={formData.loanAmount}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Loan Purpose
                          </label>
                          <select
                            name="loanPurpose"
                            value={formData.loanPurpose}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                          >
                            <option value="Personal Loan">Personal Loan</option>
                            <option value="Business Loan">Business Loan</option>
                            <option value="Home Loan">Home Loan</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Loan Tenure (in months)
                          </label>
                          <select
                            name="loanTenure"
                            value={formData.loanTenure}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                          >
                            <option value="12 months">12 months</option>
                            <option value="24 months">24 months</option>
                            <option value="36 months">36 months</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            EMI
                          </label>
                          <input
                            type="text"
                            name="emi"
                            readOnly
                            value={formData.emi}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Interest Rate (9%)
                          </label>
                          <input
                            type="text"
                            name="interestRate"
                            readOnly
                            value={formData.interestRate}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 5: Bank */}
                  {currentStep === 5 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Account Holder Name
                          </label>
                          <input
                            type="text"
                            name="accountHolderName"
                            required
                            value={formData.accountHolderName}
                            onChange={handleChange}
                            placeholder="Account Holder Name"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            IFSC Code
                          </label>
                          <input
                            type="text"
                            name="ifscCode"
                            required
                            value={formData.ifscCode}
                            onChange={handleChange}
                            placeholder="IFSC Code"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Account Number
                          </label>
                          <input
                            type="text"
                            name="accountNumber"
                            required
                            value={formData.accountNumber}
                            onChange={handleChange}
                            placeholder="Account Number"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Account Type
                          </label>
                          <select
                            name="accountType"
                            value={formData.accountType}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                          >
                            <option value="Savings">Savings</option>
                            <option value="Current">Current</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Bank Name
                          </label>
                          <input
                            type="text"
                            name="bankName"
                            required
                            value={formData.bankName}
                            onChange={handleChange}
                            placeholder="Bank Name"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Branch
                          </label>
                          <input
                            type="text"
                            name="branch"
                            required
                            value={formData.branch}
                            onChange={handleChange}
                            placeholder="Branch Name"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Navigation Buttons */}
                <div className="pt-8 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                    className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 transition"
                  >
                    <ArrowLeft size={14} /> Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-indigo-600 text-white font-semibold px-6 py-2.5 rounded-full text-xs flex items-center gap-2 hover:bg-indigo-700 transition"
                  >
                    {loading
                      ? "Processing..."
                      : currentStep === 5
                      ? "Submit"
                      : "Continue"}{" "}
                    <ArrowRight size={14} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Bottom Feature Badges (Mobile View Step Only) */}
        {currentStep === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check size={14} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">No cost to check</h4>
                <p className="text-[11px] text-slate-500">
                  Starting an application does not create a loan.
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check size={14} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">Clear next steps</h4>
                <p className="text-[11px] text-slate-500">
                  We explain what information is needed at each stage.
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check size={14} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">You stay in control</h4>
                <p className="text-[11px] text-slate-500">
                  Review the offer and lender terms before accepting.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer Section: Disclosure & Information */}
        <section className="mt-8 space-y-6">
          <h2 className="text-xl font-bold text-slate-900">
            Disclosure & Information.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-800 mb-2">
                <Clock size={14} className="text-indigo-600" /> Rates & Charges
              </div>
              <ul className="space-y-1 text-slate-600 list-disc list-inside text-[11px]">
                <li>Loan: ₹50,000 – ₹5,00,000</li>
                <li>Tenure: 6–60 months</li>
                <li>Processing Fee: 2–5%</li>
                <li>No Pre-closure/Prepayment Charges</li>
                <li>ROI: 1.16% Monthly</li>
                <li>APR: 16% to 30%</li>
                <li>Cheque Bounce: ₹1,000</li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-100 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-800 mb-2">
                <Sliders size={14} className="text-indigo-600" /> How is APR Determined?
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Based on credit score, income, and loan amount. Fixed APR range:
                16% to 30%.
              </p>
            </div>
          </div>

          {/* Eligibility Criteria */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 text-xs">
            <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
              <ShieldCheck size={14} className="text-indigo-600" /> Documents Required & Eligibility Criteria
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] text-slate-600">
              <div>
                <span className="font-semibold text-slate-800 block mb-1">
                  Eligibility Criteria
                </span>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Filled Loan Application</li>
                  <li>ID Proof (PAN, Aadhaar, etc.)</li>
                  <li>Residence Proof</li>
                  <li>6 months Bank Statements</li>
                  <li>3 months Salary Slips</li>
                  <li>6+ months in current job</li>
                </ul>
              </div>
              <div>
                <span className="font-semibold text-slate-800 block mb-1">
                  Documents Required
                </span>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Indian Citizen</li>
                  <li>Salaried Employee</li>
                  <li>Min Age: 18</li>
                  <li>Savings Account</li>
                  <li>CIBIL Score 550+</li>
                  <li>Monthly Income ₹13,500+</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1a234d] text-white py-10 px-6 md:px-12 mt-12 text-xs">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center font-bold text-white text-xs">
                U
              </div>
              <span className="font-bold text-sm">Utkarsh Capital</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Fast, reliable loans from ₹55,000 to ₹40 lakh. We're here to simplify
              your personal and business financial journey.
            </p>
          </div>
          <div>
            <h5 className="font-bold mb-3 text-slate-200">Quick Links</h5>
            <ul className="space-y-1.5 text-slate-400 text-[11px]">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">About</a></li>
              <li><a href="#" className="hover:underline">FAQ</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
              <li><a href="#" className="hover:underline">Apply Now</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-3 text-slate-200">Contact Us</h5>
            <p className="text-slate-400 text-[11px]">Email: info@utkarshcapital.com</p>
            <p className="text-slate-400 text-[11px] mt-1">
              Address: 4th ward, Colva, South Goa, Goa, 403708
            </p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto border-t border-slate-700/60 mt-8 pt-6 flex flex-col md:flex-row justify-between text-[10px] text-slate-400">
          <div>
            <a href="#" className="hover:underline mr-4">Refund Policy</a>
            <a href="#" className="hover:underline mr-4">Privacy Policy</a>
            <a href="#" className="hover:underline mr-4">Terms of Use</a>
            <a href="#" className="hover:underline">Terms & Conditions</a>
          </div>
          <div className="mt-2 md:mt-0">
            © 2026 UtkarshCapital. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
