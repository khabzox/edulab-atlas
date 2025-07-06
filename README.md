# EduLab Atlas 🎓

A modern educational platform built for Moroccan students, providing a comprehensive learning experience with advanced features and intuitive design.

## ✨ Features

- 🧪 **Immersive 3D Labs**: Virtual experiments with React Three Fiber for Physics, Chemistry, and Biology
- 📚 **Curriculum-Aligned Content**: All content follows official Moroccan Baccalaureate curriculum
- 🎯 **Multi-Track Support**: Sciences Mathématiques (SM), Sciences Physiques (SP), SVT, Sciences Humaines (SH), Sciences Économiques (SE), and Arts & Literature (AL)
- 🤖 **AI-Powered Tutoring**: Personalized learning assistance with OpenAI integration
- 🔍 **Smart Search**: Advanced content discovery with semantic search capabilities
- 👥 **Role-Based Access**: Differentiated experiences for students, teachers, and administrators
- 📊 **Progress Analytics**: Detailed learning progress tracking and performance insights
- 🏆 **Gamification**: XP system, achievements, and leaderboards to motivate learning
- 💬 **Collaborative Learning**: Real-time collaboration tools and shared lab experiences
- 📱 **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices
- � **Multilingual Support**: French, Arabic, and English with RTL support for Arabic
- 🌙 **Dark Mode**: Eye-friendly interface with system preference detection

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router & React 18
- **Styling**: Tailwind CSS with custom theme
- **Components**: Shadcn UI for consistent design
- **State Management**: Zustand for efficient state handling
- **Forms**: React Hook Form with Zod validation
- **Data Fetching**: TanStack Query v5
- **Animations**: Framer Motion

### Backend
- **API**: Next.js API Routes & tRPC for type-safe APIs
- **Database**: Supabase (PostgreSQL) with Prisma ORM
- **Dynamic Data**: MongoDB Atlas for flexible schemas (3D scenes, AI chats)
- **Graph Database**: Neo4j/ArangoDB for topic relationships & learning paths
- **Authentication**: Clerk with role-based access control
- **File Storage**: Supabase Storage / AWS S3 for media assets
- **Caching**: Redis (Upstash) for real-time state & performance
- **Search**: Meilisearch / Algolia for content indexing
- **AI Services**: OpenAI API for tutoring, flashcards, summaries

### DevOps & Tools
- **Build System**: Turborepo for monorepo management
- **Testing**: Jest & React Testing Library
- **CI/CD**: GitHub Actions
- **Monitoring**: Sentry for error tracking
- **Analytics**: PostHog or Plausible
- **Type Safety**: TypeScript for all packages

## 📁 Project Structure

```bash
edulab-atlas/
├── apps/                          # Each app is a user-facing entrypoint
│   ├── web/                       # Student/teacher portal (Next.js)
│   ├── admin/                     # Admin dashboard (analytics, moderation)
│   ├── api/                       # API gateway (Next.js API routes or tRPC)
│   ├── ai-service/                # OpenAI-powered service (optional server)
│   ├── lab-editor/                # 3D lab workspace (React Three Fiber)
│   ├── docs/                      # Documentation site
│   ├── mobile/                    # Future React Native app (optional)
│   └── blog/                      # Blog feature (CRUD operations for posts)
├── packages/                      # Shared, composable building blocks
│   ├── ui/                        # Design system: shadcn/ui + Tailwind
│   ├── types/                     # Global TS types (lessons, users, blog posts, etc.)
│   ├── config/                    # App-wide constants, env, i18n settings
│   ├── db/                        # Unified database package
│   │   ├── prisma/               # Prisma setup for Supabase (PostgreSQL)
│   │   ├── mongodb/              # MongoDB connection + schemas
│   │   ├── graph/                # GraphDB adapter (Neo4j or ArangoDB)
│   │   └── redis/                # Redis connection + caching utilities
│   ├── auth/                      # Clerk helpers, roles, middlewares
│   ├── hooks/                     # Shared React hooks (useAuth, useUser)
│   ├── utils/                     # General utility functions
│   ├── prompts/                   # AI prompts for tutoring, flashcards
│   ├── content/                   # Curriculum metadata, subject trees
│   └── blog/                      # Blog post components, utilities, API helpers
├── infra/                         # Infrastructure configs
│   ├── docker/                    # Docker configs for local dev
│   ├── vercel/                    # Vercel deployment settings
│   ├── railway/                   # Backend deployment (API, db)
│   └── scripts/                   # CI/CD, seeding, backups
├── @rules/                        # Project rules and guidelines
│   ├── project-rules.md           # Core development rules
│   ├── technical-architecture.md  # Technical architecture guidelines
│   └── bac-curriculum-features.md # Complete feature requirements by BAC major
├── public/                        # Global assets (images, fonts, icons, etc.)
├── .env                           # Global env variables
├── turbo.json                     # Turborepo pipeline config
├── tsconfig.base.json             # Base TypeScript config
├── package.json                   # Project dependencies & scripts
└── README.md                      # Project documentation
```

## 🛠️ Development

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm 10+ or pnpm 8+
- PostgreSQL 14+
- Redis (optional, for caching)

### Environment Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/edulab-atlas.git
cd edulab-atlas
```

2. **Install dependencies**
```bash
npm install
# or with pnpm
pnpm install
```

3. **Environment Variables**
```bash
# Copy environment variables
cp packages/config/env.example .env

# Configure your .env file with:
DATABASE_URL=
NEXTAUTH_SECRET=
NEXT_PUBLIC_APP_URL=
# ... other variables
```

4. **Database Setup**
```bash
# Generate Prisma Client
npm run db:generate

# Run migrations
npm run db:migrate
```

5. **Start Development Server**
```bash
npm run dev
```

## 📜 Available Scripts

### Root Directory
- `npm run dev` - Start all applications in development mode
- `npm run build` - Build all applications and packages
- `npm run start` - Start all applications in production mode
- `npm run lint` - Run ESLint across all projects
- `npm run format` - Format code with Prettier
- `npm run clean` - Clean all build outputs
- `npm run test` - Run all tests
- `npm run typecheck` - Type check all projects

### Database
- `npm run db:generate` - Generate Prisma Client
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with initial data
- `npm run db:studio` - Open Prisma Studio

## 🧪 Testing

We use Jest and React Testing Library for testing. Run tests with:

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📦 Deployment

The project is configured for deployment on Vercel:

1. Push your changes to GitHub
2. Connect your repository to Vercel
3. Configure environment variables
4. Deploy!

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your fork
5. Submit a pull request

Please read our [Contributing Guide](CONTRIBUTING.md) for more details.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- All our contributors and supporters
- The amazing open-source community
- Moroccan students who inspire us

**Built with ❤️ in Morocco for Moroccan Students**

---

For more information, visit our [documentation](https://docs.edulab-atlas.com).