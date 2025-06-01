import { env } from "../env.js";

export const aiConfig = {
  openai: {
    apiKey: env.OPENAI_API_KEY,
  },
  anthropic: env.ANTHROPIC_API_KEY
    ? {
        apiKey: env.ANTHROPIC_API_KEY,
      }
    : null,
} as const;

export type AiConfig = typeof aiConfig; 