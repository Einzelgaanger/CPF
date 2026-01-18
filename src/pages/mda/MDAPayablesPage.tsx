import { useState } from 'react';
import PortalLayout from '@/components/layout/PortalLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Clock, CheckCircle, XCircle, AlertCircle, Calendar, Building2 } from 'lucide-react';
import { format, subDays, subMonths } from 'date-fns';

// Mock data for unpaid payables
const mockUnpaidPayables = [
  {
    id: '1',
    invoice_number: 'INV-2024-001',
    supplier_name: 'ABC Construction Ltd',
    amount: 45000000,
    invoice_date: subDays(new Date(), 120).toISOString(),
    due_date: subDays(new Date(), 30).toISOString(),
    description: 'Road construction phase 1',
    status: 'overdue',
    days_outstanding: 120,
  },
  {
    id: '2',
    invoice_number: 'INV-2024-002',
    supplier_name: 'XYZ Supplies Co',
    amount: 12500000,
    invoice_date: subDays(new Date(), 90).toISOString(),
    due_date: subDays(new Date(), 15).toISOString(),
    description: 'Office furniture and equipment',
    status: 'overdue',
    days_outstanding: 90,
  },
  {
    id: '3',
    invoice_number: 'INV-2024-003',
    supplier_name: 'Tech Solutions Inc',
    amount: 8750000,
    invoice_date: subDays(new Date(), 60).toISOString(),
    due_date: subDays(new Date(), 5).toISOString(),
    description: 'IT infrastructure upgrade',
    status: 'overdue',
    days_outstanding: 60,
  },
  {
    id: '4',
    invoice_number: 'INV-2024-004',
    supplier_name: 'Global Services Ltd',
    amount: 25000000,
    invoice_date: subDays(new Date(), 45).toISOString(),
    due_date: new Date().toISOString(),
    description: 'Consulting services Q3',
    status: 'pending',
    days_outstanding: 45,
  },
  {
    id: '5',
    invoice_number: 'INV-2024-005',
    supplier_name: 'Premier Contractors',
    amount: 67000000,
    invoice_date: subDays(new Date(), 30).toISOString(),
    due_date: subDays(new Date(), -15).toISOString(),
    description: 'Building renovation project',
    status: 'pending',
    days_outstanding: 30,
  },
];

// Mock data for verified payables
const mockVerifiedPayables = [
  {
    id: '6',
    invoice_number: 'INV-2024-V001',
    supplier_name: 'National Builders',
    amount: 35000000,
    invoice_date: subMonths(new Date(), 3).toISOString(),
    verified_date: subDays(new Date(), 10).toISOString(),
    description: 'Hospital wing construction',
    status: 'verified',
    spv_offer: 32500000,
  },
  {
    id: '7',
    invoice_number: 'INV-2024-V002',
    supplier_name: 'Medical Supplies Inc',
    amount: 18500000,
    invoice_date: subMonths(new Date(), 2).toISOString(),
    verified_date: subDays(new Date(), 5).toISOString(),
    description: 'Medical equipment supply',
    status: 'verified',
    spv_offer: 17200000,
  },
  {
    id: '8',
    invoice_number: 'INV-2024-V003',
    supplier_name: 'Green Energy Co',
    amount: 55000000,
    invoice_date: subMonths(new Date(), 4).toISOString(),
    verified_date: subDays(new Date(), 2).toISOString(),
    description: 'Solar panel installation',
    status: 'verified',
    spv_offer: 51000000,
  },
];

// Mock data for bills sent to Treasury
const mockTreasuryBills = [
  {
    id: '9',
    invoice_number: 'INV-2024-T001',
    supplier_name: 'Highway Contractors Ltd',
    amount: 125000000,
    sent_to_treasury: subDays(new Date(), 3).toISOString(),
    description: 'Highway expansion project',
    status: 'pending_certification',
    payment_quarters: 4,
    start_quarter: 'Q2 2025',
  },
  {
    id: '10',
    invoice_number: 'INV-2024-T002',
    supplier_name: 'EduTech Solutions',
    amount: 22000000,
    sent_to_treasury: subDays(new Date(), 7).toISOString(),
    description: 'E-learning platform development',
    status: 'certified',
    certificate_number: 'CERT-2025-00123',
    payment_quarters: 2,
    start_quarter: 'Q1 2025',
  },
  {
    id: '11',
    invoice_number: 'INV-2024-T003',
    supplier_name: 'Water Works Inc',
    amount: 78000000,
    sent_to_treasury: subDays(new Date(), 14).toISOString(),
    description: 'Water treatment facility',
    status: 'certified',
    certificate_number: 'CERT-2025-00118',
    payment_quarters: 6,
    start_quarter: 'Q1 2025',
  },
];

const MDAPayablesPage = () => {
  const [activeTab, setActiveTab] = useState('unpaid');

  const totalUnpaid = mockUnpaidPayables.reduce((sum, p) => sum + p.amount, 0);
  const totalVerified = mockVerifiedPayables.reduce((sum, p) => sum + p.amount, 0);
  const totalTreasury = mockTreasuryBills.reduce((sum, p) => sum + p.amount, 0);

  return (
    <PortalLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Payables Registry</h1>
          <p className="text-muted-foreground">View and manage all payables for your MDA</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-red-50 border-red-200">
            <CardContent className="py-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <p className="text-sm text-red-600">Unpaid Payables</p>
              </div>
              <p className="text-2xl font-bold text-red-700">{mockUnpaidPayables.length}</p>
              <p className="text-xs text-red-600">₦{(totalUnpaid / 1000000).toFixed(1)}M</p>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-200">
            <CardContent className="py-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <p className="text-sm text-green-600">Verified</p>
              </div>
              <p className="text-2xl font-bold text-green-700">{mockVerifiedPayables.length}</p>
              <p className="text-xs text-green-600">₦{(totalVerified / 1000000).toFixed(1)}M</p>
            </CardContent>
          </Card>
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="py-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <p className="text-sm text-blue-600">At Treasury</p>
              </div>
              <p className="text-2xl font-bold text-blue-700">{mockTreasuryBills.filter(b => b.status === 'pending_certification').length}</p>
              <p className="text-xs text-blue-600">Pending Certification</p>
            </CardContent>
          </Card>
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="py-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-600" />
                <p className="text-sm text-purple-600">Total Registered</p>
              </div>
              <p className="text-2xl font-bold text-purple-700">
                ₦{((totalUnpaid + totalVerified + totalTreasury) / 1000000000).toFixed(2)}B
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="unpaid" className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Unpaid ({mockUnpaidPayables.length})
            </TabsTrigger>
            <TabsTrigger value="verified" className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Verified ({mockVerifiedPayables.length})
            </TabsTrigger>
            <TabsTrigger value="treasury" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Treasury ({mockTreasuryBills.length})
            </TabsTrigger>
          </TabsList>

          {/* Unpaid Payables Tab */}
          <TabsContent value="unpaid" className="space-y-4 mt-4">
            {mockUnpaidPayables.map((payable) => (
              <Card key={payable.id} className={payable.status === 'overdue' ? 'border-red-200' : ''}>
                <CardContent className="py-4">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-lg">{payable.invoice_number}</h3>
                        <Badge className={payable.status === 'overdue' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}>
                          {payable.status === 'overdue' ? 'Overdue' : 'Pending'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{payable.supplier_name}</p>
                      <p className="text-sm text-muted-foreground">{payable.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Invoice: {format(new Date(payable.invoice_date), 'MMM d, yyyy')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {payable.days_outstanding} days outstanding
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">₦{payable.amount.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">
                        Due: {format(new Date(payable.due_date), 'MMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Verified Payables Tab */}
          <TabsContent value="verified" className="space-y-4 mt-4">
            {mockVerifiedPayables.map((payable) => (
              <Card key={payable.id} className="border-green-200">
                <CardContent className="py-4">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-lg">{payable.invoice_number}</h3>
                        <Badge className="bg-green-100 text-green-700">Verified</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{payable.supplier_name}</p>
                      <p className="text-sm text-muted-foreground">{payable.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Verified: {format(new Date(payable.verified_date), 'MMM d, yyyy')}
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          SPV Offer: ₦{payable.spv_offer.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">₦{payable.amount.toLocaleString()}</p>
                      <p className="text-sm text-green-600">
                        Discount: {(((payable.amount - payable.spv_offer) / payable.amount) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Treasury Bills Tab */}
          <TabsContent value="treasury" className="space-y-4 mt-4">
            {mockTreasuryBills.map((bill) => (
              <Card key={bill.id} className={bill.status === 'certified' ? 'border-emerald-200' : 'border-blue-200'}>
                <CardContent className="py-4">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-lg">{bill.invoice_number}</h3>
                        <Badge className={bill.status === 'certified' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}>
                          {bill.status === 'certified' ? 'Certified' : 'Pending Certification'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{bill.supplier_name}</p>
                      <p className="text-sm text-muted-foreground">{bill.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Sent: {format(new Date(bill.sent_to_treasury), 'MMM d, yyyy')}
                        </span>
                        <span>
                          Payment: {bill.payment_quarters} quarters from {bill.start_quarter}
                        </span>
                      </div>
                      {bill.certificate_number && (
                        <p className="text-sm font-medium text-emerald-600">
                          Certificate: {bill.certificate_number}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">₦{bill.amount.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">
                        ₦{(bill.amount / bill.payment_quarters).toLocaleString()}/quarter
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </PortalLayout>
  );
};

export default MDAPayablesPage;