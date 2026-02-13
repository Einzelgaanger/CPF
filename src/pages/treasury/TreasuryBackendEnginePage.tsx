import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import PortalLayout from '@/components/layout/PortalLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Building2, Banknote, RefreshCw, ArrowDownToLine,
  Shield, Landmark, Scale, FileCheck, CheckCircle2, Eye
} from 'lucide-react';

const formatKES = (amount: number) => `KES ${amount.toLocaleString('en-KE', { minimumFractionDigits: 2 })}`;

const statusColors: Record<string, string> = {
  active: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  frozen: 'bg-red-500/10 text-red-600 border-red-500/20',
  pending: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  distributed: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  authorized: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  settled: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  matched: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  discrepancy: 'bg-red-500/10 text-red-600 border-red-500/20',
  reconciled: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20',
};

const TreasuryBackendEnginePage = () => {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [distributions, setDistributions] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [reconciliations, setReconciliations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      const [accRes, distRes, txRes, recRes] = await Promise.all([
        supabase.from('trust_accounts').select('*').order('created_at', { ascending: false }),
        supabase.from('waterfall_distributions').select('*').order('created_at', { ascending: false }).limit(50),
        supabase.from('settlement_transactions').select('*').order('created_at', { ascending: false }).limit(50),
        supabase.from('reconciliation_records').select('*').order('created_at', { ascending: false }).limit(50),
      ]);
      setAccounts(accRes.data || []);
      setDistributions(distRes.data || []);
      setTransactions(txRes.data || []);
      setReconciliations(recRes.data || []);
      setLoading(false);
    };
    fetchAll();
  }, []);

  const totalBalance = accounts.reduce((sum, a) => sum + Number(a.balance), 0);
  const totalDistributed = distributions.filter(d => d.status === 'distributed').reduce((sum, d) => sum + Number(d.obligor_payment_amount), 0);
  const pendingDistributions = distributions.filter(d => d.status === 'pending').length;

  const typeLabels: Record<string, string> = {
    obligor_payment: 'Obligor Payment', tax_deduction: 'Tax Deduction',
    trustee_fee: 'Trustee Fee', admin_fee: 'Admin Fee',
    interest_payment: 'Interest Payment', principal_repayment: 'Principal Repayment',
    residual_distribution: 'Residual', supplier_payment: 'Supplier Payment',
  };

  const layers = [
    { icon: Shield, title: 'Trust / SPV Layer', desc: 'Bankruptcy-remote structure' },
    { icon: Scale, title: 'Legal Counsel', desc: 'Assignment & enforceability' },
    { icon: FileCheck, title: 'Independent Trustee', desc: 'Covenant monitoring' },
    { icon: Landmark, title: 'Custody & Settlement', desc: 'Segregated accounts' },
    { icon: RefreshCw, title: 'Administration', desc: 'Reconciliation & reporting' },
  ];

  return (
    <PortalLayout>
      <div className="p-6 lg:p-8 space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-emerald-500/10">
            <Eye className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Backend Engine Oversight</h1>
            <p className="text-muted-foreground">Read-only view of trust, settlement & securitization infrastructure</p>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card><CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Trust Accounts</p>
            <p className="text-2xl font-bold">{accounts.length}</p>
          </CardContent></Card>
          <Card><CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Balance</p>
            <p className="text-2xl font-bold">{formatKES(totalBalance)}</p>
          </CardContent></Card>
          <Card><CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Distributed</p>
            <p className="text-2xl font-bold text-emerald-600">{formatKES(totalDistributed)}</p>
          </CardContent></Card>
          <Card><CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Pending Distributions</p>
            <p className="text-2xl font-bold text-amber-600">{pendingDistributions}</p>
          </CardContent></Card>
        </div>

        {/* 5 Institutional Layers */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {layers.map((layer, i) => (
            <Card key={i} className="border-emerald-500/20 bg-gradient-to-br from-emerald-50/50 to-white">
              <CardContent className="pt-4 text-center">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mx-auto mb-2">
                  <layer.icon className="w-5 h-5 text-emerald-600" />
                </div>
                <h4 className="text-xs font-semibold">{layer.title}</h4>
                <p className="text-[10px] text-muted-foreground">{layer.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="accounts" className="space-y-6">
          <TabsList className="bg-neutral-100">
            <TabsTrigger value="accounts"><Building2 className="w-4 h-4 mr-2" />Trust Accounts</TabsTrigger>
            <TabsTrigger value="distributions"><ArrowDownToLine className="w-4 h-4 mr-2" />Distributions</TabsTrigger>
            <TabsTrigger value="settlement"><Banknote className="w-4 h-4 mr-2" />Settlement</TabsTrigger>
            <TabsTrigger value="reconciliation"><RefreshCw className="w-4 h-4 mr-2" />Reconciliation</TabsTrigger>
          </TabsList>

          <TabsContent value="accounts">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {accounts.map(acc => (
                <Card key={acc.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className={statusColors[acc.status] || ''}>{acc.status}</Badge>
                      <Badge variant="secondary" className="text-xs">{acc.account_type}</Badge>
                    </div>
                    <h4 className="font-semibold text-sm mb-1">{acc.account_name}</h4>
                    <p className="text-xs text-muted-foreground mb-3">{acc.bank_name || 'No bank'}</p>
                    <p className="text-2xl font-bold">{formatKES(acc.balance)}</p>
                  </CardContent>
                </Card>
              ))}
              {!loading && accounts.length === 0 && (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  <Building2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No trust accounts have been created yet.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="distributions">
            <Card><Table>
              <TableHeader><TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Obligor Payment</TableHead>
                <TableHead>Interest</TableHead>
                <TableHead>Principal</TableHead>
                <TableHead>Fees</TableHead>
                <TableHead>Status</TableHead>
              </TableRow></TableHeader>
              <TableBody>
                {distributions.map(d => (
                  <TableRow key={d.id}>
                    <TableCell className="text-sm">{new Date(d.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="font-semibold tabular-nums">{formatKES(d.obligor_payment_amount)}</TableCell>
                    <TableCell className="tabular-nums">{formatKES(d.interest_amount)}</TableCell>
                    <TableCell className="tabular-nums">{formatKES(d.principal_amount)}</TableCell>
                    <TableCell className="tabular-nums">{formatKES(d.trustee_fees_amount + d.admin_fees_amount)}</TableCell>
                    <TableCell><Badge variant="outline" className={statusColors[d.status] || ''}>{d.status}</Badge></TableCell>
                  </TableRow>
                ))}
                {!loading && distributions.length === 0 && (
                  <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No distributions yet</TableCell></TableRow>
                )}
              </TableBody>
            </Table></Card>
          </TabsContent>

          <TabsContent value="settlement">
            <Card><Table>
              <TableHeader><TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reference</TableHead>
              </TableRow></TableHeader>
              <TableBody>
                {transactions.map(tx => (
                  <TableRow key={tx.id}>
                    <TableCell className="text-sm">{new Date(tx.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-sm font-medium">{typeLabels[tx.transaction_type] || tx.transaction_type}</TableCell>
                    <TableCell className="font-semibold tabular-nums">{formatKES(tx.amount)}</TableCell>
                    <TableCell><Badge variant="outline" className={statusColors[tx.status] || ''}>{tx.status}</Badge></TableCell>
                    <TableCell className="text-xs text-muted-foreground">{tx.reference_number || '—'}</TableCell>
                  </TableRow>
                ))}
                {!loading && transactions.length === 0 && (
                  <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No settlement transactions yet</TableCell></TableRow>
                )}
              </TableBody>
            </Table></Card>
          </TabsContent>

          <TabsContent value="reconciliation">
            <Card><Table>
              <TableHeader><TableRow>
                <TableHead>Period</TableHead>
                <TableHead>Expected</TableHead>
                <TableHead>Actual</TableHead>
                <TableHead>Variance</TableHead>
                <TableHead>Status</TableHead>
              </TableRow></TableHeader>
              <TableBody>
                {reconciliations.map(rec => (
                  <TableRow key={rec.id}>
                    <TableCell className="text-sm">{rec.period_start} — {rec.period_end}</TableCell>
                    <TableCell className="tabular-nums">{formatKES(rec.expected_balance)}</TableCell>
                    <TableCell className="tabular-nums">{formatKES(rec.actual_balance)}</TableCell>
                    <TableCell className={`tabular-nums font-medium ${rec.variance !== 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                      {formatKES(rec.variance)}
                    </TableCell>
                    <TableCell><Badge variant="outline" className={statusColors[rec.status] || ''}>{rec.status}</Badge></TableCell>
                  </TableRow>
                ))}
                {!loading && reconciliations.length === 0 && (
                  <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No reconciliation records yet</TableCell></TableRow>
                )}
              </TableBody>
            </Table></Card>
          </TabsContent>
        </Tabs>
      </div>
    </PortalLayout>
  );
};

export default TreasuryBackendEnginePage;
