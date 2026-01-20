import jsPDF from 'jspdf';

// Premium colors
const GOLD = '#f59e0b';
const DARK = '#0a0a0a';
const GRAY = '#6b7280';
const LIGHT_GRAY = '#e5e7eb';

export const generateConceptNotePDF = () => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  let y = margin;

  // Helper functions
  const addPage = () => {
    doc.addPage();
    y = margin;
  };

  const checkPageBreak = (requiredSpace: number) => {
    if (y + requiredSpace > pageHeight - margin) {
      addPage();
      return true;
    }
    return false;
  };

  const drawGoldLine = (yPos: number, width: number = contentWidth) => {
    doc.setDrawColor(245, 158, 11);
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, margin + width, yPos);
  };

  // ============ COVER PAGE ============
  // Dark background
  doc.setFillColor(10, 10, 10);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Gold accent rectangle at top
  doc.setFillColor(245, 158, 11);
  doc.rect(0, 0, pageWidth, 4, 'F');

  // Logo placeholder (gold square)
  const logoSize = 20;
  const logoX = (pageWidth - logoSize) / 2;
  doc.setFillColor(245, 158, 11);
  doc.roundedRect(logoX, 60, logoSize, logoSize, 4, 4, 'F');

  // Title
  doc.setTextColor(245, 158, 11);
  doc.setFontSize(36);
  doc.setFont('helvetica', 'bold');
  doc.text('Receivables Securitisation', pageWidth / 2, 105, { align: 'center' });
  doc.text('Origination (RSO)', pageWidth / 2, 120, { align: 'center' });

  // Subtitle
  doc.setTextColor(163, 163, 163);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  doc.text('Malipo Polepole ya Pending Bills', pageWidth / 2, 140, { align: 'center' });

  // Badge
  doc.setFillColor(245, 158, 11, 0.1);
  doc.setDrawColor(245, 158, 11);
  doc.roundedRect(pageWidth / 2 - 35, 155, 70, 10, 5, 5, 'S');
  doc.setTextColor(245, 158, 11);
  doc.setFontSize(10);
  doc.text('Concept Note • January 2026', pageWidth / 2, 162, { align: 'center' });

  // Footer on cover
  doc.setTextColor(115, 115, 115);
  doc.setFontSize(10);
  doc.text('Trade Receivables Discounting System for Kenya', pageWidth / 2, pageHeight - 40, { align: 'center' });
  doc.text('Confidential Document • For Authorized Recipients Only', pageWidth / 2, pageHeight - 32, { align: 'center' });

  // ============ PAGE 2: EXECUTIVE SUMMARY ============
  addPage();

  // Header
  doc.setFillColor(255, 251, 235);
  doc.rect(margin, y, contentWidth, 50, 'F');
  doc.setFillColor(245, 158, 11);
  doc.rect(margin, y, 3, 50, 'F');

  doc.setTextColor(146, 64, 14);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Executive Summary', margin + 10, y + 12);

  doc.setTextColor(64, 64, 64);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const execSummary = 'The Receivables Securitisation Origination (RSO) Platform is a revolutionary Trade Receivables Discounting System inspired by India\'s TReDS framework. It addresses Kenya\'s KES 500 billion+ pending bills crisis by creating a digital marketplace that converts government receivables into tradeable, blockchain-secured instruments. The platform operates under Capital Markets Authority regulations, connecting suppliers seeking immediate liquidity with institutional investors including pension funds with over KES 1.8 trillion in assets under management.';
  const splitExec = doc.splitTextToSize(execSummary, contentWidth - 20);
  doc.text(splitExec, margin + 10, y + 24);

  y += 65;

  // Stats Grid
  const stats = [
    { value: 'KES 500B+', label: 'County Pending Bills' },
    { value: '47', label: 'County Governments' },
    { value: 'KES 1.8T+', label: 'Pension Fund AUM' },
    { value: 'KES 260B', label: 'Annual OSR Potential' }
  ];

  const statWidth = (contentWidth - 15) / 2;
  const statHeight = 25;

  stats.forEach((stat, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const x = margin + (col * (statWidth + 5));
    const statY = y + (row * (statHeight + 5));

    doc.setFillColor(249, 250, 251);
    doc.setDrawColor(229, 231, 235);
    doc.roundedRect(x, statY, statWidth, statHeight, 3, 3, 'FD');

    doc.setTextColor(245, 158, 11);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(stat.value, x + statWidth / 2, statY + 12, { align: 'center' });

    doc.setTextColor(107, 114, 128);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(stat.label, x + statWidth / 2, statY + 20, { align: 'center' });
  });

  y += 65;

  // Section: The Problem
  doc.setTextColor(26, 26, 26);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('The Problem', margin, y);
  drawGoldLine(y + 3);
  y += 15;

  doc.setTextColor(64, 64, 64);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const problemText = 'Kenyan county governments owe over KES 500 billion to contractors, with payment cycles extending 6-18 months. Counties collect less than 40% of their Own Source Revenue potential. The Inter-Governmental Budget and Economic Council reports systemic causes including unrealistic revenue projections, late disbursement of equitable share, and failure to prioritize pending bills in budgets.';
  const splitProblem = doc.splitTextToSize(problemText, contentWidth);
  doc.text(splitProblem, margin, y);
  y += 25;

  // Problem table
  const problemData = [
    ['Bank Factoring', 'High discount rates (15-30%), limited to formal sector'],
    ['Treasury Bonds', 'Not accessible for pending bill liquidation'],
    ['Budget Allocation', 'Insufficient fiscal space, competing priorities'],
    ['Direct Payment', 'Fiscally impossible in constrained environments']
  ];

  // Table header
  doc.setFillColor(26, 26, 26);
  doc.rect(margin, y, contentWidth, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Current Approach', margin + 5, y + 5.5);
  doc.text('Limitation', margin + 55, y + 5.5);
  y += 8;

  // Table rows
  problemData.forEach((row, index) => {
    if (index % 2 === 0) {
      doc.setFillColor(249, 250, 251);
      doc.rect(margin, y, contentWidth, 8, 'F');
    }
    doc.setTextColor(64, 64, 64);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(row[0], margin + 5, y + 5.5);
    doc.text(row[1], margin + 55, y + 5.5);
    y += 8;
  });

  y += 10;

  checkPageBreak(100);

  doc.setTextColor(26, 26, 26);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('The RSO Solution', margin, y);
  drawGoldLine(y + 3);
  y += 15;

  doc.setTextColor(64, 64, 64);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const solutionText = 'Inspired by India\'s Trade Receivables Discounting System (TReDS), RSO creates a transparent marketplace under Capital Markets Authority regulations, connecting all stakeholders through specialized digital portals:';
  doc.text(solutionText, margin, y);
  y += 12;

  // Stakeholder table
  const stakeholderData = [
    ['Suppliers (Originators)', 'Submit verified invoices', 'Immediate liquidity (days, not months)'],
    ['SPV (Issuer)', 'Due diligence & purchase', 'Sovereign-grade investment returns'],
    ['MDA (Procuring Entity)', 'Verify & authorize claims', 'Improved contractor relationships'],
    ['Treasury (Obligor)', 'Certify & guarantee', 'Reduced fiscal pressure, better credit']
  ];

  // Table header
  doc.setFillColor(26, 26, 26);
  doc.rect(margin, y, contentWidth, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Stakeholder', margin + 5, y + 5.5);
  doc.text('Role', margin + 40, y + 5.5);
  doc.text('Benefit', margin + 100, y + 5.5);
  y += 8;

  stakeholderData.forEach((row, index) => {
    if (index % 2 === 0) {
      doc.setFillColor(249, 250, 251);
      doc.rect(margin, y, contentWidth, 8, 'F');
    }
    doc.setTextColor(64, 64, 64);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(row[0], margin + 5, y + 5.5);
    doc.text(row[1], margin + 40, y + 5.5);
    doc.text(row[2], margin + 100, y + 5.5);
    y += 8;
  });

  y += 15;

  // Transaction Lifecycle
  checkPageBreak(60);
  
  doc.setTextColor(26, 26, 26);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Transaction Lifecycle', margin, y);
  drawGoldLine(y + 3);
  y += 15;

  // Workflow steps
  const steps = ['Supplier', 'SPV', 'MDA', 'Treasury', 'Blockchain'];
  const stepLabels = ['Bill Submit', 'Due Diligence', 'Verification', 'Certification', 'Settlement'];
  const stepWidth = contentWidth / 5;

  steps.forEach((step, index) => {
    const x = margin + (index * stepWidth) + (stepWidth / 2);
    
    // Circle
    doc.setFillColor(245, 158, 11);
    doc.circle(x, y + 8, 6, 'F');
    
    // Number
    doc.setTextColor(10, 10, 10);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(String(index + 1), x, y + 10, { align: 'center' });
    
    // Arrow (except last)
    if (index < steps.length - 1) {
      doc.setDrawColor(209, 213, 219);
      doc.setLineWidth(0.5);
      doc.line(x + 8, y + 8, x + stepWidth - 8, y + 8);
    }
    
    // Labels
    doc.setTextColor(26, 26, 26);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(step, x, y + 22, { align: 'center' });
    
    doc.setTextColor(107, 114, 128);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.text(stepLabels[index], x, y + 28, { align: 'center' });
  });

  y += 40;

  // ============ FINANCIAL MODEL ============
  checkPageBreak(80);

  doc.setTextColor(26, 26, 26);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Financial Model', margin, y);
  drawGoldLine(y + 3);
  y += 15;

  // Discount rates table
  const ratesData = [
    ['AAA (Treasury Certified)', '5-8%', '6-10% annualized'],
    ['AA (MDA Approved)', '8-12%', '10-15% annualized'],
    ['A (Under Review)', '12-18%', '15-22% annualized']
  ];

  doc.setFillColor(26, 26, 26);
  doc.rect(margin, y, contentWidth, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Risk Profile', margin + 5, y + 5.5);
  doc.text('Discount Rate', margin + 70, y + 5.5);
  doc.text('Effective Yield', margin + 120, y + 5.5);
  y += 8;

  ratesData.forEach((row, index) => {
    if (index % 2 === 0) {
      doc.setFillColor(249, 250, 251);
      doc.rect(margin, y, contentWidth, 8, 'F');
    }
    doc.setTextColor(64, 64, 64);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(row[0], margin + 5, y + 5.5);
    doc.text(row[1], margin + 70, y + 5.5);
    doc.text(row[2], margin + 120, y + 5.5);
    y += 8;
  });

  y += 10;

  // Example transaction
  doc.setTextColor(26, 26, 26);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Example Transaction', margin, y);
  y += 8;

  const exampleData = [
    ['Invoice Amount', 'KES 100,000,000'],
    ['Discount Rate', '8%'],
    ['SPV Purchase Price', 'KES 92,000,000'],
    ['Supplier Receives (Immediate)', 'KES 92,000,000'],
    ['SPV Receives at Maturity', 'KES 100,000,000'],
    ['SPV Profit', 'KES 8,000,000']
  ];

  exampleData.forEach((row, index) => {
    if (index % 2 === 0) {
      doc.setFillColor(255, 251, 235);
      doc.rect(margin, y, contentWidth, 7, 'F');
    }
    doc.setTextColor(64, 64, 64);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(row[0], margin + 5, y + 5);
    doc.setFont('helvetica', 'bold');
    doc.text(row[1], margin + contentWidth - 5, y + 5, { align: 'right' });
    y += 7;
  });

  // ============ PAGE 4: MARKET & ROADMAP ============
  addPage();

  // Market Opportunity
  doc.setTextColor(26, 26, 26);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Market Opportunity', margin, y);
  drawGoldLine(y + 3);
  y += 15;

  // Kenya
  doc.setTextColor(26, 26, 26);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Kenya Focus (47 County Governments)', margin, y);
  y += 8;

  const kenyaPoints = [
    '• County Pending Bills: KES 500+ billion (Auditor General reports)',
    '• OSR Potential: KES 260 billion annually (CRA Tax Gap Analysis)',
    '• Pension Fund AUM: KES 1.8+ trillion (seeking quality investments)',
    '• Regulatory Framework: CMA Asset-Backed Securities Regulations 2007'
  ];

  doc.setTextColor(64, 64, 64);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  kenyaPoints.forEach(point => {
    doc.text(point, margin + 5, y);
    y += 6;
  });

  y += 8;

  // Legal Framework
  doc.setTextColor(26, 26, 26);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Legal & Regulatory Framework', margin, y);
  y += 8;

  const legalPoints = [
    '• Capital Markets (Asset Backed Securities) Regulations 2007',
    '• CMA Policy Guidance Note on ABS 2017',
    '• Public Finance Management Act (PFMA) Section 144',
    '• Central Bank of Kenya Settlement Infrastructure'
  ];

  doc.setTextColor(64, 64, 64);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  legalPoints.forEach(point => {
    doc.text(point, margin + 5, y);
    y += 6;
  });

  y += 15;

  // Implementation Roadmap
  doc.setTextColor(26, 26, 26);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Implementation Roadmap', margin, y);
  drawGoldLine(y + 3);
  y += 15;

  const phases = [
    { num: '01', title: 'Proof of Concept', status: 'CURRENT', items: ['✓ Platform complete', '✓ Demo operational', '✓ CMA consultation'] },
    { num: '02', title: 'Pilot Program (Q2 2026)', status: '', items: ['Select 2-3 pilot counties', 'Onboard 50-100 suppliers', 'Process KES 1-5 billion'] },
    { num: '03', title: 'National Rollout (Q4 2026)', status: '', items: ['All 47 counties', 'CBK settlement', 'Pension fund integration'] },
    { num: '04', title: 'Regional Expansion (2027)', status: '', items: ['Uganda launch', 'EAC expansion', 'Multi-currency support'] }
  ];

  const phaseWidth = (contentWidth - 10) / 2;
  const phaseHeight = 35;

  phases.forEach((phase, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const x = margin + (col * (phaseWidth + 10));
    const phaseY = y + (row * (phaseHeight + 8));

    // Box
    if (phase.status === 'CURRENT') {
      doc.setFillColor(255, 251, 235);
      doc.setDrawColor(245, 158, 11);
    } else {
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(229, 231, 235);
    }
    doc.roundedRect(x, phaseY, phaseWidth, phaseHeight, 3, 3, 'FD');

    // Phase number
    doc.setTextColor(phase.status === 'CURRENT' ? 245 : 229, phase.status === 'CURRENT' ? 158 : 231, phase.status === 'CURRENT' ? 11 : 235);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text(phase.num, x + 5, phaseY + 10);

    // Current badge
    if (phase.status === 'CURRENT') {
      doc.setFillColor(245, 158, 11);
      doc.roundedRect(x + phaseWidth - 25, phaseY + 3, 22, 6, 3, 3, 'F');
      doc.setTextColor(10, 10, 10);
      doc.setFontSize(6);
      doc.text('CURRENT', x + phaseWidth - 14, phaseY + 7, { align: 'center' });
    }

    // Title
    doc.setTextColor(26, 26, 26);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(phase.title, x + 5, phaseY + 18);

    // Items
    doc.setTextColor(107, 114, 128);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    phase.items.forEach((item, itemIndex) => {
      doc.text(item, x + 5, phaseY + 25 + (itemIndex * 4));
    });
  });

  y += (phaseHeight * 2) + 25;

  // Competitive Advantages
  checkPageBreak(60);

  doc.setTextColor(26, 26, 26);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Competitive Advantages', margin, y);
  drawGoldLine(y + 3);
  y += 12;

  const advantages = [
    { title: 'TReDS-Inspired Framework', desc: 'Based on India\'s proven Trade Receivables Discounting System' },
    { title: 'Blockchain Transparency', desc: 'Every transaction is immutable and auditable, reducing fraud' },
    { title: 'CMA Regulatory Compliance', desc: 'Structured under Asset-Backed Securities Regulations 2007' },
    { title: 'Institutional Investors', desc: 'Access to KES 1.8T+ pension fund AUM seeking quality assets' },
    { title: 'Supplier Benefits', desc: 'Fast liquidity, transparent pricing, no collateral required' }
  ];

  advantages.forEach((adv, index) => {
    doc.setFillColor(245, 158, 11);
    doc.circle(margin + 3, y + 2, 2, 'F');
    
    doc.setTextColor(26, 26, 26);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(adv.title, margin + 10, y + 4);
    
    doc.setTextColor(107, 114, 128);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(adv.desc, margin + 10, y + 10);
    
    y += 14;
  });

  // ============ FOOTER ON LAST PAGE ============
  y = pageHeight - 30;
  doc.setDrawColor(229, 231, 235);
  doc.setLineWidth(0.5);
  doc.line(margin, y, margin + contentWidth, y);

  doc.setFillColor(245, 158, 11);
  doc.roundedRect(margin, y + 5, 8, 8, 2, 2, 'F');

  doc.setTextColor(26, 26, 26);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Receivables Securitisation Origination', margin + 12, y + 11);

  doc.setTextColor(107, 114, 128);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('© 2026 Receivables Securitisation Origination. All rights reserved.', pageWidth / 2, y + 18, { align: 'center' });
  doc.text('This document is confidential and intended for authorized recipients only.', pageWidth / 2, y + 23, { align: 'center' });

  // Save the PDF
  doc.save('RSO_Concept_Note_2026.pdf');
};
