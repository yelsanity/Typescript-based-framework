import { RiskFrameworkSection } from "./types";
import { GLOBAL_ANALYSIS_INSTRUCTIONS } from "./analysisInstructions";

// Section 2: Market Performance & Risk Assessment

export interface PlaceholderChartBlock {
  chartMarkdownPlaceholder: string; // e.g., "[CHART_PLACEHOLDER]"
  description: string;
}

export interface Section2_1_Output {
  outstandingAndFreeFloat: PlaceholderChartBlock;
  marketShare: PlaceholderChartBlock;
  supplyDistribution: PlaceholderChartBlock;
  transactionCountAndVolume: PlaceholderChartBlock;
  transferValueDistribution: PlaceholderChartBlock;
  stablecoinVelocity: PlaceholderChartBlock;
  activeUsers: PlaceholderChartBlock;
  userGrowth: PlaceholderChartBlock;
  activityDistribution: PlaceholderChartBlock;
}

export interface Section2_2_Output {
  pegDeviationFrequency: PlaceholderChartBlock;
  maximumPegDeviation: PlaceholderChartBlock;
  stdDeviationPeggedValue: PlaceholderChartBlock;
  marketDepthAtPeg: PlaceholderChartBlock;
  pegRecoveryTime: PlaceholderChartBlock;
  stressTestingResults: PlaceholderChartBlock;
}

export interface Section2_3_Output {
  collateralConcentrationRisk: PlaceholderChartBlock;
  redemptionMechanismRisk: PlaceholderChartBlock;
  runRiskMetrics: PlaceholderChartBlock;
  riskReturnAllocation: PlaceholderChartBlock;
}

export interface Section2_OutputShape {
  section_2_1?: Section2_1_Output;
  section_2_2?: Section2_2_Output;
  section_2_3?: Section2_3_Output;
}

const section2Guide = `# Section 2: Market Performance & Risk Assessment\n\n... full section text omitted for brevity in code; see original framework ...\n`;

export const Section2FrameworkGuide: RiskFrameworkSection = {
  id: "section-2",
  title: "Market Performance & Risk Assessment",
  guide: `${section2Guide}\n\n---\n\n${GLOBAL_ANALYSIS_INSTRUCTIONS}`,
  outputType: "chart",
};

