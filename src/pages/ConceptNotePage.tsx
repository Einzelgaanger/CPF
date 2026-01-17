import { useState } from 'react';
import { 
  FileText, 
  Download, 
  ArrowRight, 
  Shield, 
  Landmark, 
  Users, 
  Building2, 
  Briefcase,
  TrendingUp,
  Coins,
  BarChart3,
  CheckCircle2,
  Globe,
  Lock,
  Zap,
  ArrowLeft,
  ChevronDown,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const ConceptNotePage = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleDownload = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>CPF Concept Note 2026</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
          
          * { margin: 0; padding: 0; box-sizing: border-box; }
          
          body { 
            font-family: 'Inter', -apple-system, sans-serif; 
            color: #1a1a1a; 
            line-height: 1.6;
            background: #fff;
          }
          
          .page { 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 60px 50px;
          }
          
          /* Cover Page */
          .cover { 
            min-height: 100vh; 
            display: flex; 
            flex-direction: column; 
            justify-content: center;
            align-items: center;
            text-align: center;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
            color: white;
            page-break-after: always;
          }
          
          .cover-logo {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 40px;
            box-shadow: 0 20px 40px rgba(245, 158, 11, 0.3);
          }
          
          .cover-logo svg { width: 40px; height: 40px; fill: #0a0a0a; }
          
          .cover h1 { 
            font-size: 48px; 
            font-weight: 800; 
            margin-bottom: 16px;
            background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #fbbf24 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .cover h2 { 
            font-size: 24px; 
            font-weight: 400; 
            color: #a3a3a3;
            margin-bottom: 60px;
          }
          
          .cover-meta { 
            color: #737373; 
            font-size: 14px;
            border-top: 1px solid #333;
            padding-top: 40px;
            margin-top: 40px;
          }
          
          .cover-badge {
            display: inline-block;
            padding: 8px 20px;
            background: rgba(245, 158, 11, 0.1);
            border: 1px solid rgba(245, 158, 11, 0.3);
            border-radius: 100px;
            color: #f59e0b;
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 40px;
          }
          
          /* Content Styles */
          h1 { font-size: 32px; font-weight: 800; margin: 48px 0 16px; color: #0a0a0a; }
          h2 { font-size: 24px; font-weight: 700; margin: 40px 0 16px; color: #1a1a1a; border-bottom: 2px solid #f59e0b; padding-bottom: 8px; }
          h3 { font-size: 18px; font-weight: 600; margin: 32px 0 12px; color: #262626; }
          p { margin: 16px 0; color: #404040; }
          
          .section { page-break-inside: avoid; margin: 32px 0; }
          
          /* Executive Summary Box */
          .exec-summary {
            background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
            border-left: 4px solid #f59e0b;
            padding: 24px 32px;
            margin: 32px 0;
            border-radius: 0 12px 12px 0;
          }
          
          .exec-summary h3 { color: #92400e; margin-top: 0; }
          
          /* Stats Grid */
          .stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin: 32px 0;
          }
          
          .stat-box {
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 24px;
            text-align: center;
          }
          
          .stat-value { font-size: 32px; font-weight: 800; color: #f59e0b; }
          .stat-label { font-size: 14px; color: #6b7280; margin-top: 4px; }
          
          /* Tables */
          table { width: 100%; border-collapse: collapse; margin: 24px 0; font-size: 14px; }
          th { background: #1a1a1a; color: white; padding: 12px 16px; text-align: left; font-weight: 600; }
          td { padding: 12px 16px; border-bottom: 1px solid #e5e7eb; }
          tr:nth-child(even) { background: #f9fafb; }
          
          /* Lists */
          ul { margin: 16px 0; padding-left: 24px; }
          li { margin: 8px 0; color: #404040; }
          li::marker { color: #f59e0b; }
          
          /* Workflow Diagram */
          .workflow {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 32px 0;
            padding: 24px;
            background: #f9fafb;
            border-radius: 12px;
          }
          
          .workflow-step {
            text-align: center;
            flex: 1;
          }
          
          .workflow-step .number {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
            color: #0a0a0a;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            margin: 0 auto 12px;
          }
          
          .workflow-step .title { font-weight: 600; font-size: 14px; color: #1a1a1a; }
          .workflow-step .subtitle { font-size: 12px; color: #6b7280; }
          
          .workflow-arrow {
            color: #d1d5db;
            font-size: 24px;
            padding: 0 8px;
          }
          
          /* Roadmap */
          .roadmap {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
            margin: 24px 0;
          }
          
          .roadmap-phase {
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 20px;
          }
          
          .roadmap-phase.current {
            border-color: #f59e0b;
            background: #fffbeb;
          }
          
          .roadmap-phase .phase-num {
            font-size: 36px;
            font-weight: 800;
            color: #e5e7eb;
          }
          
          .roadmap-phase.current .phase-num { color: #f59e0b; }
          
          .roadmap-phase h4 { font-size: 16px; font-weight: 600; margin: 8px 0; }
          .roadmap-phase ul { font-size: 13px; margin: 8px 0 0; padding-left: 20px; }
          
          /* Footer */
          .footer {
            margin-top: 60px;
            padding-top: 24px;
            border-top: 2px solid #e5e7eb;
            text-align: center;
            color: #6b7280;
            font-size: 12px;
          }
          
          .footer-logo {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 16px;
          }
          
          .footer-logo-icon {
            width: 32px;
            height: 32px;
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
            border-radius: 8px;
          }
          
          /* Print Styles */
          @media print {
            body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
            .page { padding: 40px 30px; }
            .cover { min-height: auto; padding: 100px 50px; }
          }
          
          @page { margin: 0; size: A4; }
        </style>
      </head>
      <body>
        <!-- Cover Page -->
        <div class="cover">
          <div class="cover-logo">
            <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <div class="cover-badge">Concept Note • January 2026</div>
          <h1>Contractor Payment Facility</h1>
          <h2>Government Debt Securitization Platform</h2>
          <div class="cover-meta">
            <p><strong>CPF Settlement Platform</strong></p>
            <p>Confidential Document • For Authorized Recipients Only</p>
          </div>
        </div>

        <!-- Content -->
        <div class="page">
          <div class="exec-summary">
            <h3>Executive Summary</h3>
            <p>The <strong>Contractor Payment Facility (CPF)</strong> is a revolutionary financial infrastructure designed to solve the persistent challenge of delayed government payments to contractors and suppliers.</p>
            <p>By creating a digital marketplace that converts government receivables into tradeable, blockchain-secured instruments, CPF unlocks billions in working capital while providing institutional investors with sovereign-grade investment opportunities.</p>
          </div>

          <div class="stats-grid">
            <div class="stat-box">
              <div class="stat-value">₦5-8T</div>
              <div class="stat-label">Nigerian Contractor Debt</div>
            </div>
            <div class="stat-box">
              <div class="stat-value">6-18</div>
              <div class="stat-label">Months Payment Delay</div>
            </div>
            <div class="stat-box">
              <div class="stat-value">₦18T+</div>
              <div class="stat-label">Pension Fund AUM</div>
            </div>
            <div class="stat-box">
              <div class="stat-value">92%</div>
              <div class="stat-label">Typical Advance Rate</div>
            </div>
          </div>

          <h2>The Problem</h2>
          <div class="section">
            <h3>Government Payment Delays: A $2 Trillion Global Challenge</h3>
            <p>Governments worldwide owe trillions to contractors, with payment cycles often extending 6-18 months. This creates:</p>
            <ul>
              <li><strong>Supplier Cash Flow Crisis:</strong> SMEs face bankruptcy, contractors abandon projects</li>
              <li><strong>Economic Inefficiency:</strong> Working capital trapped, higher bid prices</li>
              <li><strong>Fiscal Pressure:</strong> Accumulating arrears, damaged government credibility</li>
            </ul>
            
            <h3>Current Solutions Are Inadequate</h3>
            <table>
              <tr><th>Approach</th><th>Limitation</th></tr>
              <tr><td>Bank Factoring</td><td>High discount rates (15-30%), limited availability</td></tr>
              <tr><td>Government Bonds</td><td>Doesn't address supplier liquidity</td></tr>
              <tr><td>Direct Payment</td><td>Fiscally impossible in constrained environments</td></tr>
              <tr><td>Traditional Securitization</td><td>Complex, expensive, lacks transparency</td></tr>
            </table>
          </div>

          <h2>The CPF Solution</h2>
          <div class="section">
            <h3>A Four-Pillar Digital Ecosystem</h3>
            <p>CPF creates a transparent, efficient marketplace connecting all stakeholders through specialized digital portals:</p>
            
            <table>
              <tr><th>Stakeholder</th><th>Role</th><th>Benefit</th></tr>
              <tr><td><strong>Suppliers</strong></td><td>Submit verified invoices</td><td>Immediate liquidity (days, not months)</td></tr>
              <tr><td><strong>SPV</strong></td><td>Due diligence & purchase</td><td>Sovereign-grade investment returns</td></tr>
              <tr><td><strong>MDA</strong></td><td>Verify & authorize claims</td><td>Improved contractor relationships</td></tr>
              <tr><td><strong>Treasury</strong></td><td>Certify & guarantee</td><td>Reduced fiscal pressure</td></tr>
            </table>
          </div>

          <h2>Transaction Lifecycle</h2>
          <div class="section">
            <div class="workflow">
              <div class="workflow-step">
                <div class="number">1</div>
                <div class="title">Supplier</div>
                <div class="subtitle">Bill Submission</div>
              </div>
              <div class="workflow-arrow">→</div>
              <div class="workflow-step">
                <div class="number">2</div>
                <div class="title">SPV</div>
                <div class="subtitle">Due Diligence</div>
              </div>
              <div class="workflow-arrow">→</div>
              <div class="workflow-step">
                <div class="number">3</div>
                <div class="title">MDA</div>
                <div class="subtitle">Verification</div>
              </div>
              <div class="workflow-arrow">→</div>
              <div class="workflow-step">
                <div class="number">4</div>
                <div class="title">Treasury</div>
                <div class="subtitle">Certification</div>
              </div>
              <div class="workflow-arrow">→</div>
              <div class="workflow-step">
                <div class="number">5</div>
                <div class="title">Blockchain</div>
                <div class="subtitle">Settlement</div>
              </div>
            </div>
          </div>

          <h2>Financial Model</h2>
          <div class="section">
            <h3>Discount Rate Structure</h3>
            <table>
              <tr><th>Risk Profile</th><th>Discount Rate</th><th>Effective Yield</th></tr>
              <tr><td>AAA (Treasury Certified)</td><td>5-8%</td><td>6-10% annualized</td></tr>
              <tr><td>AA (MDA Approved)</td><td>8-12%</td><td>10-15% annualized</td></tr>
              <tr><td>A (Under Review)</td><td>12-18%</td><td>15-22% annualized</td></tr>
            </table>

            <h3>Example Transaction</h3>
            <table>
              <tr><th>Component</th><th>Value</th></tr>
              <tr><td>Invoice Amount</td><td>₦100,000,000</td></tr>
              <tr><td>Discount Rate</td><td>8%</td></tr>
              <tr><td>SPV Purchase Price</td><td>₦92,000,000</td></tr>
              <tr><td>Supplier Receives (Immediate)</td><td>₦92,000,000</td></tr>
              <tr><td>SPV Receives at Maturity</td><td>₦100,000,000</td></tr>
              <tr><td>SPV Profit</td><td>₦8,000,000</td></tr>
            </table>
          </div>

          <h2>Market Opportunity</h2>
          <div class="section">
            <h3>Nigeria Focus</h3>
            <ul>
              <li><strong>Government Contractor Debt:</strong> Estimated ₦5-8 trillion</li>
              <li><strong>Annual Government Procurement:</strong> ₦3+ trillion</li>
              <li><strong>Pension Fund AUM:</strong> ₦18+ trillion (seeking quality investments)</li>
              <li><strong>SME Supplier Base:</strong> 40+ million (majority government contractors)</li>
            </ul>

            <h3>Ghana Expansion</h3>
            <ul>
              <li><strong>Government Contractor Arrears:</strong> GH₢15-20 billion</li>
              <li><strong>Growing Pension Industry:</strong> GH₢50+ billion AUM</li>
              <li><strong>Strong Regulatory Framework:</strong> Bank of Ghana oversight</li>
            </ul>
          </div>

          <h2>Implementation Roadmap</h2>
          <div class="section">
            <div class="roadmap">
              <div class="roadmap-phase current">
                <div class="phase-num">01</div>
                <h4>Proof of Concept</h4>
                <ul>
                  <li>✓ Platform development complete</li>
                  <li>✓ Demo environment operational</li>
                  <li>✓ Stakeholder testing underway</li>
                </ul>
              </div>
              <div class="roadmap-phase">
                <div class="phase-num">02</div>
                <h4>Pilot Program (Q2 2026)</h4>
                <ul>
                  <li>Select 2-3 MDAs for pilot</li>
                  <li>Onboard 10-20 suppliers</li>
                  <li>Process ₦1-5 billion</li>
                </ul>
              </div>
              <div class="roadmap-phase">
                <div class="phase-num">03</div>
                <h4>National Rollout (Q4 2026)</h4>
                <ul>
                  <li>All federal MDAs onboarded</li>
                  <li>Multiple SPV partnerships</li>
                  <li>Full banking integration</li>
                </ul>
              </div>
              <div class="roadmap-phase">
                <div class="phase-num">04</div>
                <h4>Regional Expansion (2027)</h4>
                <ul>
                  <li>Ghana launch</li>
                  <li>West Africa expansion</li>
                  <li>Multi-currency support</li>
                </ul>
              </div>
            </div>
          </div>

          <h2>Competitive Advantages</h2>
          <div class="section">
            <table>
              <tr><th>Advantage</th><th>Description</th></tr>
              <tr><td>Blockchain Transparency</td><td>Every transaction is immutable and auditable, reducing fraud</td></tr>
              <tr><td>Digital-First Approach</td><td>Paperless processing, real-time updates, mobile-friendly</td></tr>
              <tr><td>Regulatory Compliance</td><td>Built-in KYC/AML, audit-ready documentation</td></tr>
              <tr><td>Investor Confidence</td><td>Sovereign-backed receivables with structured payments</td></tr>
              <tr><td>Supplier Benefits</td><td>Fast liquidity, transparent pricing, no collateral required</td></tr>
            </table>
          </div>

          <h2>Call to Action</h2>
          <div class="section">
            <h3>For Government Partners</h3>
            <ul>
              <li>Designate pilot MDAs</li>
              <li>Facilitate treasury integration</li>
              <li>Provide regulatory support</li>
            </ul>
            
            <h3>For Financial Partners (SPVs)</h3>
            <ul>
              <li>Commit pilot capital (₦5-10 billion)</li>
              <li>Assign dedicated team</li>
              <li>Co-develop risk framework</li>
            </ul>
            
            <h3>For Suppliers</h3>
            <ul>
              <li>Express interest for early access</li>
              <li>Provide feedback on platform</li>
              <li>Participate in pilot program</li>
            </ul>
          </div>

          <div class="footer">
            <div class="footer-logo">
              <div class="footer-logo-icon"></div>
              <strong>CPF Settlement Platform</strong>
            </div>
            <p>© 2026 CPF Settlement Platform. All rights reserved.</p>
            <p>This document is confidential and intended for authorized recipients only.</p>
            <p style="margin-top: 16px; color: #9ca3af;">Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>
      </body>
      </html>
    `);
    
    printWindow.document.close();
    
    // Small delay to ensure styles load, then trigger print
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  const sections = [
    {
      id: 'problem',
      icon: BarChart3,
      title: 'The Problem',
      subtitle: '$2 Trillion Global Challenge',
      content: 'Government payment delays of 6-18 months cause supplier bankruptcy, project abandonment, and economic inefficiency. Traditional solutions like bank factoring have high costs (15-30% discount) and limited availability.'
    },
    {
      id: 'solution',
      icon: Zap,
      title: 'The CPF Solution',
      subtitle: 'Four-Pillar Digital Ecosystem',
      content: 'A transparent digital marketplace connecting Suppliers, SPVs (pension funds), MDAs, and Treasury. Converts government receivables into tradeable, blockchain-secured instruments.'
    },
    {
      id: 'stakeholders',
      icon: Users,
      title: 'Stakeholders',
      subtitle: 'Role-Based Access',
      content: 'Suppliers submit invoices for immediate liquidity. SPVs conduct due diligence and purchase receivables. MDAs verify and authorize claims. Treasury certifies and guarantees payment.'
    },
    {
      id: 'blockchain',
      icon: Lock,
      title: 'Blockchain Settlement',
      subtitle: 'Ethereum Smart Contracts',
      content: 'Tripartite Deed of Assignment with sequential signing. Receivable Notes minted as NFTs for trading. Immutable audit trail ensures transparency and reduces fraud.'
    },
    {
      id: 'market',
      icon: Globe,
      title: 'Market Opportunity',
      subtitle: 'Nigeria & Ghana Focus',
      content: 'Nigeria: ₦5-8T contractor debt, ₦18T+ pension AUM. Ghana: GH₢15-20B arrears, GH₢50B+ pension funds. Scalable to all emerging markets with government payment delays.'
    }
  ];

  const stats = [
    { value: '₦5-8T', label: 'Nigerian Contractor Debt' },
    { value: '6-18', label: 'Months Payment Delay' },
    { value: '₦18T+', label: 'Pension Fund AUM' },
    { value: '92%', label: 'Typical Advance Rate' },
  ];

  const phases = [
    { phase: '1', title: 'Proof of Concept', status: 'current', items: ['Platform complete', 'Demo operational', 'Testing underway'] },
    { phase: '2', title: 'Pilot Program', status: 'upcoming', items: ['2-3 pilot MDAs', '10-20 suppliers', '₦1-5B transactions'] },
    { phase: '3', title: 'National Rollout', status: 'future', items: ['All federal MDAs', 'Banking integration', 'Mobile app launch'] },
    { phase: '4', title: 'Regional Expansion', status: 'future', items: ['Ghana launch', 'West Africa', 'Multi-currency'] },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-600/5 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 opacity-20" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
        </div>

        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between px-6 lg:px-12 py-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
              <Landmark className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
                CPF Settlement
              </h1>
              <p className="text-xs text-neutral-500">Securitization Platform</p>
            </div>
          </div>
          <Link to="/auth">
            <Button variant="outline" className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10 hover:text-amber-300">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Platform
            </Button>
          </Link>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 px-6 lg:px-12 py-16 lg:py-24 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20">
                <FileText className="w-4 h-4 text-amber-400" />
                <span className="text-sm text-amber-400 font-medium">Concept Note 2026</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-display leading-tight text-white">
                Contractor Payment
                <span className="block bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 bg-clip-text text-transparent">
                  Facility (CPF)
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-neutral-300 max-w-xl leading-relaxed">
                Transforming government debt into tradeable, blockchain-secured instruments. 
                Unlocking billions in working capital for suppliers while creating sovereign-grade 
                investment opportunities.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={handleDownload}
                  className="h-14 px-8 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold shadow-lg shadow-amber-500/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Full Document
                </Button>
                <Link to="/auth">
                  <Button 
                    variant="outline"
                    className="h-14 px-8 border-2 border-neutral-700 text-white hover:bg-neutral-800 hover:border-neutral-600 font-semibold transition-all duration-300"
                  >
                    View Live Demo
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats Card */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-amber-600/5 rounded-3xl blur-xl"></div>
              <div className="relative bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 rounded-3xl p-8 space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-neutral-800">
                  <TrendingUp className="w-6 h-6 text-amber-400" />
                  <h3 className="text-lg font-semibold text-white">Market Opportunity</h3>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="space-y-1">
                      <p className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
                        {stat.value}
                      </p>
                      <p className="text-sm text-neutral-400">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Sections */}
      <div className="px-6 lg:px-12 py-16 lg:py-24 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            How CPF <span className="text-amber-400">Works</span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            A comprehensive solution addressing the $2 trillion global challenge of government payment delays
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <div 
              key={section.id}
              className={cn(
                "group relative bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:border-amber-500/50 hover:bg-neutral-900/80",
                activeSection === section.id && "border-amber-500/50 bg-neutral-900/80"
              )}
              onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 group-hover:shadow-lg group-hover:shadow-amber-500/10 transition-all duration-300">
                  <section.icon className="w-6 h-6 text-amber-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">{section.title}</h3>
                  <p className="text-sm text-amber-400/80">{section.subtitle}</p>
                </div>
                <ChevronDown className={cn(
                  "w-5 h-5 text-neutral-500 transition-transform duration-300",
                  activeSection === section.id && "rotate-180 text-amber-400"
                )} />
              </div>
              <div className={cn(
                "overflow-hidden transition-all duration-300",
                activeSection === section.id ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              )}>
                <p className="text-neutral-400 text-sm leading-relaxed pt-2 border-t border-neutral-800">
                  {section.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Workflow Diagram */}
      <div className="px-6 lg:px-12 py-16 lg:py-24 bg-gradient-to-b from-neutral-900/50 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Transaction <span className="text-amber-400">Lifecycle</span>
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              From bill submission to blockchain settlement in five streamlined phases
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500/20 via-amber-500/40 to-amber-500/20 -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[
                { icon: Users, title: 'Supplier', subtitle: 'Bill Submission', step: '01' },
                { icon: Briefcase, title: 'SPV', subtitle: 'Due Diligence & Offer', step: '02' },
                { icon: Building2, title: 'MDA', subtitle: 'Verification', step: '03' },
                { icon: Landmark, title: 'Treasury', subtitle: 'Certification', step: '04' },
                { icon: Lock, title: 'Blockchain', subtitle: 'Settlement', step: '05' },
              ].map((item, index) => (
                <div key={index} className="relative">
                  <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-center hover:border-amber-500/30 transition-all duration-300 group">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                      {item.step}
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-amber-500/10 transition-all duration-300">
                      <item.icon className="w-8 h-8 text-amber-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-neutral-400">{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Roadmap */}
      <div className="px-6 lg:px-12 py-16 lg:py-24 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Implementation <span className="text-amber-400">Roadmap</span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            From proof of concept to regional expansion across West Africa
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {phases.map((phase, index) => (
            <div 
              key={index} 
              className={cn(
                "relative bg-neutral-900/50 border rounded-2xl p-6 transition-all duration-300",
                phase.status === 'current' 
                  ? "border-amber-500/50 bg-amber-500/5" 
                  : "border-neutral-800 hover:border-neutral-700"
              )}
            >
              {phase.status === 'current' && (
                <div className="absolute -top-3 -right-3 bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                  CURRENT
                </div>
              )}
              <div className="text-4xl font-bold text-amber-500/30 mb-4">0{phase.phase}</div>
              <h3 className="text-lg font-semibold text-white mb-4">{phase.title}</h3>
              <ul className="space-y-2">
                {phase.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center gap-2 text-sm text-neutral-400">
                    <CheckCircle2 className={cn(
                      "w-4 h-4 flex-shrink-0",
                      phase.status === 'current' ? "text-amber-400" : "text-neutral-600"
                    )} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-6 lg:px-12 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-900/50 border border-neutral-800 rounded-3xl p-8 lg:p-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
            <div className="relative z-10 text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mx-auto">
                <Shield className="w-4 h-4 text-amber-400" />
                <span className="text-sm text-amber-400 font-medium">Partnership Opportunity</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white">
                Ready to <span className="text-amber-400">Transform</span> Government Payments?
              </h2>
              <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
                Join us in revolutionizing how governments pay their contractors. 
                Partner with CPF to unlock billions in working capital.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Button 
                  onClick={handleDownload}
                  className="h-14 px-8 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold shadow-lg shadow-amber-500/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Concept Note
                </Button>
                <Link to="/auth">
                  <Button 
                    variant="outline"
                    className="h-14 px-8 border-2 border-amber-500/30 text-amber-400 hover:bg-amber-500/10 font-semibold transition-all duration-300"
                  >
                    Access Demo Platform
                    <ExternalLink className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 lg:px-12 py-8 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center">
              <Landmark className="w-5 h-5 text-black" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">CPF Settlement Platform</p>
              <p className="text-xs text-neutral-500">Government Debt Securitization</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm text-neutral-500">
            <Coins className="w-4 h-4 text-amber-500/50" />
            <span>© 2026 CPF Settlement Platform. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ConceptNotePage;
