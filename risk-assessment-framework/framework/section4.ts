import { RiskFrameworkSection } from "./types";
import { GLOBAL_ANALYSIS_INSTRUCTIONS } from "./analysisInstructions";

// Section 4: Regulation & Compliance

export interface Section4_1_1_ReserveAssetsSummary {
  executiveSummary: string; // Composition, Liquidity, Quality, Transparency
  custodians: { name: string; regulatoryStatus?: string }[];
  assetsByCustodian: { custodian: string; assetTypes: string[]; protections?: string }[];
  auditCredentials: { audited: boolean; institution?: string; date?: string; notes?: string };
}

export interface Section4_1_2_OvercollateralizationBuffer {
  bufferValueNarrative: string;
  bufferPercentNarrative: string;
  lossExceedNarrative: string;
}

export interface Section4_1_3_CustodyOfReserves {
  custodiansNarrative: string;
  segregationNarrative: string;
}

export interface Section4_1_4_AttestationsAudits {
  attestationsNarrative: string;
}

export interface Section4_1_5_PaymentRails {
  paymentRailsNarrative: string;
}

export interface Section4_2_1_GovernanceStructure {
  governanceNarrative: string;
}

export interface Section4_3_1_LicensingRegistrations { narrative: string }
export interface Section4_3_2_SanctionsAmlKyc { narrative: string }
export interface Section4_3_3_UserRestrictions { narrative: string }
export interface Section4_3_4_IllegalUseRestrictions { narrative: string }
export interface Section4_3_5_CustomerProtectionMeasures { narrative: string }

export interface Section4_OutputShape {
  section_4_1_1?: Section4_1_1_ReserveAssetsSummary;
  section_4_1_2?: Section4_1_2_OvercollateralizationBuffer;
  section_4_1_3?: Section4_1_3_CustodyOfReserves;
  section_4_1_4?: Section4_1_4_AttestationsAudits;
  section_4_1_5?: Section4_1_5_PaymentRails;
  section_4_2_1?: Section4_2_1_GovernanceStructure;
  section_4_3_1?: Section4_3_1_LicensingRegistrations;
  section_4_3_2?: Section4_3_2_SanctionsAmlKyc;
  section_4_3_3?: Section4_3_3_UserRestrictions;
  section_4_3_4?: Section4_3_4_IllegalUseRestrictions;
  section_4_3_5?: Section4_3_5_CustomerProtectionMeasures;
}

const section4Guide = `# Section 4: Regulation & Compliance\n\n... full section text omitted for brevity in code; see original framework ...\n`;

export const Section4FrameworkGuide: RiskFrameworkSection = {
  id: "section-4",
  title: "Regulation & Compliance",
  guide: `${section4Guide}\n\n---\n\n${GLOBAL_ANALYSIS_INSTRUCTIONS}`,
  outputType: "narrative",
};

