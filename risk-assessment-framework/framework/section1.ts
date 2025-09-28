import { RiskFrameworkSection } from "./types";
import { GLOBAL_ANALYSIS_INSTRUCTIONS } from "./analysisInstructions";

// Section 1: Stablecoin Fundamentals

export interface Section1_1_1_ClassificationTableRow {
  classificationCriteria: string;
  assetDetails: string;
}

export interface Section1_1_1_Output {
  narrative: string;
  comparisonNarrative: string;
  classificationTable: Section1_1_1_ClassificationTableRow[];
}

export interface Section1_1_2_AccessTableRow {
  category: "Institutional Counterpart" | "Centralize exchanges" | "Retail swaps";
  examples: string[];
  accessType: string;
  kycRequired: string; // yes/no + type if yes
}

export interface Section1_1_2_Output {
  mintingNarrative: string;
  accessBulletPoints: {
    institutionalAccess: string;
    retailAccess: string;
  };
  mintingAccessTable: Section1_1_2_AccessTableRow[];
  fiatOnOffNarrative: string;
  fiatRamps: string[];
  geographicAccessibility: string; // one-paragraph narrative
  onboardingFrictionNarrative: string;
  onboardingFrictions: string[];
}

export interface Section1_1_3_Flowcharts {
  acquiringInstitutionalMermaid: string; // mermaid code
  acquiringRetailMermaid: string; // mermaid code
  redeemingInstitutionalMermaid: string; // mermaid code
  redeemingRetailMermaid: string; // mermaid code
}

export interface Section1_1_3_Output {
  workflowNarrative: string;
  acquiringInstitutionalNarrative: string;
  acquiringRetailNarrative: string;
  redeemingInstitutionalNarrative: string;
  redeemingRetailNarrative: string;
  flowcharts: Section1_1_3_Flowcharts;
}

export interface Section1_1_4_Output {
  reservesNarrative: string;
  reserveAssets: string[]; // names only, no amounts
}

export interface Section1_1_5_RevenueTableRow {
  key: string;
  value: string;
}

export interface Section1_1_5_AltRevenueRow {
  revenueStream: string;
  description: string;
}

export interface Section1_1_5_Output {
  feeModelNarrative: string;
  feeModelTable: Section1_1_5_RevenueTableRow[];
  altRevenueNarrative: string;
  altRevenueTable: Section1_1_5_AltRevenueRow[];
  revenueOversightExecutiveSummary: string;
  strategicValueCreationNarrative: string;
}

export interface Section1_1_6_ExecTableRow {
  founder: string;
  role: string;
  responsibilities: string;
  keyStrengths: string;
}

export interface Section1_1_6_Output {
  legalEntity: {
    fullLegalName: string;
    incorporation: string;
    dba?: string;
    mission?: string;
    profitStatus?: string;
    legalConstraints?: string;
  };
  ownershipExecutiveSummary: string;
  governanceExecutiveSummary: string;
  managementTable: Section1_1_6_ExecTableRow[];
  operationsExecutiveSummary: string;
}

export interface Section1_1_7_UpdateRow {
  date: string;
  details: string;
}

export interface Section1_1_7_Output {
  updatesNarrative: string;
  updatesTable: Section1_1_7_UpdateRow[];
}

export interface Section1_2_1_Output {
  backgroundWorkflowNarrative: string;
}

export interface Section1_2_2_Output {
  architectureMermaid: string; // mermaid code
}

export interface Section1_2_3_TokenTypeRow {
  tokenType: string;
  description: string;
}

export interface Section1_2_3_Output {
  crossChainArchitecture: string;
  bridgingProtocol: string;
  nativeChain: string;
  bridgedChainsNarrative: string;
  tokenTypeTable: Section1_2_3_TokenTypeRow[];
  lockboxRoles: string[];
  lockboxType: string;
  governanceModel: string; // e.g., multisig details
  multisigSignatureContracts?: string[];
  bridgingModel: string;
  flowControl: string;
  operationalOversightRisks: string[];
}

export interface Section1_OutputShape {
  section_1_1_1?: Section1_1_1_Output;
  section_1_1_2?: Section1_1_2_Output;
  section_1_1_3?: Section1_1_3_Output;
  section_1_1_4?: Section1_1_4_Output;
  section_1_1_5?: Section1_1_5_Output;
  section_1_1_6?: Section1_1_6_Output;
  section_1_1_7?: Section1_1_7_Output;
  section_1_2_1?: Section1_2_1_Output;
  section_1_2_2?: Section1_2_2_Output;
  section_1_2_3?: Section1_2_3_Output;
}

const section1Guide = `# SECTION 1: Stablecoin Fundamentals\n\n... full section text omitted for brevity in code; see original framework ...\n`;

export const Section1FrameworkGuide: RiskFrameworkSection = {
  id: "section-1",
  title: "Stablecoin Fundamentals",
  guide: `${section1Guide}\n\n---\n\n${GLOBAL_ANALYSIS_INSTRUCTIONS}`,
  outputType: "narrative",
};

