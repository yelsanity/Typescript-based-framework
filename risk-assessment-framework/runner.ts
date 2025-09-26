import { AssetInput, Assessment, RiskAssessmentFramework, RiskFrameworkSection } from "./framework";
import { buildDefaultReferences, applyReferenceEdits } from "./utils/references";
import { bfsCrawl } from "./utils/crawler";
import { readLocalFilesAsReferences } from "./utils/files";
import { callPerplexity } from "./utils/llm";

export interface RunOptions {
  depth?: number;
  addRef?: string[];
  removeRef?: string[];
  addFile?: string[];
  usePerplexity?: boolean;
  perplexityModel?: string;
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
  const fileRefs = await readLocalFilesAsReferences(options.addFile ?? []);
  const base = [...defaults, ...assetInput.references, ...fileRefs];
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
    let llmOutput: string | undefined;
    if (options.usePerplexity) {
      const context = references
        .slice(0, 20)
        .map((r) => `- ${r.url}${r.scrapedContent ? `\n  ${r.scrapedContent.slice(0, 800)}` : ""}`)
        .join("\n");
      const prompt = `You are to produce structured analysis for the section titled: "${section.title}".\n` +
        `Follow the guide below and return a concise, risk-first analysis.\n` +
        `Guide:\n${guide}\n\n` +
        `Context references (truncated):\n${context}`;
      try {
        llmOutput = await callPerplexity([
          { role: "system", content: "You are a precise DeFi risk analyst. Use only provided context." },
          { role: "user", content: prompt },
        ], { model: options.perplexityModel ?? "sonar", temperature: 0.2, maxTokens: 1400 });
      } catch (e: any) {
        llmOutput = `LLM call failed: ${e?.message ?? e}`;
      }
    }
    results[section.id] = {
      title: section.title,
      outputType: section.outputType,
      guide,
      references: references.slice(0, 10),
      llm: options.usePerplexity ? llmOutput : undefined,
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

