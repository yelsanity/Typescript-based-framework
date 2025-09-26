# cursor project thought trail

## **Workflow Overview**

### **1. Input Layer**

- User provides:
    - `{Asset Name}`
    - `{Issuer}`
    - Optional CLI flags:
        - `-addRef <URL>` → Add manual references for this asset
        - `-framework <FrameworkVersion>` → Select framework version
        - `-depth <N>` → Control crawler recursion depth
- **No default references are loaded**; all references are user-supplied or fetched per asset.

---

### **2. Modular Reference Management**

- **Reference Module (per asset)**:
    - Each asset has its own reference store.
    - Deduplicates URLs and tracks type (primary vs secondary).
    - Fully independent — no shared or default sources.
- **Crawler Module**:
    - Recursively fetches pages to the specified depth.
    - Filters out irrelevant or low-quality content.
- **Scraper Module**:
    - Extracts clean text and structured data.
    - Produces a normalized `Reference[]` array ready for analysis.

---

### **3. Framework Parsing & Placeholder Replacement**

- Framework files define:
    - Sections/subsections
    - Placeholders (`{Asset Name}`, `{Issuer}`, `{Collateral}`, etc.)
    - Output types: narrative, tables, flowcharts (mermaid), charts
- Runner iterates framework:
    - Replaces placeholders with asset-specific data
    - Generates:
        - Paragraph narratives
        - Tables (Collateral Snapshot, Fees, Governance, etc.)
        - Mermaid flowcharts for workflows
        - Charts (optional)
- Maintains **subsection integrity** and **redundancy control**.

---

### **4. Analysis Generation**

- Produces **structured Assessment JSON**:
    - Sectioned narratives (1–5)
    - Tables and charts
    - Mermaid code for workflows
    - Risk scores per dimension (1–5)
    - Composite risk assessment
- Enforces **risk-first, professional tone**.
- Integrates **stress scenarios** and **comparative context** with peers.

---

### **5. CLI Interaction**

- Example:

```bash
ts-node cli.ts --asset "USDF" --issuer "XYZ Foundation" --framework StablecoinFrameworkV1 --addRef "https://xyzfoundation.org/usdf" --depth 2

```

- CLI flags control:
    - Asset input
    - References (add only)
    - Crawler depth
    - Framework version
- Outputs:
    - JSON assessment
    - Logs of reference scraping
    - Placeholders for charts and flowcharts

---

### **6. Output Layer**

- Structured JSON containing:
    - Sections 1–5 populated
    - Risk ratings, tables, narratives
    - Flowcharts in Mermaid syntax
- Modular references allow **reuse across multiple assets** without conflict.
- Future-proofing for:
    - Web UI / dashboard integration
    - PDF or Excel export
    - Multi-asset comparisons and dashboards

---

### **7. Optional Future Enhancements**

- Cross-asset comparison
- Interactive dashboards
- Visualization of reserves, peg stability, and risk
- Auditability via versioned reference modules

---

## **Updated Mermaid Flowchart (Modular References Only)**

```mermaid
flowchart TD
    A[User Input: Asset & Issuer] --> B[Add Modular References for Asset]
    B --> C[Reference Management Module (per asset)]
    C --> D[Crawler Module]
    C --> E[Scraper Module]
    D --> F[Normalized Reference Array]
    E --> F
    F --> G[Framework Parsing & Placeholder Replacement]
    G --> H[Section-by-Section Analysis]
    H --> I[Narratives, Tables, Flowcharts]
    I --> J[Risk Scoring & Composite Assessment]
    J --> K[Generate Structured Assessment JSON]
    K --> L[CLI Output / Export]


```

---

✅ **Key Change Incorporated:**

- Removed all default references.
- **References are fully modular** and per-asset.
- Workflow emphasizes **asset-specific reference management**.
- Future outputs and dashboards remain compatible with modular design.
- Modular references per asset (add/remove independently)
- Cleaner separation of **crawler** and **scraper** outputs
- Framework iteration supports **subsection integrity** and **redundancy control**
- CLI fully supports optional flags for references, framework version, and depth


Instructions for use:

### 

### **1) Install**

```bash
cd /workspace/risk-assessment-framework
npm install
npm run build

```

### **2) Create an asset reference module**

```tsx
// references/USDFReferences.ts
import { Reference } from "../framework";

export const USDFReferences: Reference[] = [
  { type: "manual", url: "https://xyzfoundation.org/usdf" },
  { type: "manual", url: "https://docs.xyzfoundation.org/usdf" }
];

```

- Name the export **`<ASSET>References`** to match your **`-asset`** flag (recommended), or default-export an array.

### **3) Run a basic assessment**

```bash
npm run cli -- \
  --asset "USDF" \
  --issuer "XYZ Foundation" \
  --assetRefs ./references/USDFReferences

```

- Output: JSON with per-section guides, references snapshot, and optional LLM output.

### **4) Add and remove references at runtime**

- Add URLs:

```bash
--addRef "https://blog.xyzfoundation.org/usdf-update" "https://status.xyzfoundation.org"

```

- Remove by exact URL or substring:

```bash
--removeRef "docs.xyzfoundation.org" --removeRef "https://xyzfoundation.org/usdf"

```

- Add local files as sources (ingested as text):

```bash
--addFile /path/to/overview.md /path/to/terms.txt

```

Full example:

```bash
npm run cli -- \
  --asset "USDF" \
  --issuer "XYZ Foundation" \
  --assetRefs ./references/USDFReferences \
  --addRef "https://blog.xyzfoundation.org/usdf-update" \
  --removeRef "docs.xyzfoundation.org" \
  --addFile /workspace/notes/usdf_overview.md

```

### **5) Control crawling**

- Provide at least one seed URL (module or **`-addRef`**).
- Increase crawl depth:

```bash
--depth 2

```

- The crawler BFS-crawls across domains by default.

### **6) Use Perplexity LLM (optional)**

- Set API key:

```bash
export PERPLEXITY_API_KEY=YOUR_KEY

```

- Enable:

```bash
--usePerplexity --perplexityModel sonar

```

Example:

```bash
npm run cli -- \
  --asset "USDF" \
  --issuer "XYZ Foundation" \
  --assetRefs ./references/USDFReferences \
  --usePerplexity --perplexityModel sonar \
  --depth 1

```

- LLM output appears under each section as **`results[sectionId].llm`**.

### **7) Save results**

```bash
npm run cli -- --asset "USDF" --issuer "XYZ Foundation" --assetRefs ./references/USDFReferences > assessment.json

```

### **8) Update framework content**

- Edit section guides/types: **`framework/section1.ts`** … **`section5.ts`**.
- Global analysis rules: **`framework/analysisInstructions.ts`**.
- Section assembly: **`framework/stablecoinFrameworkV1.ts`**.
- Rebuild:

```bash
npm run build

```

### **9) Tips**

- If loading a custom module path: **`-assetRefs ./references/MyCoinReferences`** (no .ts extension).
- If your export name doesn’t match **`-asset`**, default-export your references to avoid name matching.
- Remove multiple URLs by repeating **`-removeRef`**.
- Increase **`-depth`** cautiously; more crawling = more requests.
