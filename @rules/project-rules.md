# EduLab Atlas - Project Rules & Guidelines

## 📋 Core Development Rules

### 1. Architecture Rules

- **Monorepo Structure**: All code must follow the Turborepo monorepo pattern
- **Package Separation**: Each feature must be a separate package in `packages/`
- **App Isolation**: Each application (`web`, `admin`, `api`, `lab-editor`) must be independent
- **Shared Dependencies**: Common code must be in shared packages, never duplicated

### 2. Code Quality Rules

- **TypeScript First**: All new code must be written in TypeScript
- **Function-Based**: Use functions instead of classes whenever possible (React functional components, utility functions)
- **ESLint Compliance**: Code must pass ESLint checks before commit
- **Prettier Formatting**: All code must be formatted with Prettier
- **Test Coverage**: Critical functions must have >80% test coverage
- **Documentation**: All public APIs must have JSDoc comments

### 3. Database Rules

- **Prisma Schema**: All relational data changes must go through Prisma migrations
- **MongoDB Flexibility**: Use MongoDB only for dynamic/flexible data structures
- **Redis Caching**: Cache frequently accessed data in Redis
- **Data Validation**: All database inputs must be validated with Zod schemas

### 4. Security Rules

- **Authentication**: All routes must use Clerk authentication
- **Authorization**: Implement role-based access control (student, teacher, admin)
- **Input Sanitization**: Sanitize all user inputs to prevent XSS/injection
- **Environment Variables**: Never commit secrets; use environment variables

### 5. Performance Rules

- **Bundle Size**: Keep individual package bundles under 500KB
- **Image Optimization**: All images must be optimized and use Next.js Image component
- **Lazy Loading**: Implement lazy loading for non-critical components
- **Caching Strategy**: Implement proper caching at all levels

### 6. Internationalization Rules

- **Multi-language Support**: All user-facing text must support French, Arabic, and English
- **Database Schema**: Include language-specific fields (e.g., `titleFr`, `titleAr`, `titleEn`)
- **API Language Parameter**: All content APIs must accept language parameter
- **RTL Support**: UI must support right-to-left layout for Arabic

### 7. Moroccan Curriculum Compliance

- **Official Alignment**: All content must align with official Moroccan curriculum
- **Hands-on Learning**: Every lesson must include practical, experiential components
- **Progressive Difficulty**: Content must follow official progression standards
- **Assessment Standards**: Evaluations must match official assessment criteria

### 8. Development Workflow Rules

- **Feature Branches**: Use feature branches for all development
- **Pull Request Reviews**: All PRs require at least one review
- **Commit Messages**: Use conventional commit format
- **CI/CD Pipeline**: All code must pass CI checks before deployment

### 9. 3D Lab Rules

- **Performance Optimization**: 3D scenes must maintain 60fps on mid-range devices
- **Educational Value**: All 3D interactions must have clear learning objectives
- **Accessibility**: Provide alternative non-3D learning paths
- **Save State**: Users must be able to save and resume lab progress

### 10. AI Integration Rules

- **Privacy Compliance**: AI interactions must respect user privacy
- **Educational Focus**: AI responses must be educationally appropriate
- **Fallback Systems**: Provide non-AI alternatives for all features
- **Cost Management**: Implement usage limits to control AI costs

## 🔒 Security Guidelines

### Authentication & Authorization

- Use Clerk for all authentication flows
- Implement proper session management
- Role-based permissions for all features
- Secure API endpoints with middleware

### Data Protection

- Encrypt sensitive data at rest
- Use HTTPS for all communications
- Implement proper CORS policies
- Regular security audits and updates

### User Privacy

- GDPR/privacy law compliance
- Clear data usage policies
- User consent for data collection
- Right to data deletion

## 📱 Platform Requirements

### Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Mobile Responsiveness

- iOS Safari 14+
- Android Chrome 90+
- Responsive design for all screen sizes
- Touch-friendly interactions

### Performance Targets

- First Contentful Paint < 2s
- Largest Contentful Paint < 3s
- Cumulative Layout Shift < 0.1
- First Input Delay < 100ms

## 🎯 Content Quality Standards

### Educational Content

- Curriculum-aligned lesson plans
- Clear learning objectives
- Progressive skill building
- Regular assessment points

### 3D Lab Standards

- Realistic physics simulations
- Intuitive user interfaces
- Educational value validation
- Performance optimization

### Assessment Criteria

- Formative and summative assessments
- Immediate feedback mechanisms
- Progress tracking capabilities
- Adaptive difficulty adjustment
