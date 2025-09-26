"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readLocalFile = readLocalFile;
exports.readLocalFilesAsReferences = readLocalFilesAsReferences;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
async function readLocalFile(filePath) {
    const abs = path_1.default.isAbsolute(filePath) ? filePath : path_1.default.resolve(process.cwd(), filePath);
    const data = await promises_1.default.readFile(abs);
    return data.toString("utf8");
}
async function readLocalFilesAsReferences(paths) {
    const out = [];
    for (const p of paths) {
        try {
            const content = await readLocalFile(p);
            out.push({ type: "manual", url: `file://${p}`, scrapedContent: content });
        }
        catch {
            // ignore read errors for now; could log
        }
    }
    return out;
}
//# sourceMappingURL=files.js.map