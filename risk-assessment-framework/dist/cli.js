"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const runner_1 = require("./runner");
const framework_1 = require("./framework");
const program = new commander_1.Command();
program
    .name("risk-assessment-cli")
    .description("Run a risk assessment for a given asset using a chosen framework")
    .option("--asset <string>", "Asset name")
    .option("--issuer <string>", "Issuer name")
    .option("--addRef <url...>", "Add reference URL(s)")
    .option("--removeRef <key...>", "Remove default reference(s) by key: coingecko, etherscan, defillama")
    .option("--addFile <path...>", "Add local file(s) as references (txt/md/html/pdf/docx)")
    .option("--depth <number>", "Crawler depth", (v) => parseInt(v, 10), 1)
    .option("--framework <name>", "Framework to use", "StablecoinFrameworkV1")
    .option("--usePerplexity", "Enable Perplexity LLM enrichment", false)
    .option("--perplexityModel <name>", "Perplexity model (e.g., sonar)")
    .parse(process.argv);
async function main() {
    const opts = program.opts();
    const asset = opts.asset;
    const issuer = opts.issuer;
    const addRef = opts.addRef ?? [];
    const removeRef = opts.removeRef ?? [];
    const addFile = opts.addFile ?? [];
    const depth = opts.depth;
    const frameworkName = opts.framework ?? "StablecoinFrameworkV1";
    const usePerplexity = Boolean(opts.usePerplexity);
    const perplexityModel = opts.perplexityModel ?? undefined;
    if (!asset || !issuer) {
        console.error("--asset and --issuer are required");
        process.exit(1);
    }
    // For now, only StablecoinFrameworkV1 is wired
    if (frameworkName !== "StablecoinFrameworkV1") {
        console.error(`Unknown framework: ${frameworkName}. Try StablecoinFrameworkV1`);
        process.exit(1);
    }
    const input = {
        name: asset,
        issuer: issuer,
        references: (addRef ?? []).map((url) => ({ type: "manual", url })),
    };
    const assessment = await (0, runner_1.runAssessment)(input, framework_1.StablecoinFrameworkV1, {
        addRef,
        removeRef,
        addFile,
        depth,
        usePerplexity,
        perplexityModel,
    });
    // Output to stdout
    console.log(JSON.stringify(assessment, null, 2));
}
main().catch((err) => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=cli.js.map