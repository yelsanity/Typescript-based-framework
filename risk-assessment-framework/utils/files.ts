import fs from "fs/promises";
import path from "path";
import { Reference } from "../framework";

export async function readLocalFile(filePath: string): Promise<string> {
  const abs = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
  const data = await fs.readFile(abs);
  return data.toString("utf8");
}

export async function readLocalFilesAsReferences(paths: string[]): Promise<Reference[]> {
  const out: Reference[] = [];
  for (const p of paths) {
    try {
      const content = await readLocalFile(p);
      out.push({ type: "manual", url: `file://${p}`, scrapedContent: content });
    } catch {
      // ignore read errors for now; could log
    }
  }
  return out;
}

