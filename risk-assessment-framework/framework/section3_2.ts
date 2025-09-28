import { RiskFrameworkSection } from "./types";
import { GLOBAL_ANALYSIS_INSTRUCTIONS } from "./analysisInstructions";

// Section 3.2: Development and Security Metrics

export interface Section3_2_1_DevelopmentActivity { placeholder: string; description: string }
export interface Section3_2_2_ActiveDevelopers { placeholder: string; description: string }

export interface Section3_2_3_DocsQualityLinks {
  developerDocs?: string;
  github?: string;
}

export interface Section3_2_3_DocsQualityScore {
  technicalDepth: number; // 1-5
  completenessCoverage: number; // 1-5
  repoTransparency: number; // 0-5
  accessibilityClarity: number; // 1-5
  maintenanceUpdating: number; // 1-5
  auditAlignment: number; // 1-5
  compositeScore: number; // weighted
}

export interface Section3_2_3_DocumentationQuality {
  links: Section3_2_3_DocsQualityLinks;
  scoring: Section3_2_3_DocsQualityScore;
  narrative: string;
}

export interface Section3_2_4_UpgradeFrequency { description: string }
export interface Section3_2_5_Audits { narrative: string }
export interface Section3_2_6_KnownVulnerabilities { narrative: string }
export interface Section3_2_7_BugBounty { narrative: string }
export interface Section3_2_8_HistoricalDowntime { narrative: string }
export interface Section3_2_9_TimeToPatch { narrative: string }

export interface Section3_2_OutputShape {
  section_3_2_1?: Section3_2_1_DevelopmentActivity;
  section_3_2_2?: Section3_2_2_ActiveDevelopers;
  section_3_2_3?: Section3_2_3_DocumentationQuality;
  section_3_2_4?: Section3_2_4_UpgradeFrequency;
  section_3_2_5?: Section3_2_5_Audits;
  section_3_2_6?: Section3_2_6_KnownVulnerabilities;
  section_3_2_7?: Section3_2_7_BugBounty;
  section_3_2_8?: Section3_2_8_HistoricalDowntime;
  section_3_2_9?: Section3_2_9_TimeToPatch;
}

const section3_2_Guide = `## 3.2 Development and Security Metrics\n\n... full section text omitted for brevity in code; see original framework ...\n`;

export const Section3_2_FrameworkGuide: RiskFrameworkSection = {
  id: "section-3-2",
  title: "Development and Security Metrics",
  guide: `${section3_2_Guide}\n\n---\n\n${GLOBAL_ANALYSIS_INSTRUCTIONS}`,
  outputType: "chart",
};

