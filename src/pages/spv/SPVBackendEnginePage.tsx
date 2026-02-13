import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import PortalLayout from '@/components/layout/PortalLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { 
  Shield, Landmark, Scale, Building2, FileCheck, 
  Calculator, ArrowDownToLine, Banknote, RefreshCw,
  CheckCircle2, Clock, AlertCircle, Plus
} from 'lucide-react';

const formatKES = (amount: number) => `KES ${amount.toLocaleString('en-KE', { minimumFractionDigits: 2 })}`;

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

// Waterfall Calculator Component
const WaterfallCalculator = () => {
  const [amount, setAmount] = useState<number>(100000000);
  const [taxRate, setTaxRate] = useState<number>(0);
  const [trusteeFeeRate, setTrusteeFeeRate] = useState<number>(0.5);
  const [adminFeeRate, setAdminFeeRate] = useState<number>(0.3);
  const [interestRate, setInterestRate] = useState<number>(8);
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const total = amount;
    const taxes = Math.round(total * (taxRate / 100) * 100) / 100;
    let remaining = total - taxes;
    const trusteeFees = Math.round(total * (trusteeFeeRate / 100) * 100) / 100;
    remaining -= trusteeFees;
    const adminFees = Math.round(total * (adminFeeRate / 100) * 100) / 100;
    remaining -= adminFees;
    const interest = Math.round(total * (interestRate / 100) * 100) / 100;
    remaining -= interest;
    const principal = Math.max(0, remaining);
    const residual = 0;

    setResult({
      taxes_amount: taxes,
      trustee_fees_amount: trusteeFees,
      admin_fees_amount: adminFees,
      interest_amount: interest,
      principal_amount: principal,
      residual_amount: residual,
      total_distributed: taxes + trusteeFees + adminFees + interest + principal,
    });
  };

  useEffect(() => { calculate(); }, [amount, taxRate, trusteeFeeRate, adminFeeRate, interestRate]);

  const tranches = result ? [
    { priority: 1, name: 'Taxes & Statutory Charges', amount: result.taxes_amount, rate: taxRate, color: 'bg-red-500' },
    { priority: 2, name: 'Trustee Fees', amount: result.trustee_fees_amount, rate: trusteeFeeRate, color: 'bg-orange-500' },
    { priority: 3, name: 'Administrative Fees', amount: result.admin_fees_amount, rate: adminFeeRate, color: 'bg-amber-500' },
    { priority: 4, name: 'Interest to Investors', amount: result.interest_amount, rate: interestRate, color: 'bg-blue-500' },
    { priority: 5, name: 'Principal Repayment', amount: result.principal_amount, rate: null, color: 'bg-emerald-500' },
    { priority: 6, name: 'Residual', amount: result.residual_amount, rate: null, color: 'bg-neutral-400' },
  ] : [];

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-amber-500" />
            Waterfall Parameters
          </CardTitle>
          <CardDescription>Configure the payment waterfall distribution rates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Obligor Payment Amount (KES)</Label>
            <Input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Tax/WHT Rate (%)</Label>
              <Input type="number" step="0.1" value={taxRate} onChange={e => setTaxRate(Number(e.target.value))} />
            </div>
            <div>
              <Label>Trustee Fee Rate (%)</Label>
              <Input type="number" step="0.1" value={trusteeFeeRate} onChange={e => setTrusteeFeeRate(Number(e.target.value))} />
            </div>
            <div>
              <Label>Admin Fee Rate (%)</Label>
              <Input type="number" step="0.1" value={adminFeeRate} onChange={e => setAdminFeeRate(Number(e.target.value))} />
            </div>
            <div>
              <Label>Interest/Discount Rate (%)</Label>
              <Input type="number" step="0.1" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowDownToLine className="w-5 h-5 text-amber-500" />
            Waterfall Distribution
          </CardTitle>
          <CardDescription>Contractually locked payment priority (Trust Deed)</CardDescription>
        </CardHeader>
        <CardContent>
          {result && (
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-sm font-medium text-muted-foreground">Total Obligor Payment</span>
                <span className="text-lg font-bold">{formatKES(amount)}</span>
              </div>
              {tranches.map((t) => (
                <div key={t.priority} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg ${t.color} flex items-center justify-center text-white text-xs font-bold`}>
                    {t.priority}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{t.name}</p>
                    {t.rate !== null && <p className="text-xs text-muted-foreground">{t.rate}%</p>}
                  </div>
                  <span className="text-sm font-semibold tabular-nums">{formatKES(t.amount)}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-3 border-t mt-2">
                <span className="text-sm font-medium">Total Distributed</span>
                <span className="text-lg font-bold text-emerald-600">{formatKES(result.total_distributed)}</span>
              </div>
              {/* Visual bar */}
              <div className="h-4 rounded-full overflow-hidden flex mt-4">
                {tranches.filter(t => t.amount > 0).map(t => (
                  <div
                    key={t.priority}
                    className={`${t.color} h-full`}
                    style={{ width: `${(t.amount / amount) * 100}%` }}
                    title={`${t.name}: ${formatKES(t.amount)}`}
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {tranches.filter(t => t.amount > 0).map(t => (
                  <div key={t.priority} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <div className={`w-2 h-2 rounded-full ${t.color}`} />
                    {t.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Trust Accounts Tab
const TrustAccountsTab = () => {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAccounts = async () => {
    setLoading(true);
    const { data } = await supabase.from('trust_accounts').select('*').order('created_at', { ascending: false });
    setAccounts(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchAccounts(); }, []);

  const createAccount = async (type: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const names: Record<string, string> = {
      custody: 'SPV Custody Account',
      settlement: 'Settlement Account',
      collection: 'Collection Account',
      distribution: 'Distribution Account',
    };
    const { error } = await supabase.from('trust_accounts').insert({
      spv_id: user.id,
      account_type: type,
      account_name: names[type] || type,
      bank_name: 'Kenya Commercial Bank',
      balance: 0,
    });
    if (error) { toast.error(error.message); return; }
    toast.success(`${names[type]} created`);
    fetchAccounts();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Trust & Custody Accounts</h3>
          <p className="text-sm text-muted-foreground">Ring-fenced, segregated accounts for transparent cash movement</p>
        </div>
        <div className="flex gap-2">
          {['custody', 'settlement', 'collection', 'distribution'].map(type => (
            <Button key={type} variant="outline" size="sm" onClick={() => createAccount(type)}>
              <Plus className="w-3 h-3 mr-1" />
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {accounts.map(acc => (
          <Card key={acc.id}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="outline" className={statusColors[acc.status] || ''}>
                  {acc.status}
                </Badge>
                <Badge variant="secondary" className="text-xs">{acc.account_type}</Badge>
              </div>
              <h4 className="font-semibold text-sm mb-1">{acc.account_name}</h4>
              <p className="text-xs text-muted-foreground mb-3">{acc.bank_name || 'No bank assigned'}</p>
              <p className="text-2xl font-bold">{formatKES(acc.balance)}</p>
            </CardContent>
          </Card>
        ))}
        {!loading && accounts.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            <Building2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No trust accounts yet. Create your first segregated account above.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Settlement Transactions Tab
const SettlementTab = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('settlement_transactions').select('*').order('created_at', { ascending: false }).limit(50);
      setTransactions(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  const typeLabels: Record<string, string> = {
    obligor_payment: 'Obligor Payment',
    tax_deduction: 'Tax Deduction',
    trustee_fee: 'Trustee Fee',
    admin_fee: 'Admin Fee',
    interest_payment: 'Interest Payment',
    principal_repayment: 'Principal Repayment',
    residual_distribution: 'Residual',
    supplier_payment: 'Supplier Payment',
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Settlement Transactions</h3>
        <p className="text-sm text-muted-foreground">Cash movement with dual authorization and audit trail</p>
      </div>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Reference</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map(tx => (
              <TableRow key={tx.id}>
                <TableCell className="text-sm">{new Date(tx.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <span className="text-sm font-medium">{typeLabels[tx.transaction_type] || tx.transaction_type}</span>
                </TableCell>
                <TableCell className="font-semibold tabular-nums">{formatKES(tx.amount)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusColors[tx.status] || ''}>{tx.status}</Badge>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">{tx.reference_number || '—'}</TableCell>
              </TableRow>
            ))}
            {!loading && transactions.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No settlement transactions yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

// Reconciliation Tab
const ReconciliationTab = () => {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('reconciliation_records').select('*').order('created_at', { ascending: false }).limit(50);
      setRecords(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Reconciliation Records</h3>
        <p className="text-sm text-muted-foreground">Verification before disbursement with variance tracking</p>
      </div>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Period</TableHead>
              <TableHead>Expected</TableHead>
              <TableHead>Actual</TableHead>
              <TableHead>Variance</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map(rec => (
              <TableRow key={rec.id}>
                <TableCell className="text-sm">{rec.period_start} — {rec.period_end}</TableCell>
                <TableCell className="tabular-nums">{formatKES(rec.expected_balance)}</TableCell>
                <TableCell className="tabular-nums">{formatKES(rec.actual_balance)}</TableCell>
                <TableCell className={`tabular-nums font-medium ${rec.variance !== 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                  {formatKES(rec.variance)}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusColors[rec.status] || ''}>{rec.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
            {!loading && records.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No reconciliation records yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

// Distributions Tab
const DistributionsTab = () => {
  const [distributions, setDistributions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('waterfall_distributions').select('*').order('created_at', { ascending: false }).limit(50);
      setDistributions(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Waterfall Distributions</h3>
        <p className="text-sm text-muted-foreground">Track obligor payments and contractual waterfall execution</p>
      </div>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Obligor Payment</TableHead>
              <TableHead>Interest</TableHead>
              <TableHead>Principal</TableHead>
              <TableHead>Fees</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {distributions.map(d => (
              <TableRow key={d.id}>
                <TableCell className="text-sm">{new Date(d.created_at).toLocaleDateString()}</TableCell>
                <TableCell className="font-semibold tabular-nums">{formatKES(d.obligor_payment_amount)}</TableCell>
                <TableCell className="tabular-nums">{formatKES(d.interest_amount)}</TableCell>
                <TableCell className="tabular-nums">{formatKES(d.principal_amount)}</TableCell>
                <TableCell className="tabular-nums">{formatKES(d.trustee_fees_amount + d.admin_fees_amount)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusColors[d.status] || ''}>{d.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
            {!loading && distributions.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No distributions yet. Use the Waterfall Calculator to model one.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

// Main Page
const SPVBackendEnginePage = () => {
  const layers = [
    { icon: Shield, title: 'Trust / SPV Layer', desc: 'Bankruptcy-remote, holds legal title', status: 'Active' },
    { icon: Scale, title: 'Legal Counsel', desc: 'Assignment agreements & enforceability', status: 'Active' },
    { icon: FileCheck, title: 'Independent Trustee', desc: 'Oversight, covenant monitoring', status: 'Active' },
    { icon: Landmark, title: 'Custody & Settlement', desc: 'Segregated accounts & clearing', status: 'Active' },
    { icon: RefreshCw, title: 'Administration', desc: 'Reconciliation & reporting', status: 'Active' },
  ];

  return (
    <PortalLayout>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Backend Engine</h1>
          <p className="text-muted-foreground">Trust, Settlement & Securitization Infrastructure</p>
        </div>

        {/* 5 Institutional Layers Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {layers.map((layer, i) => (
            <Card key={i} className="border-amber-500/20 bg-gradient-to-br from-amber-50/50 to-white">
              <CardContent className="pt-5 text-center">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-3">
                  <layer.icon className="w-6 h-6 text-amber-600" />
                </div>
                <h4 className="text-sm font-semibold mb-1">{layer.title}</h4>
                <p className="text-xs text-muted-foreground">{layer.desc}</p>
                <Badge variant="outline" className="mt-2 bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px]">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  {layer.status}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="waterfall" className="space-y-6">
          <TabsList className="bg-neutral-100">
            <TabsTrigger value="waterfall">
              <Calculator className="w-4 h-4 mr-2" />
              Waterfall Calculator
            </TabsTrigger>
            <TabsTrigger value="accounts">
              <Building2 className="w-4 h-4 mr-2" />
              Trust Accounts
            </TabsTrigger>
            <TabsTrigger value="distributions">
              <ArrowDownToLine className="w-4 h-4 mr-2" />
              Distributions
            </TabsTrigger>
            <TabsTrigger value="settlement">
              <Banknote className="w-4 h-4 mr-2" />
              Settlement
            </TabsTrigger>
            <TabsTrigger value="reconciliation">
              <RefreshCw className="w-4 h-4 mr-2" />
              Reconciliation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="waterfall"><WaterfallCalculator /></TabsContent>
          <TabsContent value="accounts"><TrustAccountsTab /></TabsContent>
          <TabsContent value="distributions"><DistributionsTab /></TabsContent>
          <TabsContent value="settlement"><SettlementTab /></TabsContent>
          <TabsContent value="reconciliation"><ReconciliationTab /></TabsContent>
        </Tabs>
      </div>
    </PortalLayout>
  );
};

export default SPVBackendEnginePage;
