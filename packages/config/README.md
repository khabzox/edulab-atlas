# @edulab-atlas/config

This package contains shared configuration and environment variable validation for the EduLab Atlas project.

## Features

- Environment variable validation using Zod
- Type-safe configuration for all services
- Shared configuration across all apps
- Service-specific configuration helpers

## Usage

1. Install the package in your app:

```bash
npm install @edulab-atlas/config
```

2. Copy the `env.example` file to your app's root and rename it to `.env`:

```bash
cp packages/config/env.example .env
```

3. Update the environment variables in your `.env` file with your actual values.

4. Import and use the configuration in your app:

```typescript
import { config, supabaseConfig, clerkConfig, aiConfig } from "@edulab-atlas/config";

// Access environment variables
const isDevelopment = config.env === "development";
const databaseUrl = config.database.url;

// Use service-specific configurations
const supabase = createClient(supabaseConfig.url, supabaseConfig.anonKey);
const clerk = new Clerk(clerkConfig.secretKey);
```

## Environment Variables

The package validates the following environment variables:

### App Configuration
- `NODE_ENV`: Application environment (development, test, production)
- `APP_ENV`: Deployment environment (development, staging, production)

### Database
- `DATABASE_URL`: Main database connection URL
- `SHADOW_DATABASE_URL`: Shadow database for migrations (optional)

### Authentication (Clerk)
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk public key
- `CLERK_SECRET_KEY`: Clerk secret key

### Storage (Supabase)
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role key

### AI Services
- `OPENAI_API_KEY`: OpenAI API key
- `ANTHROPIC_API_KEY`: Anthropic API key (optional)

### Email
- `RESEND_API_KEY`: Resend API key
- `EMAIL_FROM_ADDRESS`: Default sender email address

### Analytics & Monitoring
- `NEXT_PUBLIC_POSTHOG_KEY`: PostHog API key (optional)
- `NEXT_PUBLIC_POSTHOG_HOST`: PostHog host URL (optional)
- `SENTRY_DSN`: Sentry DSN URL (optional)

### Feature Flags
- `NEXT_PUBLIC_FEATURE_FLAGS_ENABLED`: Enable/disable feature flags

### API URLs
- `NEXT_PUBLIC_APP_URL`: Main app URL
- `NEXT_PUBLIC_API_URL`: API URL
- `NEXT_PUBLIC_ADMIN_URL`: Admin dashboard URL

## Development

To build the package:

```bash
npm run build
```

To watch for changes during development:

```bash
npm run dev
``` 