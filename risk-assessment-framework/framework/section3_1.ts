import { RiskFrameworkSection } from "./types";
import { GLOBAL_ANALYSIS_INSTRUCTIONS } from "./analysisInstructions";

// Section 3.1: Operational Overview

export interface Section3_1_1_Summary {
  executiveSummary: string;
  mintBurnFlowNarrative: string;
  minterAddress?: string;
  burnerAddress?: string;
  chainNativity: string;
  upgradeabilityMechanism: string;
  proxyAdminOwner?: string;
  contractAddresses: string[];
  chainDeploymentDetails: string;
  deployedChains: string[];
  bridgingProtocol: string;
  bridgingRiskNarrative: string;
}

export interface Section3_1_2_Controls {
  managementType: string;
  lockboxes: string[];
  rolePermissions: { role: string; address: string; description: string }[];
}

export interface Section3_1_3_Dependencies {
  narrative: string;
}

export interface Section3_1_4_OperationalSecurity {
  practicesNarrative: string;
  incidentResponseNarrative: string;
  priorIncidentsReference?: string;
}

export interface Section3_1_5_OracleMechanism {
  oracleNarrative: string;
}

export interface Section3_1_OutputShape {
  section_3_1_1?: Section3_1_1_Summary;
  section_3_1_2?: Section3_1_2_Controls;
  section_3_1_3?: Section3_1_3_Dependencies;
  section_3_1_4?: Section3_1_4_OperationalSecurity;
  section_3_1_5?: Section3_1_5_OracleMechanism;
}

const section3_1_Guide = `## 3.1 Operational Overview\n\n... full section text omitted for brevity in code; see original framework ...\n`;

export const Section3_1_FrameworkGuide: RiskFrameworkSection = {
  id: "section-3-1",
  title: "Operational Overview",
  guide: `${section3_1_Guide}\n\n---\n\n${GLOBAL_ANALYSIS_INSTRUCTIONS}`,
  outputType: "narrative",
};

