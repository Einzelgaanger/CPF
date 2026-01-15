import { useState } from "react";
import { sampleBills, SampleBill } from "@/data/pendingBills";
import { Search, Filter, CheckCircle, Clock, Loader2, ChevronDown } from "lucide-react";

const BillsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredBills = sampleBills.filter((bill) => {
    const matchesSearch = 
      bill.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.mda.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || bill.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: SampleBill['status']) => {
    const styles = {
      verified: 'badge-verified',
      pending: 'badge-pending',
      processing: 'badge-processing',
    };

    const icons = {
      verified: <CheckCircle className="w-3 h-3" />,
      pending: <Clock className="w-3 h-3" />,
      processing: <Loader2 className="w-3 h-3 animate-spin" />,
    };

    return (
      <span className={`${styles[status]} inline-flex items-center gap-1`}>
        {icons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <section id="bills" className="py-8">
      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b border-border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-1">
                Pending Bills Registry
              </h2>
              <p className="text-sm text-muted-foreground">
                Bills eligible for settlement (up to KES 2M)
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search bills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-full md:w-64"
                />
              </div>
              
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="verified">Verified</option>
                  <option value="processing">Processing</option>
                  <option value="pending">Pending</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Bill ID</th>
                <th>Supplier</th>
                <th>MDA</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Verification Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredBills.map((bill) => (
                <tr key={bill.id} className="hover:bg-muted/20 transition-colors">
                  <td className="font-mono text-sm font-medium text-primary">
                    {bill.id}
                  </td>
                  <td className="font-medium">{bill.supplier}</td>
                  <td className="text-muted-foreground">{bill.mda}</td>
                  <td className="font-semibold text-accent">
                    {formatCurrency(bill.amount)}
                  </td>
                  <td className="text-muted-foreground">{bill.dueDate}</td>
                  <td>{getStatusBadge(bill.status)}</td>
                  <td className="text-muted-foreground">
                    {bill.verificationDate || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-border bg-muted/20">
          <p className="text-sm text-muted-foreground text-center">
            Showing {filteredBills.length} of {sampleBills.length} bills
          </p>
        </div>
      </div>
    </section>
  );
};

export default BillsTable;
