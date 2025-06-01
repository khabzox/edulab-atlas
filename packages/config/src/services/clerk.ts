import { env } from "../env.js";

export const clerkConfig = {
  publishableKey: env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  secretKey: env.CLERK_SECRET_KEY,
} as const;

export type ClerkConfig = typeof clerkConfig; 