# Supabase Setup — Apply Now / Apply Flow

This project now has two new pages:

- **`/apply-now`** — visitor enters their mobile number. This creates a row
  in Supabase immediately (a "lead") and redirects to `/apply`.
- **`/apply`** — a 5-step wizard (Personal → Employment → Loan Details →
  Address → Review & Submit). Progress is saved to Supabase after every
  step, so even an incomplete application is captured, not just the final
  submission.

## 1. Create a Supabase project

Go to https://supabase.com, create a project, and open **SQL Editor**.

## 2. Create the table

Run this SQL:

```sql
create table if not exists loan_applications (
  id uuid primary key default gen_random_uuid(),

  -- captured at "Apply Now"
  mobile_number text not null,

  -- Step 1: Personal
  full_name text,
  email text,
  dob date,
  pan_number text,

  -- Step 2: Employment
  employment_type text,
  company_name text,
  monthly_income numeric,

  -- Step 3: Loan details
  loan_type text,
  loan_amount numeric,
  tenure_months integer,
  loan_purpose text,

  -- Step 4: Address
  address text,
  city text,
  state text,
  pincode text,

  -- tracking
  status text not null default 'new',        -- new | in_progress | submitted
  current_step integer not null default 1,   -- 1-5
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable Row Level Security
alter table loan_applications enable row level security;

-- Allow anyone (anon key) to insert a new lead from the public form
create policy "Allow public inserts"
  on loan_applications
  for insert
  to anon
  with check (true);

-- Allow anyone (anon key) to update their own row while filling the wizard
-- (the app only ever updates by the specific id it received on insert)
create policy "Allow public updates"
  on loan_applications
  for update
  to anon
  using (true)
  with check (true);
```

> These policies are intentionally permissive so the public-facing form can
> write without a login. Nobody can *read* the data with the anon key
> because no `select` policy is created — only your Supabase dashboard
> (service role) or an authenticated admin panel can read applications.
> If you later build an admin dashboard, add a `select` policy scoped to
> authenticated staff accounts.

## 3. Get your API credentials

In your Supabase project: **Settings → API**

- `Project URL` → goes in `NEXT_PUBLIC_SUPABASE_URL`
- `anon` `public` key → goes in `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 4. Configure the app

```bash
cp .env.local.example .env.local
```

Fill in the two values, then install the new dependency and run:

```bash
npm install
npm run dev
```

## 5. Try it

Visit `/apply-now`, enter a mobile number, and step through the wizard at
`/apply`. Check the **Table Editor → loan_applications** in Supabase — you
should see a new row the moment the mobile number is submitted, and it
should fill in further as each step is completed, ending with
`status = submitted`.

## How the flow works

1. `/apply-now` inserts `{ mobile_number, status: "new" }` and gets back an
   `id`. That `id` is stored in `sessionStorage` (`uc_application_id`).
2. `/apply` reads that id on load. If it's missing (e.g. someone visits
   `/apply` directly), it redirects back to `/apply-now`.
3. Each "Next" click validates the current step, then runs a Supabase
   `update` on that row with everything collected so far and bumps
   `current_step` / `status: "in_progress"`.
4. On the final step, "Submit Application" sets `status: "submitted"`,
   clears the session, and shows a confirmation screen.

## Notes / things you may want to customize

- Validation is basic (email format, 10-digit PAN pattern, 6-digit
  pincode, 10-digit mobile number). Adjust in `app/apply/page.tsx` /
  `app/apply-now/page.tsx` as needed.
- No file/document upload is included yet. If you want ID/income proof
  uploads, we'd add a step using **Supabase Storage** — let me know and
  I'll wire that in.
- No OTP verification is included — the mobile number is saved as
  entered. If you want OTP verification before creating the lead, that's
  a separate integration (e.g. Supabase Auth phone OTP, or an SMS
  provider like MSG91/Twilio).
