export type ApplicationData = {
  // Step 1 — Personal details
  full_name: string;
  email: string;
  dob: string;
  pan_number: string;

  // Step 2 — Employment details
  employment_type: string;
  company_name: string;
  monthly_income: string;

  // Step 3 — Loan details
  loan_type: string;
  loan_amount: string;
  tenure_months: string;
  loan_purpose: string;

  // Step 4 — Address details
  address: string;
  city: string;
  state: string;
  pincode: string;
};

export const EMPTY_APPLICATION: ApplicationData = {
  full_name: "",
  email: "",
  dob: "",
  pan_number: "",
  employment_type: "",
  company_name: "",
  monthly_income: "",
  loan_type: "",
  loan_amount: "",
  tenure_months: "",
  loan_purpose: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
};
