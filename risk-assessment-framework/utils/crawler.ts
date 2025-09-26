import { scrapeUrl, ScrapeResult } from "./scraper";
import { Reference } from "../framework";

export interface CrawlOptions {
  depth: number;
  sameOriginOnly?: boolean;
}

function normalizeUrl(url: string): string {
  try {
    const u = new URL(url);
    u.hash = "";
    return u.toString();
  } catch {
    return url;
  }
}

function getLinksFromHtml(html: string, baseUrl: string): string[] {
  const hrefRegex = /href\s*=\s*"([^"]+)"/gi;
  const links: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = hrefRegex.exec(html))) {
    const raw = match[1];
    try {
      const abs = new URL(raw, baseUrl).toString();
      links.push(abs);
    } catch {
      // ignore invalid urls
    }
  }
  return links;
}

export async function bfsCrawl(seedUrls: string[], options: CrawlOptions): Promise<Reference[]> {
  const queue: { url: string; depth: number }[] = [];
  const visited = new Set<string>();
  const results: Reference[] = [];

  for (const url of seedUrls) {
    queue.push({ url: normalizeUrl(url), depth: 0 });
  }

  const seedOrigin = seedUrls.length > 0 ? new URL(seedUrls[0]).origin : undefined;

  while (queue.length > 0) {
    const { url, depth } = queue.shift()!;
    if (visited.has(url)) continue;
    visited.add(url);

    if (options.sameOriginOnly && seedOrigin && new URL(url).origin !== seedOrigin) {
      continue;
    }

    const scraped: ScrapeResult = await scrapeUrl(url);
    results.push({ type: "crawler", url: scraped.url, scrapedContent: scraped.textContent });

    if (depth < options.depth) {
      const html = scraped.textContent ?? "";
      const links = getLinksFromHtml(html, url);
      for (const link of links) {
        const normalized = normalizeUrl(link);
        if (!visited.has(normalized)) {
          queue.push({ url: normalized, depth: depth + 1 });
        }
      }
    }
  }

  return results;
}

