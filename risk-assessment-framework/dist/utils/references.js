"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_REFERENCE_SOURCES = void 0;
exports.buildDefaultReferences = buildDefaultReferences;
exports.applyReferenceEdits = applyReferenceEdits;
exports.DEFAULT_REFERENCE_SOURCES = {
    coingecko: "https://www.coingecko.com/",
    etherscan: "https://etherscan.io/",
    defillama: "https://defillama.com/",
};
function buildDefaultReferences() {
    return Object.values(exports.DEFAULT_REFERENCE_SOURCES).map((url) => ({ type: "default", url }));
}
function applyReferenceEdits(base, addRefs = [], removeKeys = []) {
    const baseUrls = new Set(base.map((r) => r.url));
    for (const add of addRefs) {
        if (!baseUrls.has(add))
            base.push({ type: "manual", url: add });
    }
    const loweredRemovals = new Set(removeKeys.map((k) => k.toLowerCase()));
    return base.filter((ref) => {
        const key = (Object.entries(exports.DEFAULT_REFERENCE_SOURCES).find(([, u]) => u === ref.url)?.[0] ?? ref.url).toLowerCase();
        return !loweredRemovals.has(key);
    });
}
//# sourceMappingURL=references.js.map