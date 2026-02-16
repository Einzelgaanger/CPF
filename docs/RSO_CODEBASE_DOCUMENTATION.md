# RSO Platform — Complete Codebase Documentation

> **Purpose:** This document describes the full architecture, features, database schema, and implementation details of the Receivables Securitisation Origination (RSO) platform. It is intended to be read by another AI or developer to understand what exists and what to replicate or extend.

---

## 1. PLATFORM OVERVIEW

**Name:** Receivables Securitisation Origination (RSO) — "Malipo Polepole ya Pending Bills"

**What it does:** A multi-role securitization platform that allows Kenyan government suppliers to submit unpaid invoices (pending bills), which are then purchased by Special Purpose Vehicles (SPVs), approved by MDAs (Ministries/Departments/Agencies), and certified by the National Treasury. The platform includes blockchain-backed deed management and a financial Backend Engine for waterfall distributions.

**Stack:** React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui + Supabase (PostgreSQL + Auth + Edge Functions + Storage)

---

## 2. ROLE-BASED ARCHITECTURE

The platform has **5 roles**, each with a dedicated portal:

| Role | Route Prefix | Purpose |
|------|-------------|---------|
| **Supplier** | `/supplier/*` | Submit invoices, view receivables, accept/reject SPV offers |
| **SPV** | `/spv/*` | Browse available bills, make purchase offers, manage blockchain deeds, run Backend Engine |
| **MDA** | `/mda/*` | Review SPV financial offers, approve/reject, set payment terms, sign Letter of Authorization |
| **Treasury** | `/treasury/*` | Final certification, sign tripartite deed, issue certificates, Backend Engine oversight |
| **Admin** | `/admin/*` | System-wide oversight, user management, analytics, workflow monitor |

### Authentication Flow
- Single login page at `/auth` with Sign In / Create Account tabs
- After login, user is redirected to `/{role}` based on their `user_roles` table entry
- `ProtectedRoute` component checks role and redirects unauthorized users
- Supabase Auth with email/password (auto-confirm enabled for demo)

### Layout Structure
- **PortalLayout** (`src/components/layout/PortalLayout.tsx`): Used by Supplier, SPV, MDA, Treasury portals. Has a dark sidebar with gold accent branding, collapsible, role-specific nav items, user dropdown with avatar.
- **AppLayout** (`src/components/layout/AppLayout.tsx`): Used by Admin portal. Similar dark sidebar but separate component.

---

## 3. COMPLETE ROUTE MAP

```
/auth                         → AuthPage (login/signup)
/conceptnote                  → ConceptNotePage

/supplier                     → SupplierDashboard
/supplier/submit-bill         → SubmitBillPage (full invoice form with file upload)
/supplier/my-bills            → MyBillsPage (receivables list, accept/reject offers)
/supplier/profile             → SupplierProfilePage

/spv                          → SPVDashboard
/spv/bills                    → SPVBillsPage (browse & make offers on available bills)
/spv/offers                   → SPVOffersPage (track submitted offers)
/spv/blockchain               → SPVBlockchainPage (deeds of assignment + receivable notes)
/spv/backend-engine           → SPVBackendEnginePage (waterfall calc, trust accounts, settlement, reconciliation)
/spv/profile                  → SPVProfilePage

/mda                          → MDADashboard
/mda/bills                    → MDABillsPage (financial offers — approve/reject SPV terms)
/mda/payables                 → MDAPayablesPage (payables registry)
/mda/approved                 → MDAApprovedPage
/mda/profile                  → MDAProfilePage

/treasury                     → TreasuryDashboard
/treasury/pending             → TreasuryPendingPage (certify bills, sign deeds, issue certificates)
/treasury/certified           → TreasuryCertifiedPage
/treasury/backend-engine      → TreasuryBackendEnginePage (read-only oversight of trust accounts/distributions)
/treasury/profile             → TreasuryProfilePage

/admin                        → AdminDashboard
/admin/bills                  → AdminBillsPage
/admin/workflow               → WorkflowPage
/admin/suppliers              → AdminUsersPage
/admin/mdas                   → AdminUsersPage
/admin/analytics              → AnalyticsPage
/admin/payment-schedule       → PaymentSchedulePage
```

---

## 4. DATABASE SCHEMA

### Tables

#### `user_roles`
```sql
id          uuid PK
user_id     uuid (references auth.users)
role        app_role ENUM ('supplier', 'spv', 'mda', 'treasury', 'admin')
created_at  timestamptz
```

#### `profiles`
```sql
id                  uuid PK
user_id             uuid UNIQUE
email               text NOT NULL
full_name           text
phone               text
avatar_url          text
company_name        text         -- Supplier
registration_number text         -- Supplier
tax_id              text         -- Supplier
address             text
bank_name           text         -- Supplier
bank_account        text         -- Supplier
mda_name            text         -- MDA
mda_code            text         -- MDA (links to mdas.id for RLS)
department          text         -- MDA
spv_name            text         -- SPV
license_number      text         -- SPV
treasury_office     text         -- Treasury
employee_id         text         -- Treasury
profile_completed   boolean
created_at          timestamptz
updated_at          timestamptz
```

#### `mdas`
```sql
id              uuid PK
name            text NOT NULL
code            text NOT NULL (e.g., "MOW", "MOH")
department      text
contact_email   text
contact_phone   text
address         text
created_at      timestamptz
```

#### `bills`
The central entity tracking the full securitization lifecycle:
```sql
id                      uuid PK
supplier_id             uuid NOT NULL (auth.users.id)
mda_id                  uuid NOT NULL (references mdas)
invoice_number          text NOT NULL
invoice_date            date NOT NULL
due_date                date
amount                  numeric NOT NULL
currency                text DEFAULT 'KES'
description             text
contract_reference      text
work_description        text
work_start_date         date
work_end_date           date
delivery_date           date
invoice_document_url    text
supporting_documents    jsonb DEFAULT '[]'
status                  bill_status ENUM (see below)
status_history          jsonb DEFAULT '[]'
spv_id                  uuid (set when SPV makes offer)
offer_amount            numeric
offer_discount_rate     numeric
offer_date              timestamptz
offer_accepted_date     timestamptz
last_rejected_by_supplier boolean DEFAULT false
last_rejection_date     timestamptz
rejection_reason        text
mda_approved_by         uuid
mda_approved_date       timestamptz
mda_notes               text
payment_terms           jsonb
payment_quarters        integer
payment_start_quarter   text
agreement_date          timestamptz
agreement_document_url  text
treasury_certified_by   uuid
treasury_certified_date timestamptz
certificate_number      text
certificate_document_url text
created_at              timestamptz
updated_at              timestamptz
```

**Bill Status Enum (`bill_status`):**
```
submitted → under_review → offer_made → offer_accepted → mda_reviewing → mda_approved → terms_set → agreement_sent → treasury_reviewing → certified → rejected
```

#### `blockchain_deeds`
Tripartite Deed of Assignment with 3-party signatures:
```sql
id                              uuid PK
bill_id                         uuid (references bills)
deed_hash                       text NOT NULL
network                         text DEFAULT 'sepolia'
status                          text DEFAULT 'pending_assignor'
  -- Status flow: pending_assignor → pending_procuring_entity → pending_servicing_agent → fully_executed
assignor_id                     uuid NOT NULL (Supplier)
assignor_signature              text
assignor_signed_at              timestamptz
assignor_wallet_address         text
procuring_entity_id             uuid NOT NULL (MDA)
procuring_entity_signature      text
procuring_entity_signed_at      timestamptz
procuring_entity_wallet_address text
servicing_agent_id              uuid (Treasury/SPV)
servicing_agent_signature       text
servicing_agent_signed_at       timestamptz
servicing_agent_wallet_address  text
principal_amount                numeric NOT NULL
discount_rate                   numeric
purchase_price                  numeric
blockchain_tx_hash              text
block_number                    bigint
gas_used                        numeric
contract_address                text
document_content                jsonb
executed_at                     timestamptz
created_at                      timestamptz
updated_at                      timestamptz
```

#### `receivable_notes`
NFT-backed receivable notes generated from fully executed deeds:
```sql
id                      uuid PK
deed_id                 uuid (references blockchain_deeds)
bill_id                 uuid (references bills)
note_number             text NOT NULL
face_value              numeric NOT NULL
issue_date              date DEFAULT CURRENT_DATE
maturity_date           date
issuer_id               uuid NOT NULL
status                  text DEFAULT 'draft' -- draft → issued → minted
token_id                text
token_contract_address  text
mint_tx_hash            text
issuer_wallet_address   text
token_uri               text
network                 text DEFAULT 'sepolia'
metadata                jsonb
created_at              timestamptz
updated_at              timestamptz
```

#### `trust_accounts`
Segregated accounts managed by SPV:
```sql
id              uuid PK
spv_id          uuid NOT NULL
account_type    text NOT NULL ('custody' | 'settlement' | 'collection' | 'distribution')
account_name    text NOT NULL
bank_name       text
account_number  text
balance         numeric DEFAULT 0
currency        text DEFAULT 'KES'
status          text DEFAULT 'active' ('active' | 'frozen' | 'closed')
created_at      timestamptz
updated_at      timestamptz
```

#### `waterfall_distributions`
6-tier payment priority tracking:
```sql
id                      uuid PK
bill_id                 uuid
deed_id                 uuid
trust_account_id        uuid
obligor_payment_amount  numeric NOT NULL
obligor_payment_date    timestamptz
taxes_amount            numeric DEFAULT 0
trustee_fees_amount     numeric DEFAULT 0
admin_fees_amount       numeric DEFAULT 0
interest_amount         numeric DEFAULT 0
principal_amount        numeric DEFAULT 0
residual_amount         numeric DEFAULT 0
tax_rate                numeric DEFAULT 0
trustee_fee_rate        numeric DEFAULT 0
admin_fee_rate          numeric DEFAULT 0
interest_rate           numeric DEFAULT 0
status                  text DEFAULT 'pending' ('pending' | 'obligor_paid' | 'distributing' | 'distributed' | 'reconciled')
distributed_at          timestamptz
reconciled_at           timestamptz
reconciled_by           uuid
notes                   text
created_at              timestamptz
updated_at              timestamptz
```

#### `settlement_transactions`
Cash movements with dual authorization:
```sql
id                      uuid PK
waterfall_id            uuid
bill_id                 uuid
from_account_id         uuid (references trust_accounts)
to_account_id           uuid (references trust_accounts)
amount                  numeric NOT NULL
transaction_type        text NOT NULL
  -- Types: 'obligor_payment', 'tax_deduction', 'trustee_fee', 'admin_fee',
  --        'interest_payment', 'principal_repayment', 'residual_distribution', 'supplier_payment'
currency                text DEFAULT 'KES'
status                  text DEFAULT 'pending' ('pending' | 'authorized' | 'settled')
reference_number        text
authorized_by           uuid
authorized_at           timestamptz
second_authorized_by    uuid
second_authorized_at    timestamptz
settled_at              timestamptz
notes                   text
created_at              timestamptz
updated_at              timestamptz
```

#### `reconciliation_records`
Audit logs for balance verification:
```sql
id                  uuid PK
waterfall_id        uuid
trust_account_id    uuid
period_start        date NOT NULL
period_end          date NOT NULL
expected_balance    numeric NOT NULL
actual_balance      numeric NOT NULL
variance            numeric
variance_explained  boolean DEFAULT false
variance_notes      text
status              text DEFAULT 'pending' ('pending' | 'matched' | 'discrepancy' | 'reconciled')
performed_by        uuid
reviewed_by         uuid
reviewed_at         timestamptz
created_at          timestamptz
updated_at          timestamptz
```

#### `notifications`
```sql
id          uuid PK
user_id     uuid NOT NULL
title       text NOT NULL
message     text NOT NULL
type        text DEFAULT 'info' ('info' | 'success' | 'warning' | 'error')
bill_id     uuid
read        boolean DEFAULT false
created_at  timestamptz
```

#### `activity_logs`
```sql
id          uuid PK
action      text NOT NULL
user_id     uuid
bill_id     uuid
details     jsonb
created_at  timestamptz
```

### Database Functions
```sql
-- Check if user has a specific role (SECURITY DEFINER to bypass RLS)
has_role(uuid, app_role) → boolean

-- Get user's role
get_user_role(uuid) → app_role

-- Auto-create profile on signup
handle_new_user() → trigger on auth.users INSERT

-- Auto-update updated_at
update_updated_at_column() → trigger
```

### Storage Buckets
- `invoices` (private) — Supplier-uploaded invoice documents

---

## 5. RLS POLICY SUMMARY

| Table | Supplier | SPV | MDA | Treasury | Admin |
|-------|----------|-----|-----|----------|-------|
| bills | Own SELECT/INSERT/UPDATE | All SELECT, UPDATE | Own MDA SELECT/UPDATE | All SELECT/UPDATE | ALL |
| profiles | Own CRUD, view MDA | View supplier/MDA | Own CRUD, view supplier | View all | View all |
| user_roles | Own SELECT | — | — | — | All SELECT |
| blockchain_deeds | Own SELECT, sign | ALL | SELECT, sign | SELECT, sign | ALL |
| receivable_notes | — | ALL | — | SELECT | ALL |
| trust_accounts | — | Own ALL | — | SELECT | ALL |
| waterfall_distributions | — | ALL | — | SELECT | ALL |
| settlement_transactions | — | ALL | — | SELECT | ALL |
| reconciliation_records | — | ALL | — | SELECT | ALL |
| notifications | Own SELECT/UPDATE | INSERT (with bill) | INSERT (with bill) | INSERT | ALL |
| activity_logs | SELECT (own bills) | SELECT (own bills) | SELECT | SELECT | SELECT |
| mdas | SELECT (all) | SELECT (all) | SELECT (all) | SELECT (all) | SELECT (all) |

---

## 6. SECURITIZATION LIFECYCLE (End-to-End Flow)

```
Step 1: SUPPLIER submits bill
  → Picks MDA, enters invoice details, uploads documents
  → Bill status: "submitted"
  → Notifies all SPV users

Step 2: SPV browses available bills and makes offer
  → Sets offer_amount and discount_rate
  → Bill status: "offer_made"
  → Notifies supplier

Step 3: SUPPLIER accepts or rejects offer
  → If accepted: Bill status → "offer_accepted"
  → Notifies SPV and MDA

Step 4: MDA reviews financial terms
  → Reviews SPV's proposed payment terms (quarters, start quarter, coupon rates)
  → Can approve or reject (send back to SPV for revision)
  → Sets payment_quarters, payment_start_quarter
  → Signs Letter of Authorization
  → Bill status → "mda_approved"
  → Notifies supplier, SPV, and Treasury

Step 5: TREASURY certifies
  → Reviews all party terms
  → Can amend terms
  → Issues certificate_number (e.g., "CERT-2026-00123")
  → Signs tripartite deed
  → Creates blockchain_deed record
  → Bill status → "certified"
  → Notifies all parties

Step 6: SPV manages post-certification
  → Views blockchain deeds on SPVBlockchainPage
  → Generates Receivable Notes from fully executed deeds
  → Can mint notes as NFTs
  → Manages trust accounts and waterfall distributions via Backend Engine
```

---

## 7. BACKEND ENGINE (Key Feature)

### SPV Backend Engine (`/spv/backend-engine`)

**5 Institutional Architecture Layers** (displayed as cards at top):
1. Trust / SPV Layer — Bankruptcy-remote structure
2. Legal Counsel — Assignment & enforceability
3. Independent Trustee — Covenant monitoring
4. Custody & Settlement — Segregated accounts
5. Administration — Reconciliation & reporting

**5 Tabs:**

1. **Waterfall Calculator** — Client-side interactive calculator
   - Inputs: Obligor Payment Amount, Tax Rate %, Trustee Fee Rate %, Admin Fee Rate %, Interest Rate %
   - Output: 6-tier waterfall breakdown with visual bar
   - Calculation logic:
     ```
     taxes = amount × (taxRate / 100)
     trusteeFees = amount × (trusteeFeeRate / 100)
     adminFees = amount × (adminFeeRate / 100)
     interest = amount × (interestRate / 100)
     principal = max(0, amount - taxes - trusteeFees - adminFees - interest)
     residual = 0
     ```
   - Priority order: Taxes → Trustee Fees → Admin Fees → Interest → Principal → Residual

2. **Trust Accounts** — CRUD for segregated custody accounts
   - Create: custody, settlement, collection, distribution types
   - Cards showing: account_name, bank_name, balance, status, type

3. **Distributions** — Table of waterfall_distributions records
   - Columns: Date, Obligor Payment, Interest, Principal, Fees, Status

4. **Settlement** — Table of settlement_transactions
   - Columns: Date, Type (with human-readable labels), Amount, Status, Reference

5. **Reconciliation** — Table of reconciliation_records
   - Columns: Period, Expected, Actual, Variance (red if non-zero), Status

### Treasury Backend Engine Oversight (`/treasury/backend-engine`)
- **Read-only** version of the SPV Backend Engine
- Summary stats at top: Trust Accounts count, Total Balance, Total Distributed, Pending Distributions
- Same 5 institutional layer cards (with green/emerald theme instead of amber)
- Same 4 data tabs (no Waterfall Calculator, no create buttons)

### Edge Functions
- `blockchain-deed` — Creates deed records with hash generation
- `waterfall-calculator` — Server-side waterfall calculation
- `seed-demo-users` — Seeds demo accounts for testing

---

## 8. KEY SHARED COMPONENTS

### PortalLayout (`src/components/layout/PortalLayout.tsx`)
- Dark sidebar (`bg-[#0a0a0a]`) with amber/gold gradient branding
- Role-specific navigation items (dynamically generated via `getNavItems(role)`)
- Collapsible sidebar with smooth transition
- User avatar dropdown with profile link and sign out
- Main content area with light background (`bg-gradient-to-br from-neutral-50 to-neutral-100`)

### IdentityCard (`src/components/identity/IdentityCard.tsx`)
- Two variants: `compact` and `full`
- Shows role-specific fields (registration number for suppliers, license for SPV, department for MDA, employee ID for Treasury)
- Role-colored gradient avatar (blue=supplier, purple=SPV, orange=MDA, emerald=Treasury)
- Verification badge (green check if profile_completed)

### ProfileCompletionCard (`src/components/identity/ProfileCompletionCard.tsx`)
- Progress indicator showing profile completion percentage

### BillDetailModal (`src/components/bills/BillDetailModal.tsx`)
- Detailed bill view with supplier info, MDA info, amounts, dates, documents

### SPVOfferForm (`src/components/bills/SPVOfferForm.tsx`)
- Form for SPV to set offer_amount and discount_rate

### TripartiteDeedCard (`src/components/blockchain/TripartiteDeedCard.tsx`)
- Visual card showing 3-party deed with signature status for each party

### ReceivableNoteCard (`src/components/blockchain/ReceivableNoteCard.tsx`)
- Card showing receivable note details with mint button

---

## 9. STATUS COLOR MAPPING

Used consistently across Backend Engine pages:
```typescript
const statusColors: Record<string, string> = {
  active: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  frozen: 'bg-red-500/10 text-red-600 border-red-500/20',
  closed: 'bg-neutral-500/10 text-neutral-600 border-neutral-500/20',
  pending: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  obligor_paid: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  distributing: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  distributed: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  reconciled: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20',
  authorized: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  settled: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  matched: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  discrepancy: 'bg-red-500/10 text-red-600 border-red-500/20',
};
```

---

## 10. DESIGN SYSTEM

### Color Theme
- **Primary accent:** Amber/Gold (`amber-400` to `amber-600`)
- **Sidebar:** Dark black (`#0a0a0a`) with neutral-800 borders
- **Main content:** Light neutral (`neutral-50` to `neutral-100`)
- **Logo:** Amber gradient icon with `Landmark` lucide icon

### Typography
- System fonts via Tailwind defaults
- Golden gradient text for branding: `bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent`

### UI Library
- **shadcn/ui** components: Card, Button, Badge, Tabs, Table, Dialog, Select, Input, Label, Textarea, Avatar, DropdownMenu, etc.
- All imported from `@/components/ui/*`

### Key Helpers
```typescript
const formatKES = (amount: number) => `KES ${amount.toLocaleString('en-KE', { minimumFractionDigits: 2 })}`;
```

---

## 11. DEMO ACCOUNTS & TESTING

All accounts use password: **`demo1234`**

### Recommended Test Flow
1. **Supplier** (`apex@demo.com`) → Submit bill to Ministry of Works
2. **SPV** (`alpha.capital@demo.com`) → Make offer (5% discount)
3. **Supplier** (`apex@demo.com`) → Accept offer
4. **MDA** (`mow@demo.com`) → Approve & set payment terms
5. **Treasury** (`national.treasury@demo.com`) → Certify (creates blockchain deed)
6. **SPV** (`alpha.capital@demo.com`) → View deed, generate receivable note

### Account Categories
- **6 Suppliers:** apex@demo.com, buildright@demo.com, techsupply@demo.com, medequip@demo.com, foodserve@demo.com, cleanenergy@demo.com
- **4 SPVs:** alpha.capital@demo.com, beta.investments@demo.com, gamma.finance@demo.com, delta.funding@demo.com
- **6 MDAs:** mow@demo.com, moh@demo.com, moe@demo.com, moit@demo.com, moa@demo.com, mod@demo.com
- **3 Treasury:** national.treasury@demo.com, county.treasury@demo.com, cbk.liaison@demo.com
- **2 Admin:** admin@demo.com, platform.admin@demo.com

---

## 12. MOCK DATA SYSTEM

The platform uses **two data sources** simultaneously:

1. **Supabase (live database):** Real bills submitted through the UI, blockchain deeds, trust accounts, etc.
2. **Mock data files:** Pre-populated data for demo density:
   - `src/data/mockData.ts` — Bills, suppliers, MDAs, payment schedules, transaction steps, timeline events (used by DataContext for admin/legacy pages)
   - `src/data/comprehensiveMockData.ts` — Extensive mock data for MDA Bills Page, Treasury Pending Page, SPV Offers Page with realistic Kenyan entities
   - `src/data/adminMockData.ts` — Admin dashboard mock metrics
   - `src/data/pendingBills.ts` — Pending bills breakdown by range

### DataContext (`src/contexts/DataContext.tsx`)
- In-memory state manager for mock data
- Persists to localStorage under key `rso_poc_data`
- Provides actions: verifyBill, processBill, payBill, rejectBill, bulkVerifyBills, etc.
- Used primarily by admin/legacy pages

---

## 13. CONTEXT PROVIDERS

```tsx
<QueryClientProvider>      // TanStack React Query
  <AuthProvider>           // Supabase Auth state (user, session, profile, role)
    <DataProvider>         // Mock data state manager
      <FilterProvider>     // UI filter state
        <TooltipProvider>  // shadcn tooltips
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </TooltipProvider>
      </FilterProvider>
    </DataProvider>
  </AuthProvider>
</QueryClientProvider>
```

---

## 14. EDGE FUNCTIONS

Located in `supabase/functions/`:

### `blockchain-deed`
- Creates a blockchain deed record in the database
- Generates deed hash from bill + party data
- Called when Treasury certifies a bill

### `waterfall-calculator`
- Server-side waterfall distribution calculation
- Accepts: obligor_payment_amount, tax_rate, trustee_fee_rate, admin_fee_rate, interest_rate
- Returns: breakdown of 6 tranches

### `seed-demo-users`
- Seeds all demo accounts with proper roles and profiles
- Creates MDA records
- One-time setup function

---

## 15. KEY NPM DEPENDENCIES

| Package | Purpose |
|---------|---------|
| `@supabase/supabase-js` | Database, Auth, Storage, Edge Functions |
| `react-router-dom` | Client-side routing |
| `@tanstack/react-query` | Server state management |
| `recharts` | Charts and visualizations |
| `lucide-react` | Icons |
| `date-fns` | Date formatting |
| `sonner` | Toast notifications |
| `zod` | Form validation |
| `react-hook-form` | Form management |
| `jspdf` + `html2canvas` | PDF generation |
| `framer-motion` | (available but not heavily used) |

---

## 16. FILE STRUCTURE SUMMARY

```
src/
├── App.tsx                          # Route definitions
├── main.tsx                         # Entry point
├── index.css                        # Tailwind + design tokens
├── contexts/
│   ├── AuthContext.tsx               # Supabase auth (user, profile, role)
│   ├── DataContext.tsx               # Mock data state
│   └── FilterContext.tsx             # UI filters
├── components/
│   ├── layout/
│   │   ├── PortalLayout.tsx          # Main layout for all role portals
│   │   ├── AppLayout.tsx             # Admin layout
│   │   ├── Sidebar.tsx               # Admin sidebar
│   │   └── TopBar.tsx
│   ├── identity/
│   │   ├── IdentityCard.tsx          # User identity display
│   │   ├── PartyIdentityCard.tsx     # Other party identity
│   │   └── ProfileCompletionCard.tsx
│   ├── bills/
│   │   ├── BillDetailModal.tsx       # Full bill details dialog
│   │   ├── SPVOfferForm.tsx          # SPV offer creation form
│   │   ├── MDAAuthorizationForm.tsx  # MDA approval form
│   │   └── TreasuryCertificationForm.tsx
│   ├── blockchain/
│   │   ├── TripartiteDeedCard.tsx    # 3-party deed visualization
│   │   └── ReceivableNoteCard.tsx    # NFT receivable note card
│   ├── common/
│   │   ├── DataTable.tsx             # Reusable data table
│   │   ├── DocumentUpload.tsx        # File upload component
│   │   └── FilterPanel.tsx
│   ├── dashboard/                    # Dashboard widgets (charts, KPIs)
│   ├── ProtectedRoute.tsx            # Role-based route guard
│   └── ui/                           # shadcn/ui components
├── pages/
│   ├── AuthPage.tsx
│   ├── supplier/                     # Supplier portal pages
│   ├── spv/                          # SPV portal pages
│   ├── mda/                          # MDA portal pages
│   ├── treasury/                     # Treasury portal pages
│   └── admin/                        # Admin portal pages
├── data/
│   ├── mockData.ts                   # Core mock data
│   ├── comprehensiveMockData.ts      # Extended mock data
│   ├── adminMockData.ts
│   ├── pendingBills.ts
│   └── generateBills.ts
├── hooks/
│   ├── useBlockchainDeed.ts          # Blockchain deed CRUD operations
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib/
│   ├── utils.ts                      # cn() helper
│   ├── exportUtils.ts                # CSV/Excel export
│   ├── pdfGenerator.ts               # PDF generation
│   └── documentStorage.ts
└── integrations/supabase/
    ├── client.ts                     # Supabase client (auto-generated)
    └── types.ts                      # Database types (auto-generated)

supabase/
├── config.toml
└── functions/
    ├── blockchain-deed/index.ts
    ├── waterfall-calculator/index.ts
    └── seed-demo-users/index.ts

docs/
├── DEMO_ACCOUNTS.md
├── TESTING_GUIDE.md
├── RSO_CONCEPT_NOTE.md
└── RSO_Backend_Engine_Overview_2026.pdf
```

---

## 17. WHAT TO ADD / ENHANCE

Potential features not yet fully implemented:
1. **Interactive 6-step payment flow stepper** showing: Origination → Assignment → Issuance → Payment → Obligor Pay → Waterfall Distribution
2. **Richer Backend Engine charts** — Distribution trends over time, trust account balance pie charts, settlement status breakdowns (using Recharts)
3. **Real-time updates** via Supabase Realtime subscriptions
4. **Email notifications** via Edge Functions
5. **PDF document generation** for certificates, deeds, and reports
6. **Mobile-responsive** improvements for portal layouts
