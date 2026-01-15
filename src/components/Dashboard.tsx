import { FileText, DollarSign, Clock, CheckCircle, TrendingUp, Building2 } from "lucide-react";
import StatCard from "./StatCard";
import TransactionFlow from "./TransactionFlow";
import BillsTable from "./BillsTable";
import AnalyticsChart from "./AnalyticsChart";
import { totalStats } from "@/data/pendingBills";

const Dashboard = () => {
  return (
    <main className="container mx-auto px-4 md:px-6 py-8">
      {/* Hero Section */}
      <section id="overview" className="mb-8">
        <div className="glass-card p-6 md:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/20 rounded-full text-accent text-sm font-medium mb-4">
              <Clock className="w-4 h-4" />
              Fast-Track Settlement Active
            </div>
            
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Pending Bills Securitization Platform
            </h1>
            <p className="text-muted-foreground max-w-2xl mb-6">
              Government debt securitization vehicle for settling verified pending bills. 
              Phase 1 targets bills up to <span className="text-accent font-semibold">KES 2 Million</span> through 
              the Pending Bills Liquidation Bond.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <button className="px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity">
                Start Verification
              </button>
              <button className="px-6 py-3 bg-muted border border-border text-foreground rounded-lg font-semibold hover:bg-muted/80 transition-colors">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <StatCard
          title="Total Pending Bills"
          value={totalStats.totalBills.toLocaleString()}
          subtitle="Across all MDAs"
          icon={FileText}
          variant="default"
        />
        <StatCard
          title="Total Value"
          value={`KES ${totalStats.totalAmountBillion}B`}
          subtitle="Outstanding amount"
          icon={DollarSign}
          variant="accent"
        />
        <StatCard
          title="Eligible Bills"
          value={totalStats.eligibleBills.toLocaleString()}
          subtitle="Bills ≤ KES 2M"
          icon={CheckCircle}
          variant="success"
          trend={{ value: 90, isPositive: true }}
        />
        <StatCard
          title="Eligible Value"
          value={`KES ${totalStats.eligibleAmountBillion}B`}
          subtitle="Phase 1 target"
          icon={TrendingUp}
          variant="warning"
        />
      </section>

      {/* Transaction Flow */}
      <TransactionFlow />

      {/* Bills Table */}
      <BillsTable />

      {/* Analytics */}
      <AnalyticsChart />

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-border">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5 text-accent" />
            <span className="text-sm text-muted-foreground">
              CPF Group & Sterling Capital — Transaction Advisors
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Pending Bills Verification Committee — Confidential Document
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Dashboard;
