# EduLab Atlas - Technical Architecture Rules

## 🏗️ **Monorepo Structure Rules**

### Apps Organization

```bash
apps/
├── web/                    # Student/Teacher portal (Next.js 14)
├── admin/                  # Admin dashboard (Next.js 14)
├── api/                    # API gateway (Next.js API routes + tRPC)
├── lab-editor/             # 3D lab workspace (React Three Fiber)
├── ai-service/             # OpenAI-powered service (Node.js)
├── docs/                   # Documentation site (Next.js)
└── mobile/                 # Future React Native app
```

### Packages Organization

```bash
packages/
├── ui/                     # Design system (shadcn/ui + Tailwind)
├── types/                  # Global TypeScript definitions
├── config/                 # App constants, env, i18n settings
├── db/                     # Unified database package
│   ├── prisma/            # Prisma setup for Supabase (PostgreSQL)
│   ├── mongodb/           # MongoDB connection + schemas
│   ├── graph/             # GraphDB adapter (Neo4j/ArangoDB)
│   └── redis/             # Redis connection + caching utilities
├── auth/                   # Clerk helpers, roles, middlewares
├── hooks/                  # Shared React hooks (useAuth, useUser)
├── utils/                  # General utility functions
├── prompts/                # AI prompts for tutoring, flashcards
├── content/                # Curriculum metadata, subject trees
└── blog/                   # Blog post components, utilities, API helpers
```

## 🛠️ **Technology Stack Rules**

### Frontend Rules

- **Framework**: Next.js 14 with App Router only
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: Zustand for client state, TanStack Query for server state
- **Forms**: React Hook Form with Zod validation
- **3D Graphics**: React Three Fiber + Drei + Cannon.js for physics
- **Animations**: Framer Motion for UI animations
- **Icons**: Lucide React for consistent iconography

### Backend Rules

- **API Layer**: tRPC for type-safe APIs
- **Authentication**: Clerk with role-based access control
- **Primary Database**: Supabase (PostgreSQL) with Prisma ORM
- **Dynamic Data**: MongoDB Atlas for flexible schemas
- **Graph Database**: Neo4j or ArangoDB for topic relationships
- **Caching**: Redis (Upstash) for real-time data
- **File Storage**: Supabase Storage or AWS S3
- **Search**: Meilisearch or Algolia for content indexing
- **AI Integration**: OpenAI API for tutoring and content generation
- **Database Package**: Unified `packages/db/` containing all database connections and schemas

### DevOps Rules

- **Build System**: Turborepo for monorepo management
- **Package Manager**: pnpm for efficient dependency management
- **Testing**: Jest + React Testing Library + Playwright for E2E
- **Linting**: ESLint with TypeScript rules
- **Formatting**: Prettier with consistent configuration
- **CI/CD**: GitHub Actions for automated testing and deployment
- **Frontend Deployment**: Vercel for Next.js apps
- **Backend Deployment**: Railway for API services
- **Monitoring**: Sentry for error tracking, PostHog for analytics

## 🔒 **Security Architecture Rules**

### Authentication Flow

```typescript
// All routes must implement Clerk authentication
const protectedRoute = withAuth(
  (req, res) => {
    // Route logic here
  },
  {
    roles: ["student", "teacher", "admin"],
  },
);
```

### Authorization Levels

- **Student**: Access to assigned content, progress tracking, 3D labs
- **Teacher**: Class management, assignment creation, progress monitoring
- **Admin**: Full system access, content moderation, analytics

### Data Protection

- **Encryption**: All sensitive data encrypted at rest and in transit
- **Input Validation**: Zod schemas for all user inputs
- **Rate Limiting**: API endpoints protected against abuse
- **CORS**: Properly configured for cross-origin requests

## 📊 **Database Architecture Rules**

### Supabase (PostgreSQL) Schema

```sql
-- User profiles with multilingual support
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY,
  clerk_id VARCHAR NOT NULL UNIQUE,
  role user_role NOT NULL,
  grade VARCHAR,
  major bac_major,
  preferred_language VARCHAR DEFAULT 'fr',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Lessons with language variants
CREATE TABLE lessons (
  id UUID PRIMARY KEY,
  title_fr VARCHAR NOT NULL,
  title_ar VARCHAR NOT NULL,
  title_en VARCHAR,
  content_fr TEXT NOT NULL,
  content_ar TEXT NOT NULL,
  content_en TEXT,
  subject VARCHAR NOT NULL,
  grade VARCHAR NOT NULL,
  difficulty_level INTEGER DEFAULT 1,
  hands_on_component BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### MongoDB Collections

```javascript
// 3D Lab Scenes
const labSceneSchema = {
  _id: ObjectId,
  userId: String,
  lessonId: String,
  sceneData: {
    objects: Array,
    physics: Object,
    interactions: Array,
    state: Object,
  },
  savedAt: Date,
  isShared: Boolean,
};

// AI Chat Sessions
const aiChatSchema = {
  _id: ObjectId,
  userId: String,
  subject: String,
  messages: [
    {
      role: String, // 'user' | 'assistant'
      content: String,
      timestamp: Date,
    },
  ],
  context: Object,
};

// Task Checker System
const taskSchema = {
  _id: ObjectId,
  userId: String,
  lessonId: String,
  taskType: String, // 'experiment', 'quiz', 'calculation', 'simulation'
  taskData: {
    title: String,
    description: String,
    requirements: Array, // List of steps to complete
    checkpoints: [
      {
        id: String,
        description: String,
        isCompleted: Boolean,
        completedAt: Date,
        score: Number,
      },
    ],
    expectedResults: Object,
    actualResults: Object,
  },
  status: String, // 'pending', 'in_progress', 'completed', 'failed'
  startedAt: Date,
  completedAt: Date,
  attempts: Number,
  maxAttempts: Number,
  score: Number,
  feedback: String,
};

// Progress Tracking
const progressSchema = {
  _id: ObjectId,
  userId: String,
  subject: String,
  grade: String,
  major: String, // 'SM', 'SP', 'SVT', 'SH', 'SE', 'AL'
  totalLessons: Number,
  completedLessons: Number,
  totalTasks: Number,
  completedTasks: Number,
  totalExperiments: Number,
  completedExperiments: Number,
  overallScore: Number,
  lastAccessed: Date,
  learningPath: [
    {
      lessonId: String,
      status: String, // 'locked', 'available', 'in_progress', 'completed'
      score: Number,
      completedAt: Date,
    },
  ],
};
```

### Graph Database Schema (Neo4j)

```cypher
// Topic nodes with relationships
CREATE (topic:Topic {
  id: "topic_id",
  titleFr: "French title",
  titleAr: "Arabic title",
  titleEn: "English title",
  subject: "mathematics",
  grade: "2bac",
  difficulty: 3
})

// Prerequisite relationships
CREATE (advanced:Topic)-[:REQUIRES]->(basic:Topic)

// Learning path relationships
CREATE (current:Topic)-[:LEADS_TO]->(next:Topic)
```

## 🎨 **UI/UX Architecture Rules**

### Design System

- **Colors**: Consistent color palette with dark/light mode support
- **Typography**: Multilingual font stack supporting Arabic, Latin scripts
- **Components**: Atomic design principles with shadcn/ui base
- **Responsive**: Mobile-first approach with breakpoints
- **Accessibility**: WCAG 2.1 AA compliance mandatory

### Internationalization

```typescript
// i18n structure
const translations = {
  fr: {
    navigation: { ... },
    lessons: { ... },
    assessments: { ... }
  },
  ar: {
    navigation: { ... },
    lessons: { ... },
    assessments: { ... }
  },
  en: {
    navigation: { ... },
    lessons: { ... },
    assessments: { ... }
  }
};
```

### RTL Support

- **Layout**: Automatic RTL layout for Arabic interface
- **Icons**: Mirrored icons for directional elements
- **Text**: Proper text alignment and direction
- **Components**: RTL-aware component behavior

## 🚀 **Performance Rules**

### Bundle Optimization

- **Code Splitting**: Route-based and component-based splitting
- **Tree Shaking**: Eliminate unused code
- **Image Optimization**: Next.js Image component with WebP/AVIF
- **Font Optimization**: Local font hosting with font-display: swap

### Caching Strategy

```typescript
// Redis caching patterns
const cacheKey = `lesson:${lessonId}:${language}`;
const cachedLesson = await redis.get(cacheKey);

if (!cachedLesson) {
  const lesson = await db.lesson.findUnique({ where: { id: lessonId } });
  await redis.setex(cacheKey, 3600, JSON.stringify(lesson));
  return lesson;
}

return JSON.parse(cachedLesson);
```

### 3D Performance

- **LOD**: Level of detail for complex 3D scenes
- **Frustum Culling**: Render only visible objects
- **Instancing**: Efficient rendering of repeated objects
- **Texture Optimization**: Compressed textures with mipmaps

## 🧪 **Testing Architecture Rules**

### Testing Pyramid

```
E2E Tests (Playwright)         ← Few, critical user journeys
Integration Tests (Jest)       ← API endpoints, database operations
Unit Tests (Jest + RTL)        ← Components, utilities, hooks
```

### Test Categories

- **Unit Tests**: Individual functions and components
- **Integration Tests**: API routes and database operations
- **E2E Tests**: Critical user workflows
- **Visual Regression**: UI consistency across changes
- **Performance Tests**: Load testing for high usage

### Coverage Requirements

- **Minimum**: 80% code coverage for critical paths
- **Components**: All UI components must have tests
- **API Routes**: All endpoints must have integration tests
- **Utilities**: 100% coverage for utility functions

## 📈 **Monitoring & Analytics Rules**

### Error Tracking

```typescript
// Sentry configuration
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  integrations: [
    new Integrations.Http({ tracing: true }),
    new Integrations.Express({ app }),
  ],
  tracesSampleRate: 0.1,
});
```

### Analytics Events

```typescript
// PostHog event tracking
posthog.capture("lesson_completed", {
  userId: user.id,
  lessonId: lesson.id,
  subject: lesson.subject,
  timeSpent: timeSpent,
  handsOnCompleted: handsOnCompleted,
});
```

### Performance Monitoring

- **Core Web Vitals**: Monitor LCP, FID, CLS
- **API Response Times**: Track endpoint performance
- **3D Scene Performance**: Monitor FPS and memory usage
- **User Journey Analytics**: Track learning progression

## 🔄 **CI/CD Pipeline Rules**

### GitHub Actions Workflow

```yaml
name: EduLab Atlas CI/CD
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: pnpm install
      - run: pnpm run lint
      - run: pnpm run typecheck
      - run: pnpm run test
      - run: pnpm run build

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
      - name: Deploy API to Railway
        uses: railway-deploy-action@v1
```

### Deployment Rules

- **Staging**: All PRs deploy to staging environment
- **Production**: Only main branch deploys to production
- **Database Migrations**: Must be backwards compatible
- **Feature Flags**: Use for gradual feature rollouts

## 📚 **Documentation Rules**

### Code Documentation

- **JSDoc**: All public functions must have JSDoc comments
- **README**: Each package must have comprehensive README
- **API Docs**: Auto-generated from tRPC schemas
- **Component Stories**: Storybook for UI components

### Architecture Decision Records (ADRs)

- **Template**: Use standard ADR template
- **Storage**: Store in `/docs/adrs/` directory
- **Numbering**: Sequential numbering system
- **Reviews**: All ADRs require team review

## 🔍 **Task Checker System Architecture**

### Task Management API

```typescript
// Task creation and management
interface TaskAPI {
  // Create a new task for a lesson
  createTask: (data: {
    lessonId: string;
    taskType: "experiment" | "quiz" | "calculation" | "simulation";
    title: string;
    description: string;
    requirements: string[];
    expectedResults: any;
    maxAttempts: number;
  }) => Promise<Task>;

  // Start a task attempt
  startTask: (taskId: string, userId: string) => Promise<TaskAttempt>;

  // Submit checkpoint completion
  submitCheckpoint: (data: {
    taskId: string;
    checkpointId: string;
    userId: string;
    results: any;
  }) => Promise<CheckpointResult>;

  // Complete task and calculate score
  completeTask: (
    taskId: string,
    userId: string,
    results: any,
  ) => Promise<TaskCompletion>;

  // Get task progress
  getTaskProgress: (taskId: string, userId: string) => Promise<TaskProgress>;

  // Get user's task history
  getUserTasks: (userId: string, filters?: TaskFilters) => Promise<Task[]>;
}

// Progress tracking endpoints
interface ProgressAPI {
  // Get overall progress for a subject
  getSubjectProgress: (
    userId: string,
    subject: string,
  ) => Promise<SubjectProgress>;

  // Get learning path with task dependencies
  getLearningPath: (userId: string, major: string) => Promise<LearningPath>;

  // Update progress after task completion
  updateProgress: (
    userId: string,
    taskId: string,
    score: number,
  ) => Promise<void>;

  // Get achievement status
  getAchievements: (userId: string) => Promise<Achievement[]>;

  // Calculate adaptive recommendations
  getRecommendations: (userId: string) => Promise<Recommendation[]>;
}
```

### Real-time Task Monitoring

```typescript
// WebSocket events for live task tracking
interface TaskEvents {
  "task:started": { taskId: string; userId: string; timestamp: Date };
  "checkpoint:completed": {
    taskId: string;
    checkpointId: string;
    userId: string;
    score: number;
    timestamp: Date;
  };
  "task:completed": {
    taskId: string;
    userId: string;
    finalScore: number;
    duration: number;
    timestamp: Date;
  };
  "progress:updated": {
    userId: string;
    subject: string;
    newProgress: number;
    achievements: string[];
  };
}

// Redis cache keys for task state
const TaskCacheKeys = {
  activeTask: (userId: string, taskId: string) =>
    `task:active:${userId}:${taskId}`,
  checkpoints: (taskId: string) => `task:checkpoints:${taskId}`,
  userProgress: (userId: string, subject: string) =>
    `progress:${userId}:${subject}`,
  leaderboard: (subject: string, period: string) =>
    `leaderboard:${subject}:${period}`,
};
```

### Task Validation System

```typescript
// Automatic task validation
interface TaskValidator {
  // Validate mathematical calculations
  validateMath: (
    expected: MathResult,
    actual: MathResult,
    tolerance: number,
  ) => ValidationResult;

  // Validate 3D experiments
  validate3DExperiment: (
    expected: ExperimentState,
    actual: ExperimentState,
  ) => ValidationResult;

  // Validate code/algorithm tasks
  validateCode: (expected: CodeOutput, actual: CodeOutput) => ValidationResult;

  // Validate essay/text responses
  validateText: (
    rubric: EvaluationRubric,
    response: string,
  ) => Promise<ValidationResult>;

  // Custom validation rules
  customValidation: (rules: ValidationRule[], input: any) => ValidationResult;
}

// AI-powered feedback generation
interface AIFeedback {
  // Generate hints for struggling students
  generateHint: (
    taskContext: TaskContext,
    attempts: TaskAttempt[],
  ) => Promise<string>;

  // Provide detailed explanations
  explainSolution: (task: Task, solution: any) => Promise<string>;

  // Suggest next steps
  suggestNextSteps: (
    userProgress: Progress,
    completedTask: Task,
  ) => Promise<Recommendation[]>;

  // Generate personalized practice problems
  generatePracticeProblems: (
    weakAreas: string[],
    difficulty: number,
  ) => Promise<Task[]>;
}
```

## 📊 **Analytics and Reporting**

### Learning Analytics

```typescript
interface LearningAnalytics {
  // Track learning patterns
  analyzeLearningPatterns: (
    userId: string,
    timeframe: TimeRange,
  ) => Promise<LearningInsights>;

  // Identify knowledge gaps
  identifyGaps: (userId: string, subject: string) => Promise<KnowledgeGap[]>;

  // Predict performance
  predictPerformance: (
    userId: string,
    upcomingTasks: Task[],
  ) => Promise<PerformancePrediction>;

  // Generate learning recommendations
  recommendContent: (
    userId: string,
    context: LearningContext,
  ) => Promise<ContentRecommendation[]>;
}

// Teacher dashboard analytics
interface TeacherAnalytics {
  // Class performance overview
  getClassPerformance: (
    classId: string,
    timeframe: TimeRange,
  ) => Promise<ClassMetrics>;

  // Individual student reports
  getStudentReport: (
    studentId: string,
    subjectId?: string,
  ) => Promise<StudentReport>;

  // Curriculum coverage analysis
  getCurriculumCoverage: (classId: string) => Promise<CurriculumProgress>;

  // Engagement metrics
  getEngagementMetrics: (classId: string) => Promise<EngagementData>;
}
```

This technical architecture ensures EduLab Atlas is built with scalability, maintainability, and performance in mind while adhering to modern development best practices.
