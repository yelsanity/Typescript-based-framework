"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callPerplexity = callPerplexity;
const axios_1 = __importDefault(require("axios"));
async function callPerplexity(messages, options = {}) {
    const apiKey = process.env.PERPLEXITY_API_KEY;
    if (!apiKey) {
        throw new Error("Missing PERPLEXITY_API_KEY in environment");
    }
    const model = options.model ?? "sonar";
    const temperature = options.temperature ?? 0.2;
    const maxTokens = options.maxTokens ?? 1200;
    const resp = await axios_1.default.post("https://api.perplexity.ai/chat/completions", {
        model,
        messages,
        temperature,
        max_tokens: maxTokens,
    }, {
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
        },
        timeout: 60000,
    });
    const text = resp.data?.choices?.[0]?.message?.content ?? "";
    return text;
}
//# sourceMappingURL=llm.js.map