 # @edulab-atlas/auth

Authentication and authorization package for EduLab Atlas using Clerk.

## Features

- 🔐 Role-based access control (RBAC)
- 🚦 Middleware for route protection
- 🎣 Authentication hooks
- 👤 User profile management utilities

## Installation

```bash
npm install @clerk/nextjs
```

## Setup

1. Add your Clerk environment variables to `.env`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
```

2. Configure middleware in your app:

```typescript
// app/middleware.ts
export { authMiddleware as middleware } from "@edulab-atlas/auth";
```

## Usage

### Authentication Hooks

```typescript
import { useAuth, useAuthorization } from "@edulab-atlas/auth";

// Get authentication state and user session
const MyComponent = () => {
  const { isLoaded, isAuthenticated, session } = useAuth();
  
  if (!isLoaded) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Please sign in</div>;
  
  return <div>Welcome {session?.firstName}!</div>;
};

// Check role-based access
const AdminPanel = () => {
  const { checkAccess } = useAuthorization();
  
  if (!checkAccess(['admin'])) {
    return <div>Unauthorized</div>;
  }
  
  return <div>Admin Panel</div>;
};
```

### User Management Utilities

```typescript
import { getCurrentUser, updateUserRole, deleteUser } from "@edulab-atlas/auth";

// Get current user
const user = await getCurrentUser();

// Update user role
await updateUserRole(userId, 'teacher');

// Delete user
await deleteUser(userId);
```

## Role-Based Routes

Default route access by role:

- **Admin**: `/admin/*`, `/dashboard/*`
- **Teacher**: `/dashboard/*`, `/courses/*`
- **Student**: `/dashboard/*`, `/courses/*`, `/assignments/*`
- **Guest**: `/courses/preview/*`

Public routes (no authentication required):
- `/`
- `/login*`
- `/sign-up*`
- `/api/webhook/clerk`

## Types

The package uses types from `@edulab-atlas/types`:

```typescript
type UserRole = 'admin' | 'teacher' | 'student' | 'guest';

interface UserSession {
  id: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
}
```

## Contributing

Please refer to the main project's CONTRIBUTING.md for guidelines on contributing to this package.