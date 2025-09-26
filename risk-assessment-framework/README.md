## Risk Assessment Framework (TypeScript)

This repository scaffolds a modular risk assessment framework for stablecoins, including:
- Strongly-typed framework sections
- Utilities for scraping and crawling
- A runner to execute assessments
- A CLI for interactive runs

### Quickstart

1. Install dependencies
```bash
cd risk-assessment-framework
npm install
```

2. Run the example
```bash
npm run run:example
```

3. CLI usage
```bash
ts-node cli.ts \
  --asset "USDF" \
  --issuer "XYZ Foundation" \
  --addRef "https://xyzfoundation.org/usdf" \
  --removeRef "etherscan" \
  --depth 2 \
  --framework StablecoinFrameworkV1
```

### Project Structure

```
risk-assessment-framework/
├── framework/
│   ├── types.ts
│   ├── analysisInstructions.ts
│   ├── section1.ts
│   ├── section2.ts
│   ├── section3_1.ts
│   ├── section3_2.ts
│   ├── section4.ts
│   ├── section5.ts
│   ├── stablecoinFrameworkV1.ts
│   └── index.ts
├── utils/
│   ├── scraper.ts
│   ├── crawler.ts
│   └── references.ts
├── runner.ts
├── cli.ts
├── package.json
├── tsconfig.json
└── README.md
```

### Notes
- Section guide strings merge the original framework text for that section with the global analysis instructions.
- The runner includes TODOs for LLM enrichment and dynamic data ingestion.
- The crawler/scraper are basic, safe defaults intended for extension.

