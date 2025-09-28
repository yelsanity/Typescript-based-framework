"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bfsCrawl = bfsCrawl;
const scraper_1 = require("./scraper");
function normalizeUrl(url) {
    try {
        const u = new URL(url);
        u.hash = "";
        return u.toString();
    }
    catch {
        return url;
    }
}
function getLinksFromHtml(html, baseUrl) {
    const hrefRegex = /href\s*=\s*"([^"]+)"/gi;
    const links = [];
    let match;
    while ((match = hrefRegex.exec(html))) {
        const raw = match[1];
        try {
            const abs = new URL(raw, baseUrl).toString();
            links.push(abs);
        }
        catch {
            // ignore invalid urls
        }
    }
    return links;
}
async function bfsCrawl(seedUrls, options) {
    const queue = [];
    const visited = new Set();
    const results = [];
    for (const url of seedUrls) {
        queue.push({ url: normalizeUrl(url), depth: 0 });
    }
    const seedOrigin = seedUrls.length > 0 ? new URL(seedUrls[0]).origin : undefined;
    while (queue.length > 0) {
        const { url, depth } = queue.shift();
        if (visited.has(url))
            continue;
        visited.add(url);
        if (options.sameOriginOnly && seedOrigin && new URL(url).origin !== seedOrigin) {
            continue;
        }
        const scraped = await (0, scraper_1.scrapeUrl)(url);
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
//# sourceMappingURL=crawler.js.map