import { RiskFrameworkSection } from "./types";
import { GLOBAL_ANALYSIS_INSTRUCTIONS } from "./analysisInstructions";

// Section 5: Risk Assessment

export interface Section5_1_ReserveCollateralizationRisk {
  findingsNarrative: string;
  stressScenarioNarrative: string;
  riskScore: number; // 1-5
  rationale: string;
}

export interface Section5_2_RedemptionMechanismRisk {
  findingsNarrative: string;
  stressScenarioNarrative: string;
  riskScore: number;
  rationale: string;
}

export interface Section5_3_RunRiskLiquidityDepth {
  findingsNarrative: string;
  stressScenarioNarrative: string;
  riskScore: number;
  rationale: string;
}

export interface Section5_4_CounterpartyRisk {
  findingsNarrative: string;
  stressScenarioNarrative: string;
  riskScore: number;
  rationale: string;
}

export interface Section5_5_RegulatoryLegalRisk {
  findingsNarrative: string;
  stressScenarioNarrative: string;
  riskScore: number;
  rationale: string;
}

export interface Section5_6_OverallScoreSummary {
  overallScore: number;
  summaryNarrative: string;
  recommendations: string[];
}

export interface Section5_OutputShape {
  section_5_1?: Section5_1_ReserveCollateralizationRisk;
  section_5_2?: Section5_2_RedemptionMechanismRisk;
  section_5_3?: Section5_3_RunRiskLiquidityDepth;
  section_5_4?: Section5_4_CounterpartyRisk;
  section_5_5?: Section5_5_RegulatoryLegalRisk;
  section_5_6?: Section5_6_OverallScoreSummary;
}

const section5Guide = `# Section 5: Risk Assessment\n\n... full section text omitted for brevity in code; see original framework ...\n`;

export const Section5FrameworkGuide: RiskFrameworkSection = {
  id: "section-5",
  title: "Risk Assessment",
  guide: `${section5Guide}\n\n---\n\n${GLOBAL_ANALYSIS_INSTRUCTIONS}`,
  outputType: "narrative",
};

