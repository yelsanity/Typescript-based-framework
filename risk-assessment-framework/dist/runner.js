"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runAssessment = runAssessment;
const references_1 = require("./utils/references");
const crawler_1 = require("./utils/crawler");
const files_1 = require("./utils/files");
const llm_1 = require("./utils/llm");
function fillPlaceholders(text, asset, issuer) {
    return text
        .replaceAll("{Asset Name}", asset)
        .replaceAll("{Asset}", asset)
        .replaceAll("{Stablecoin Name}", asset)
        .replaceAll("{Name of the Asset}", asset)
        .replaceAll("{issuer}", issuer)
        .replaceAll("{Issuer}", issuer);
}
async function runAssessment(assetInput, framework, options = {}) {
    const depth = options.depth ?? 1;
    // Build references
    const fileRefs = await (0, files_1.readLocalFilesAsReferences)(options.addFile ?? []);
    const base = [...assetInput.references, ...fileRefs];
    const finalReferences = (0, references_1.applyReferenceUrlEdits)(base, options.addRef, options.removeRef);
    // Crawl
    // TODO: Consider throttling, robots.txt, and domain allowlist
    const crawled = await (0, crawler_1.bfsCrawl)(finalReferences.map((r) => r.url), { depth, sameOriginOnly: false });
    // Merge crawled results
    const references = [...finalReferences, ...crawled];
    const results = {};
    for (const section of framework.sections) {
        const guide = fillPlaceholders(section.guide, assetInput.name, assetInput.issuer);
        let llmOutput;
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
                llmOutput = await (0, llm_1.callPerplexity)([
                    { role: "system", content: "You are a precise DeFi risk analyst. Use only provided context." },
                    { role: "user", content: prompt },
                ], { model: options.perplexityModel ?? "sonar", temperature: 0.2, maxTokens: 1400 });
            }
            catch (e) {
                llmOutput = `LLM call failed: ${e?.message ?? e}`;
            }
        }
        results[section.id] = {
            title: section.title,
            outputType: section.outputType,
            guide,
            references: references.slice(0, 10),
            llm: options.usePerplexity ? llmOutput : undefined,
        };
    }
    const assessment = {
        frameworkId: framework.id,
        asset: assetInput.name,
        issuer: assetInput.issuer,
        results,
    };
    return assessment;
}
//# sourceMappingURL=runner.js.map