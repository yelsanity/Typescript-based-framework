import axios from "axios";

export interface PerplexityRequestMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface PerplexityCallOptions {
  model?: string; // e.g., "sonar"
  temperature?: number;
  maxTokens?: number;
}

export async function callPerplexity(
  messages: PerplexityRequestMessage[],
  options: PerplexityCallOptions = {}
): Promise<string> {
  const apiKey = process.env.PERPLEXITY_API_KEY;
  if (!apiKey) {
    throw new Error("Missing PERPLEXITY_API_KEY in environment");
  }
  const model = options.model ?? "sonar";
  const temperature = options.temperature ?? 0.2;
  const maxTokens = options.maxTokens ?? 1200;

  const resp = await axios.post(
    "https://api.perplexity.ai/chat/completions",
    {
      model,
      messages,
      temperature,
      max_tokens: maxTokens,
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      timeout: 60000,
    }
  );

  const text: string = resp.data?.choices?.[0]?.message?.content ?? "";
  return text;
}

