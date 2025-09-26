export interface RiskAssessmentFramework {
  id: string;
  title: string;
  sections: RiskFrameworkSection[];
}

export interface RiskFrameworkSection {
  id: string;
  title: string;
  guide: string; // original instructions + integrated analysis instructions
  outputType: "narrative" | "table" | "chart" | "flowchart";
}

export interface AssetInput {
  name: string;
  issuer: string;
  references: Reference[];
}

export interface Reference {
  type: "manual" | "default" | "crawler";
  url: string;
  scrapedContent?: string;
}

export interface Assessment {
  frameworkId: string;
  asset: string;
  issuer: string;
  results: Record<string, any>; // keyed by sectionId
}

