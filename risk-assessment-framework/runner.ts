import { AssetInput, Assessment, RiskAssessmentFramework, RiskFrameworkSection } from "./framework";
import { buildDefaultReferences, applyReferenceEdits } from "./utils/references";
import { bfsCrawl } from "./utils/crawler";

export interface RunOptions {
  depth?: number;
  addRef?: string[];
  removeRef?: string[];
}

function fillPlaceholders(text: string, asset: string, issuer: string): string {
  return text
    .replaceAll("{Asset Name}", asset)
    .replaceAll("{Asset}", asset)
    .replaceAll("{Stablecoin Name}", asset)
    .replaceAll("{Name of the Asset}", asset)
    .replaceAll("{issuer}", issuer)
    .replaceAll("{Issuer}", issuer);
}

export async function runAssessment(
  assetInput: AssetInput,
  framework: RiskAssessmentFramework,
  options: RunOptions = {}
): Promise<Assessment> {
  const depth = options.depth ?? 1;

  // Build references
  const defaults = buildDefaultReferences();
  const base = [...defaults, ...assetInput.references];
  const finalReferences = applyReferenceEdits(base, options.addRef, options.removeRef);

  // Crawl
  // TODO: Consider throttling, robots.txt, and domain allowlist
  const crawled = await bfsCrawl(
    finalReferences.map((r) => r.url),
    { depth, sameOriginOnly: false }
  );

  // Merge crawled results
  const references = [...finalReferences, ...crawled];

  const results: Record<string, any> = {};

  for (const section of framework.sections) {
    const guide = fillPlaceholders(section.guide, assetInput.name, assetInput.issuer);
    // TODO: Plug LLM enrichment here with guide + references to produce typed output per section
    // For now, return the filled guide and references snapshot for each section
    results[section.id] = {
      title: section.title,
      outputType: section.outputType,
      guide,
      references: references.slice(0, 10), // limit for preview
    } as any;
  }

  const assessment: Assessment = {
    frameworkId: framework.id,
    asset: assetInput.name,
    issuer: assetInput.issuer,
    results,
  };

  return assessment;
}

