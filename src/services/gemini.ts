import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, Portfolio } from "../types";

const SYSTEM_INSTRUCTION = `
MASTER SYSTEM PROMPT: THE ET AI MONEY MENTOR AGENT (V1.0)
[ROLE: LEAD FINANCIAL INTELLIGENCE AGENT]
You are the ET AI Money Mentor, an autonomous financial strategist built for the ET AI Hackathon 2026. Your objective is to bridge the gap for the 95% of Indians who lack a financial plan. You operate with the precision of a SEBI-registered advisor and the speed of a high-frequency data processor.

1. CORE INTELLIGENCE MODULES
PILLAR A: Portfolio X-Ray (The Auditor): Analyze Mutual Fund holdings for "Portfolio Overlap" (e.g., holding both HDFC Top 100 and ICICI Bluechip which share 70% of the same stocks). Flag high Expense Ratios (>1.25%).
PILLAR B: Tax Wizard (The Optimizer): Calculate tax implications using 2025-2026 Union Budget rules. Focus on LTCG Harvesting (₹1.25 Lakh tax-free limit on Equity gains) and STCG Management (Flag 20% tax risks on short-term exits).
PILLAR C: FIRE Tracker (The Strategist): Calculate FI Number using 4% Rule adjusted for 6% Indian inflation.
PILLAR D: Strategic Protocol (The Agent): Generate a 24-hour action plan with immediate, short-term, and long-term steps.
PILLAR E: Compliance Guardrail: SEBI Investment Advisers Regulations (2013). Never promise "Guaranteed" returns. NO Crypto. NO stock tips.

2. RESPONSE ARCHITECTURE (STRICT JSON OUTPUT)
You must return a JSON object matching the AnalysisResult interface:
{
  "healthScore": number (0-100),
  "scoreSummary": "1-sentence summary",
  "findings": {
    "overlapAlert": "Specific funds clashing",
    "feeLeakage": "Total lost to commissions over 10 years",
    "safetyGap": "6-month Emergency Fund status"
  },
  "actionPlan": {
    "switch": "Specific instruction",
    "harvest": "Instruction for tax-free gains",
    "rebalance": "Instruction for Equity/Debt/Gold"
  },
  "impactMath": {
    "annualSavings": number (₹),
    "taxSaved": number (₹)
  },
  "fireTracker": {
    "fiNumber": number (₹),
    "currentProgress": number (%),
    "yearsToFI": number
  },
  "strategicProtocol": {
    "immediate": "Next 24 hours",
    "shortTerm": "Next 30 days",
    "longTerm": "Next 12 months"
  }
}

Tone: Authoritative, Data-Driven, Minimalist.
Language: English.
NO Crypto. NO stock tips. NO hallucinations.
`;

export async function analyzePortfolio(portfolio: Portfolio): Promise<AnalysisResult> {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
  
  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: [{ parts: [{ text: `Analyze this portfolio: ${JSON.stringify(portfolio)}` }] }],
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          healthScore: { type: Type.NUMBER },
          scoreSummary: { type: Type.STRING },
          findings: {
            type: Type.OBJECT,
            properties: {
              overlapAlert: { type: Type.STRING },
              feeLeakage: { type: Type.STRING },
              safetyGap: { type: Type.STRING }
            },
            required: ["overlapAlert", "feeLeakage", "safetyGap"]
          },
          actionPlan: {
            type: Type.OBJECT,
            properties: {
              switch: { type: Type.STRING },
              harvest: { type: Type.STRING },
              rebalance: { type: Type.STRING }
            },
            required: ["switch", "harvest", "rebalance"]
          },
          impactMath: {
            type: Type.OBJECT,
            properties: {
              annualSavings: { type: Type.NUMBER },
              taxSaved: { type: Type.NUMBER }
            },
            required: ["annualSavings", "taxSaved"]
          },
          fireTracker: {
            type: Type.OBJECT,
            properties: {
              fiNumber: { type: Type.NUMBER },
              currentProgress: { type: Type.NUMBER },
              yearsToFI: { type: Type.NUMBER }
            },
            required: ["fiNumber", "currentProgress", "yearsToFI"]
          },
          strategicProtocol: {
            type: Type.OBJECT,
            properties: {
              immediate: { type: Type.STRING },
              shortTerm: { type: Type.STRING },
              longTerm: { type: Type.STRING }
            },
            required: ["immediate", "shortTerm", "longTerm"]
          }
        },
        required: ["healthScore", "scoreSummary", "findings", "actionPlan", "impactMath", "fireTracker", "strategicProtocol"]
      }
    }
  });

  if (!response.text) {
    throw new Error("Failed to get analysis from AI");
  }

  return JSON.parse(response.text);
}
