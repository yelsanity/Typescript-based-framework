import axios from "axios";
import * as cheerio from "cheerio";

export interface ScrapeResult {
  url: string;
  status: number;
  title?: string;
  textContent?: string;
}

export async function scrapeUrl(url: string): Promise<ScrapeResult> {
  try {
    const response = await axios.get(url, { timeout: 15000 });
    const html = response.data as string;
    const $ = cheerio.load(html);
    const title = $("title").first().text();
    const textContent = $("body").text().replace(/\s+/g, " ").trim();
    return { url, status: response.status, title, textContent };
  } catch (error: any) {
    return { url, status: error?.response?.status ?? 0, title: undefined, textContent: undefined };
  }
}

