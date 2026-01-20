# Receivables Securitisation Origination (RSO)
## Malipo Polepole ya Pending Bills - Trade Receivables Discounting System

### Concept Note – January 2026

---

## Executive Summary

The **Receivables Securitisation Origination (RSO) Platform** is a revolutionary Trade Receivables Discounting System inspired by India's TReDS framework. It addresses Kenya's KES 500 billion+ pending bills crisis by creating a digital marketplace that converts government receivables into tradeable, blockchain-secured instruments under Capital Markets Authority regulations.

**Core Value Proposition:**
- **For Suppliers (Originators):** Immediate liquidity instead of waiting 6-18 months for government payment
- **For Governments (Obligors):** Reduced fiscal pressure and improved contractor relationships
- **For Investors (SPVs):** Access to high-quality, government-backed receivables with predictable returns

---

## The Problem

### Government Payment Delays: A KES 500 Billion Kenyan Crisis

Kenyan county governments owe over KES 500 billion to contractors, with payment cycles extending 6-18 months. According to CRA Tax Gap Analysis, counties collect less than 40% of their Own Source Revenue potential. This creates:

1. **Supplier Cash Flow Crisis**
   - Small and medium enterprises (SMEs) face bankruptcy
   - Contractors abandon government projects
   - Critical infrastructure suffers delays

2. **Economic Inefficiency**
   - Working capital trapped in receivables
   - Higher bid prices to compensate for payment delays
   - Reduced competition for government contracts

3. **Fiscal Pressure**
   - Accumulating arrears create political tension
   - Difficulty in budgetary planning
   - Damaged government credibility

### Current Solutions Are Inadequate

| Approach | Limitation |
|----------|-----------|
| Bank Factoring | High discount rates (15-30%), limited to formal sector |
| Treasury Bonds | Not accessible for pending bill liquidation |
| Budget Allocation | Insufficient fiscal space, competing priorities |
| Direct Payment | Fiscally impossible in constrained environments |

---

## The RSO Solution

### A TReDS-Inspired Digital Ecosystem

RSO creates a transparent, efficient marketplace under Capital Markets Authority regulations, connecting all stakeholders through specialized digital portals:

```
┌─────────────────────────────────────────────────────────────────┐
│              RSO PLATFORM - TRADE RECEIVABLES SYSTEM            │
├─────────────┬─────────────┬─────────────┬─────────────┬────────┤
│  SUPPLIER   │     SPV     │     MDA     │  TREASURY   │ ADMIN  │
│ (Originator)│  (Issuer)   │ (Procuring  │  (Obligor)  │ PORTAL │
│   PORTAL    │   PORTAL    │   Entity)   │   PORTAL    │        │
├─────────────┴─────────────┴─────────────┴─────────────┴────────┤
│              BLOCKCHAIN SETTLEMENT LAYER (Ethereum)             │
├─────────────────────────────────────────────────────────────────┤
│                    SECURE DATABASE (Supabase)                   │
└─────────────────────────────────────────────────────────────────┘
```

### Stakeholder Roles

#### 1. Suppliers (Originators)
- Submit verified invoices for completed government work
- Receive immediate liquidity at competitive discount rates
- Track payment status in real-time

#### 2. Special Purpose Vehicle (SPV/Issuer)
- Financial intermediary (e.g., pension fund investment arm)
- Conducts due diligence on submitted bills
- Makes purchase offers to suppliers
- Issues receivable notes to investors

#### 3. Ministries, Departments & Agencies (Procuring Entities)
- Verify and authorize contractor claims
- Confirm work completion and invoice authenticity
- Approve debt assignment to SPV

#### 4. National Treasury (Obligor)
- Final certification of government obligation
- Sets payment terms and schedules
- Provides payment assurance to SPV on maturity

---

## Regulatory Framework

### Kenya Capital Markets Compliance

The RSO Platform operates under Kenya's established regulatory framework:

1. **Capital Markets (Asset Backed Securities) Regulations 2007**
   - Framework for securitization transactions
   - SPV structuring requirements
   - Investor protection measures

2. **CMA Policy Guidance Note on ABS 2017**
   - Asset origination requirements (Paragraph 15.01)
   - Documentation standards
   - Sale and assignment procedures

3. **Public Finance Management Act (PFMA)**
   - Section 144: Government securities issuance
   - Section 142: Short-term borrowing provisions
   - Regulation 177(2): Manner of borrowing

4. **Central Bank of Kenya Settlement**
   - Integration with CBK Internet Banking System
   - Settlement infrastructure compliance
   - Clearing and payment mechanisms

---

## Transaction Lifecycle

### Phase 1: Bill Submission
```
Supplier completes government contract
    ↓
Uploads invoice + supporting documents
    ↓
System validates and assigns unique ID
```

### Phase 2: SPV Due Diligence & Offer
```
SPV reviews bill and documentation
    ↓
Performs risk assessment
    ↓
Makes purchase offer (e.g., 92% of face value)
    ↓
Supplier accepts/negotiates
```

### Phase 3: MDA Verification
```
MDA (Procuring Entity) receives notification
    ↓
Verifies work completion
    ↓
Confirms invoice authenticity
    ↓
Issues Letter of Authorization
```

### Phase 4: Treasury Certification
```
National Treasury reviews MDA authorization
    ↓
Validates against budget allocation
    ↓
Sets payment schedule (quarters)
    ↓
Issues Certificate of Indebtedness
```

### Phase 5: Blockchain Settlement
```
Tripartite Deed of Assignment created
    ↓
Sequential signing: Assignor → Procuring Entity → Servicing Agent
    ↓
Smart contract executed on Ethereum
    ↓
Receivable Note NFT minted for trading
```

---

## Technology Architecture

### Blockchain Layer
- **Network:** Ethereum (Sepolia Testnet for POC, Mainnet for production)
- **Smart Contracts:** Tripartite Deed of Assignment
- **Digital Assets:** Receivable Notes as ERC-721 NFTs
- **Benefits:** Immutability, transparency, automated execution

### Security Features
- **Row-Level Security (RLS):** Role-based data access
- **Digital Signatures:** Cryptographic verification
- **Audit Trail:** Complete transaction history
- **Multi-Party Verification:** Consensus-based approval

### Integration Capabilities
- RESTful APIs for external systems
- Webhook notifications
- Document verification services
- CBK Internet Banking integration

---

## Financial Model

### Discount Rate Structure

| Risk Profile | Discount Rate | Effective Yield |
|-------------|---------------|-----------------|
| AAA (Treasury Certified) | 5-8% | 6-10% annualized |
| AA (MDA Approved) | 8-12% | 10-15% annualized |
| A (Under Review) | 12-18% | 15-22% annualized |

### Revenue Streams

1. **Transaction Fees:** 0.5-1% per successful transaction
2. **Platform Subscription:** Annual fees for institutional users
3. **Premium Features:** Enhanced analytics, priority processing
4. **Integration Fees:** API access and custom integrations

### Example Transaction

| Component | Value |
|-----------|-------|
| Invoice Amount | KES 100,000,000 |
| Discount Rate | 8% |
| SPV Purchase Price | KES 92,000,000 |
| Supplier Receives | KES 92,000,000 (immediate) |
| SPV Receives at Maturity | KES 100,000,000 |
| SPV Profit | KES 8,000,000 |
| Government Pays | KES 100,000,000 (over scheduled quarters) |

---

## Market Opportunity

### Kenya Focus (47 County Governments)

- **County Pending Bills:** KES 500+ billion (Auditor General reports)
- **OSR Potential:** KES 260 billion annually (CRA Tax Gap Analysis 2022)
- **Pension Fund AUM:** KES 1.8+ trillion (seeking quality investments)
- **SME Supplier Base:** 7+ million businesses

### Key Regulatory Bodies

- Capital Markets Authority (CMA)
- Central Bank of Kenya (CBK)
- Retirement Benefits Authority (RBA)
- Insurance Regulatory Authority (IRA)
- Public Procurement Regulatory Authority (PPRA)

### Regional Expansion

The RSO model is replicable across:
- East African Community (Uganda, Tanzania, Rwanda)
- Sub-Saharan Africa (54 countries)
- Emerging markets globally

---

## Competitive Advantages

1. **TReDS-Inspired Framework**
   - Based on India's proven Trade Receivables Discounting System
   - Regulatory precedent for government receivables

2. **Blockchain Transparency**
   - Every transaction is immutable and auditable
   - Reduces fraud and disputes

3. **CMA Regulatory Compliance**
   - Structured under Asset-Backed Securities Regulations 2007
   - Investor protection framework

4. **Institutional Investors**
   - Access to KES 1.8T+ pension fund AUM
   - Structured payment schedules
   - Tradeable digital assets

5. **Supplier Benefits**
   - Fast liquidity (days, not months)
   - Transparent pricing
   - No collateral required

---

## Implementation Roadmap

### Phase 1: Proof of Concept (Current)
- ✅ Platform development complete
- ✅ Demo environment operational
- ✅ CMA consultation initiated
- 🔄 Regulatory engagement underway

### Phase 2: Pilot Program (Q2 2026)
- Select 2-3 pilot counties
- Onboard 50-100 verified suppliers
- Process KES 1-5 billion in transactions
- Integrate with one SPV partner

### Phase 3: National Rollout (Q4 2026)
- All 47 county governments onboarded
- Multiple SPV partnerships
- CBK settlement integration
- Pension fund participation

### Phase 4: Regional Expansion (2027)
- Uganda launch
- EAC market expansion
- Cross-border transaction support
- Multi-currency capability

---

## Risk Management

| Risk | Mitigation |
|------|-----------|
| Non-payment by Government | Treasury certification ensures budget allocation |
| Fraudulent Claims | Multi-party verification, MDA authorization |
| Technology Failure | Cloud-hosted, redundant infrastructure |
| Regulatory Changes | Close engagement with CMA, CBK, National Treasury |
| Market Adoption | Phased rollout, county government partnerships |

---

## Governance Structure

### Advisory Board
- Government representatives (National Treasury, CoG)
- Financial sector experts
- Technology advisors
- Legal/regulatory counsel

### Operational Partners
- **Technology:** Lovable Cloud Infrastructure
- **Blockchain:** Ethereum Foundation
- **Banking:** Partner commercial banks
- **Legal:** Specialized financial law firms

---

## Call to Action

### For Government Partners
- Designate pilot counties
- Facilitate National Treasury integration
- Provide regulatory support

### For Financial Partners (SPVs)
- Commit pilot capital (KES 5-10 billion)
- Assign dedicated team
- Co-develop risk framework

### For Suppliers
- Express interest for early access
- Provide feedback on platform
- Participate in pilot program

---

## Contact Information

**RSO Platform - Receivables Securitisation Origination**

For partnership inquiries and demonstration requests, please contact the project team.

---

*© 2026 RSO Platform. All rights reserved.*
*This document is confidential and intended for authorized recipients only.*
