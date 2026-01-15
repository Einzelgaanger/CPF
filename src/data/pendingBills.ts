export interface PendingBillRange {
  range: string;
  rangeMin: number;
  rangeMax: number;
  numberOfBills: number;
  amountBillion: number;
  cumulativeByNumber: number;
  cumulativeByValue: number;
  percentByNumber: number;
  percentByValue: number;
}

export const pendingBillsData: PendingBillRange[] = [
  {
    range: "1 - 500K",
    rangeMin: 1,
    rangeMax: 500000,
    numberOfBills: 22346,
    amountBillion: 8.37,
    cumulativeByNumber: 22346,
    cumulativeByValue: 8.37,
    percentByNumber: 79,
    percentByValue: 5,
  },
  {
    range: "500K - 1M",
    rangeMin: 500000,
    rangeMax: 1000000,
    numberOfBills: 1595,
    amountBillion: 1.34,
    cumulativeByNumber: 23941,
    cumulativeByValue: 9.70,
    percentByNumber: 85,
    percentByValue: 6,
  },
  {
    range: "1M - 2M",
    rangeMin: 1000000,
    rangeMax: 2000000,
    numberOfBills: 1425,
    amountBillion: 3.00,
    cumulativeByNumber: 25366,
    cumulativeByValue: 12.70,
    percentByNumber: 90,
    percentByValue: 8,
  },
  {
    range: "2M - 5M",
    rangeMin: 2000000,
    rangeMax: 5000000,
    numberOfBills: 1289,
    amountBillion: 6.44,
    cumulativeByNumber: 26655,
    cumulativeByValue: 19.15,
    percentByNumber: 95,
    percentByValue: 12,
  },
  {
    range: "5M - 10M",
    rangeMin: 5000000,
    rangeMax: 10000000,
    numberOfBills: 365,
    amountBillion: 2.52,
    cumulativeByNumber: 27020,
    cumulativeByValue: 21.67,
    percentByNumber: 96,
    percentByValue: 14,
  },
  {
    range: "10M - 50M",
    rangeMin: 10000000,
    rangeMax: 50000000,
    numberOfBills: 640,
    amountBillion: 7.49,
    cumulativeByNumber: 27660,
    cumulativeByValue: 29.15,
    percentByNumber: 98,
    percentByValue: 19,
  },
  {
    range: "50M - 100M",
    rangeMin: 50000000,
    rangeMax: 100000000,
    numberOfBills: 198,
    amountBillion: 10.72,
    cumulativeByNumber: 27858,
    cumulativeByValue: 39.88,
    percentByNumber: 99,
    percentByValue: 26,
  },
  {
    range: "100M - 500M",
    rangeMin: 100000000,
    rangeMax: 500000000,
    numberOfBills: 170,
    amountBillion: 29.27,
    cumulativeByNumber: 28028,
    cumulativeByValue: 69.15,
    percentByNumber: 99,
    percentByValue: 45,
  },
  {
    range: "500M - 1B",
    rangeMin: 500000000,
    rangeMax: 1000000000,
    numberOfBills: 138,
    amountBillion: 40.98,
    cumulativeByNumber: 28166,
    cumulativeByValue: 110.12,
    percentByNumber: 100,
    percentByValue: 71,
  },
  {
    range: "Above 1B",
    rangeMin: 1000000000,
    rangeMax: Infinity,
    numberOfBills: 24,
    amountBillion: 45.04,
    cumulativeByNumber: 28190,
    cumulativeByValue: 155.1,
    percentByNumber: 100,
    percentByValue: 100,
  },
];

export const totalStats = {
  totalBills: 28190,
  totalAmountBillion: 155.1,
  eligibleBills: 25366, // Bills up to KES 2M
  eligibleAmountBillion: 12.70,
};

export interface TransactionStep {
  step: number;
  title: string;
  description: string;
  entity: string;
  entityType: 'supplier' | 'mda' | 'treasury' | 'spv' | 'investor';
  status: 'completed' | 'active' | 'pending';
}

export const transactionSteps: TransactionStep[] = [
  {
    step: 1,
    title: "Receivables Sale Agreement",
    description: "Supplier signs receivables sale agreement to SPV and introduces the SPV to MDA to consent to terms.",
    entity: "Suppliers (Originator)",
    entityType: "supplier",
    status: "completed",
  },
  {
    step: 2,
    title: "MDA Consent",
    description: "MDA consents to the sale, and authorizes NT to debit its budget vote to pay suppliers for the agreed period.",
    entity: "MDAs (Obligor)",
    entityType: "mda",
    status: "completed",
  },
  {
    step: 3,
    title: "Agreement Forward",
    description: "MDA forwards agreement with supplier to NT for implementation.",
    entity: "MDAs (Obligor)",
    entityType: "mda",
    status: "completed",
  },
  {
    step: 4,
    title: "Servicer Agreement",
    description: "NT signs a servicer agreement with SPV, and facilitates SPV to pay supplier.",
    entity: "National Treasury (Fiscal Agent)",
    entityType: "treasury",
    status: "active",
  },
  {
    step: 5,
    title: "Bond Issuance",
    description: "SPV issues the Pending Bills Liquidation Bond.",
    entity: "SPV (Issuer)",
    entityType: "spv",
    status: "pending",
  },
  {
    step: 6,
    title: "Investment Flow",
    description: "Funds raised from investors flow into the SPV.",
    entity: "Investors",
    entityType: "investor",
    status: "pending",
  },
  {
    step: 7,
    title: "Supplier Payment",
    description: "SPV disburses direct payments to suppliers, provides confirmation to NT & MDAs.",
    entity: "SPV (Issuer)",
    entityType: "spv",
    status: "pending",
  },
  {
    step: 8,
    title: "NSE Listing",
    description: "SPV lists the bond on the NSE for Secondary trading providing investor liquidity.",
    entity: "SPV (Issuer)",
    entityType: "spv",
    status: "pending",
  },
  {
    step: 9,
    title: "SPV Settlement",
    description: "NT pays the SPV as per the agreed terms.",
    entity: "National Treasury (Fiscal Agent)",
    entityType: "treasury",
    status: "pending",
  },
];

export interface SampleBill {
  id: string;
  supplier: string;
  mda: string;
  amount: number;
  dueDate: string;
  status: 'verified' | 'pending' | 'processing';
  verificationDate?: string;
}

export const sampleBills: SampleBill[] = [
  {
    id: "PB-2024-001",
    supplier: "Kenyan Building Solutions Ltd",
    mda: "Ministry of Roads & Infrastructure",
    amount: 1850000,
    dueDate: "2024-03-15",
    status: "verified",
    verificationDate: "2024-01-10",
  },
  {
    id: "PB-2024-002",
    supplier: "East Africa Medical Supplies",
    mda: "Ministry of Health",
    amount: 975000,
    dueDate: "2024-02-28",
    status: "verified",
    verificationDate: "2024-01-08",
  },
  {
    id: "PB-2024-003",
    supplier: "Safari Tech Systems",
    mda: "Ministry of ICT",
    amount: 1450000,
    dueDate: "2024-04-01",
    status: "processing",
  },
  {
    id: "PB-2024-004",
    supplier: "Nairobi Furniture Co.",
    mda: "Ministry of Education",
    amount: 680000,
    dueDate: "2024-03-20",
    status: "pending",
  },
  {
    id: "PB-2024-005",
    supplier: "Lake Region Contractors",
    mda: "Ministry of Water",
    amount: 1920000,
    dueDate: "2024-02-15",
    status: "verified",
    verificationDate: "2024-01-12",
  },
  {
    id: "PB-2024-006",
    supplier: "Mombasa Port Services",
    mda: "Kenya Ports Authority",
    amount: 1200000,
    dueDate: "2024-03-30",
    status: "processing",
  },
];
