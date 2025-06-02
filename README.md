# EduLab Atlas 🎓

A modern educational platform built for Moroccan students, providing a comprehensive learning experience with advanced features and intuitive design.

## ✨ Features

- 📚 **Rich Content Management**: Support for various educational content types
- 🔍 **Smart Search**: Advanced search functionality for educational resources
- 👥 **User Profiles**: Customizable student and teacher profiles
- 📊 **Progress Tracking**: Detailed learning progress analytics
- 💬 **Interactive Learning**: Real-time collaboration tools
- 📱 **Responsive Design**: Works seamlessly on all devices
- 🌙 **Dark Mode**: Eye-friendly dark theme support
- 🔐 **Secure Authentication**: Robust user authentication system

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
- **API**: Next.js API Routes & tRPC
- **Database**: Prisma with PostgreSQL
- **Authentication**: NextAuth.js with multiple providers
- **File Storage**: AWS S3 / Cloudinary
- **Caching**: Redis for performance
- **Search**: Algolia for advanced search capabilities

### DevOps & Tools
- **Build System**: Turborepo for monorepo management
- **Testing**: Jest & React Testing Library
- **CI/CD**: GitHub Actions
- **Monitoring**: Sentry for error tracking
- **Analytics**: Vercel Analytics
- **Type Safety**: TypeScript for all packages

## 📁 Project Structure

```bash
edulab-atlas/
├── apps/
│   ├── web/                 # Main Next.js application
│   │   ├── app/            # App router pages
│   │   ├── components/     # React components
│   │   ├── lib/           # Utility functions
│   │   └── styles/        # Global styles
│   └── docs/              # Documentation site
├── packages/
│   ├── auth/              # Authentication utilities
│   │   ├── src/
│   │   └── tests/
│   ├── config/            # Shared configuration
│   │   ├── eslint/
│   │   └── typescript/
│   ├── db/               # Database utilities
│   │   ├── prisma/
│   │   └── migrations/
│   ├── ui/               # Shared UI components
│   │   ├── components/
│   │   └── styles/
│   ├── utils/            # Common utilities
│   │   ├── src/
│   │   └── tests/
│   └── types/            # Shared TypeScript types
└── tooling/              # Development tools
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