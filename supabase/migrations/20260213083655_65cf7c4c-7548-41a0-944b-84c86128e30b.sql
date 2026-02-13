
-- ============================================
-- BACKEND ENGINE: Trust, Settlement & Securitization Infrastructure
-- ============================================

-- 1. Trust/SPV Accounts - Ring-fenced custody and settlement accounts
CREATE TABLE public.trust_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  spv_id uuid NOT NULL,
  account_type text NOT NULL CHECK (account_type IN ('custody', 'settlement', 'collection', 'distribution')),
  account_name text NOT NULL,
  bank_name text,
  account_number text,
  balance numeric NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'KES',
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'frozen', 'closed')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.trust_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "SPV can manage their trust accounts" ON public.trust_accounts FOR ALL USING (has_role(auth.uid(), 'spv'::app_role));
CREATE POLICY "Treasury can view all trust accounts" ON public.trust_accounts FOR SELECT USING (has_role(auth.uid(), 'treasury'::app_role));
CREATE POLICY "Admin can manage all trust accounts" ON public.trust_accounts FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- 2. Waterfall Distributions - Payment priority tracking
CREATE TABLE public.waterfall_distributions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bill_id uuid REFERENCES public.bills(id),
  deed_id uuid REFERENCES public.blockchain_deeds(id),
  trust_account_id uuid REFERENCES public.trust_accounts(id),
  obligor_payment_amount numeric NOT NULL,
  obligor_payment_date timestamptz,
  -- Waterfall tranches (in priority order)
  taxes_amount numeric NOT NULL DEFAULT 0,
  trustee_fees_amount numeric NOT NULL DEFAULT 0,
  admin_fees_amount numeric NOT NULL DEFAULT 0,
  interest_amount numeric NOT NULL DEFAULT 0,
  principal_amount numeric NOT NULL DEFAULT 0,
  residual_amount numeric NOT NULL DEFAULT 0,
  -- Rates used
  tax_rate numeric DEFAULT 0,
  trustee_fee_rate numeric DEFAULT 0,
  admin_fee_rate numeric DEFAULT 0,
  interest_rate numeric DEFAULT 0,
  -- Status
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'obligor_paid', 'distributing', 'distributed', 'reconciled')),
  distributed_at timestamptz,
  reconciled_at timestamptz,
  reconciled_by uuid,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.waterfall_distributions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "SPV can manage waterfall distributions" ON public.waterfall_distributions FOR ALL USING (has_role(auth.uid(), 'spv'::app_role));
CREATE POLICY "Treasury can view waterfall distributions" ON public.waterfall_distributions FOR SELECT USING (has_role(auth.uid(), 'treasury'::app_role));
CREATE POLICY "Admin can manage waterfall distributions" ON public.waterfall_distributions FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- 3. Settlement Transactions - Cash movement tracking
CREATE TABLE public.settlement_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  waterfall_id uuid REFERENCES public.waterfall_distributions(id),
  bill_id uuid REFERENCES public.bills(id),
  from_account_id uuid REFERENCES public.trust_accounts(id),
  to_account_id uuid REFERENCES public.trust_accounts(id),
  transaction_type text NOT NULL CHECK (transaction_type IN ('obligor_payment', 'tax_deduction', 'trustee_fee', 'admin_fee', 'interest_payment', 'principal_repayment', 'residual_distribution', 'supplier_payment')),
  amount numeric NOT NULL,
  currency text NOT NULL DEFAULT 'KES',
  reference_number text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'authorized', 'cleared', 'settled', 'failed', 'reversed')),
  authorized_by uuid,
  authorized_at timestamptz,
  second_authorized_by uuid,
  second_authorized_at timestamptz,
  settled_at timestamptz,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.settlement_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "SPV can manage settlement transactions" ON public.settlement_transactions FOR ALL USING (has_role(auth.uid(), 'spv'::app_role));
CREATE POLICY "Treasury can view settlement transactions" ON public.settlement_transactions FOR SELECT USING (has_role(auth.uid(), 'treasury'::app_role));
CREATE POLICY "Admin can manage settlement transactions" ON public.settlement_transactions FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- 4. Reconciliation Records - Audit and verification
CREATE TABLE public.reconciliation_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  waterfall_id uuid REFERENCES public.waterfall_distributions(id),
  trust_account_id uuid REFERENCES public.trust_accounts(id),
  period_start date NOT NULL,
  period_end date NOT NULL,
  expected_balance numeric NOT NULL,
  actual_balance numeric NOT NULL,
  variance numeric GENERATED ALWAYS AS (actual_balance - expected_balance) STORED,
  variance_explained boolean NOT NULL DEFAULT false,
  variance_notes text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_review', 'matched', 'discrepancy', 'resolved')),
  performed_by uuid,
  reviewed_by uuid,
  reviewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.reconciliation_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "SPV can manage reconciliation records" ON public.reconciliation_records FOR ALL USING (has_role(auth.uid(), 'spv'::app_role));
CREATE POLICY "Treasury can view reconciliation records" ON public.reconciliation_records FOR SELECT USING (has_role(auth.uid(), 'treasury'::app_role));
CREATE POLICY "Admin can manage reconciliation records" ON public.reconciliation_records FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Triggers for updated_at
CREATE TRIGGER update_trust_accounts_updated_at BEFORE UPDATE ON public.trust_accounts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_waterfall_distributions_updated_at BEFORE UPDATE ON public.waterfall_distributions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_settlement_transactions_updated_at BEFORE UPDATE ON public.settlement_transactions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_reconciliation_records_updated_at BEFORE UPDATE ON public.reconciliation_records FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
