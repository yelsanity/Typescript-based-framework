"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runAssessment = runAssessment;
const references_1 = require("./utils/references");
const crawler_1 = require("./utils/crawler");
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
    const defaults = (0, references_1.buildDefaultReferences)();
    const base = [...defaults, ...assetInput.references];
    const finalReferences = (0, references_1.applyReferenceEdits)(base, options.addRef, options.removeRef);
    // Crawl
    // TODO: Consider throttling, robots.txt, and domain allowlist
    const crawled = await (0, crawler_1.bfsCrawl)(finalReferences.map((r) => r.url), { depth, sameOriginOnly: false });
    // Merge crawled results
    const references = [...finalReferences, ...crawled];
    const results = {};
    for (const section of framework.sections) {
        const guide = fillPlaceholders(section.guide, assetInput.name, assetInput.issuer);
        // TODO: Plug LLM enrichment here with guide + references to produce typed output per section
        // For now, return the filled guide and references snapshot for each section
        results[section.id] = {
            title: section.title,
            outputType: section.outputType,
            guide,
            references: references.slice(0, 10), // limit for preview
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