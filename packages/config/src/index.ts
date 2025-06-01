export * from "./env.js";
export * from "./services/supabase.js";
export * from "./services/clerk.js";
export * from "./services/ai.js";

import { env } from "./env.js";

export const config = {
  env: env.NODE_ENV,
  appEnv: env.APP_ENV,
  
  database: {
    url: env.DATABASE_URL,
    shadowUrl: env.SHADOW_DATABASE_URL,
  },
  
  email: {
    from: env.EMAIL_FROM_ADDRESS,
    resendApiKey: env.RESEND_API_KEY,
  },
  
  monitoring: {
    sentryDsn: env.SENTRY_DSN,
    posthog: env.NEXT_PUBLIC_POSTHOG_KEY
      ? {
          key: env.NEXT_PUBLIC_POSTHOG_KEY,
          host: env.NEXT_PUBLIC_POSTHOG_HOST,
        }
      : null,
  },
  
  features: {
    flags: {
      enabled: env.NEXT_PUBLIC_FEATURE_FLAGS_ENABLED,
    },
  },
  
  urls: {
    app: env.NEXT_PUBLIC_APP_URL,
    api: env.NEXT_PUBLIC_API_URL,
    admin: env.NEXT_PUBLIC_ADMIN_URL,
  },
} as const;

export type Config = typeof config; 