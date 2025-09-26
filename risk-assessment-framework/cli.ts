import { Command } from "commander";
import { runAssessment } from "./runner";
import { StablecoinFrameworkV1, AssetInput } from "./framework";

const program = new Command();

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
  const asset = opts.asset as string | undefined;
  const issuer = opts.issuer as string | undefined;
  const addRef = (opts.addRef as string[] | undefined) ?? [];
  const removeRef = (opts.removeRef as string[] | undefined) ?? [];
  const addFile = (opts.addFile as string[] | undefined) ?? [];
  const depth = opts.depth as number;
  const frameworkName = (opts.framework as string) ?? "StablecoinFrameworkV1";
  const usePerplexity = Boolean(opts.usePerplexity);
  const perplexityModel = (opts.perplexityModel as string | undefined) ?? undefined;

  if (!asset || !issuer) {
    console.error("--asset and --issuer are required");
    process.exit(1);
  }

  // For now, only StablecoinFrameworkV1 is wired
  if (frameworkName !== "StablecoinFrameworkV1") {
    console.error(`Unknown framework: ${frameworkName}. Try StablecoinFrameworkV1`);
    process.exit(1);
  }

  const input: AssetInput = {
    name: asset,
    issuer: issuer,
    references: (addRef ?? []).map((url) => ({ type: "manual", url })),
  };

  const assessment = await runAssessment(input, StablecoinFrameworkV1, {
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

