export interface Fund {
  name: string;
  category: 'Small Cap' | 'Mid Cap' | 'Large Cap' | 'Flexi Cap' | 'Debt' | 'ELSS' | 'Other';
  amount: number;
  expenseRatio?: number;
  isRegular?: boolean;
}

export interface Portfolio {
  funds: Fund[];
  emergencyFundMonths: number;
  monthlyExpenses: number;
  salary?: number;
}

export interface AnalysisResult {
  healthScore: number;
  scoreSummary: string;
  findings: {
    overlapAlert: string;
    feeLeakage: string;
    safetyGap: string;
  };
  actionPlan: {
    switch: string;
    harvest: string;
    rebalance: string;
  };
  impactMath: {
    annualSavings: number;
    taxSaved: number;
  };
  fireTracker: {
    fiNumber: number;
    currentProgress: number;
    yearsToFI: number;
  };
  strategicProtocol: {
    immediate: string;
    shortTerm: string;
    longTerm: string;
  };
}
