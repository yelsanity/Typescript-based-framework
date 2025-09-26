import { Reference } from "../framework";

export type DefaultReferenceKey = "coingecko" | "etherscan" | "defillama";

export const DEFAULT_REFERENCE_SOURCES: Record<DefaultReferenceKey, string> = {
  coingecko: "https://www.coingecko.com/",
  etherscan: "https://etherscan.io/",
  defillama: "https://defillama.com/",
};

export function buildDefaultReferences(): Reference[] {
  return Object.values(DEFAULT_REFERENCE_SOURCES).map((url) => ({ type: "default", url }));
}

export function applyReferenceEdits(
  base: Reference[],
  addRefs: string[] = [],
  removeKeys: string[] = []
): Reference[] {
  const baseUrls = new Set(base.map((r) => r.url));
  for (const add of addRefs) {
    if (!baseUrls.has(add)) base.push({ type: "manual", url: add });
  }

  const loweredRemovals = new Set(removeKeys.map((k) => k.toLowerCase()));
  return base.filter((ref) => {
    const key = (Object.entries(DEFAULT_REFERENCE_SOURCES).find(([, u]) => u === ref.url)?.[0] ?? ref.url).toLowerCase();
    return !loweredRemovals.has(key);
  });
}

