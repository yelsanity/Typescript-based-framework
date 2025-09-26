"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyReferenceUrlEdits = applyReferenceUrlEdits;
function applyReferenceUrlEdits(base, addRefs = [], removeRefs = []) {
    const baseUrls = new Set(base.map((r) => r.url));
    for (const add of addRefs) {
        if (!baseUrls.has(add))
            base.push({ type: "manual", url: add });
    }
    if (removeRefs.length === 0)
        return base;
    const loweredRemovals = removeRefs.map((u) => u.toLowerCase());
    return base.filter((ref) => {
        const urlLower = ref.url.toLowerCase();
        return !loweredRemovals.some((rm) => urlLower === rm || urlLower.includes(rm));
    });
}
//# sourceMappingURL=references.js.map