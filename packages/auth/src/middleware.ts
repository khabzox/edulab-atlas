import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UserRole } from "@edulab-atlas/db";

// Define routes that don't require authentication
const publicRoutes = [
  "/",
  "/login*",
  "/sign-up*",
  "/api/webhook*",
  "/about",
  "/contact",
];

// Define role-based route access
const roleRoutes = {
  [UserRole.ADMIN]: ["/admin*", "/api/admin*"],
  [UserRole.TEACHER]: ["/teacher*", "/api/teacher*"],
  [UserRole.STUDENT]: ["/student*", "/api/student*"],
};

export default authMiddleware({
  publicRoutes,
  async afterAuth(auth, req) {
    // Handle public routes
    if (publicRoutes.some(route => req.nextUrl.pathname.match(new RegExp(`^${route.replace('*', '.*')}$`)))) {
      return;
    }

    // If the user is not signed in, redirect to sign-in
    if (!auth.userId) {
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }

    // Get user's role from Clerk metadata
    const role = auth.sessionClaims?.metadata?.role as UserRole;
    
    // Check if user has access to the requested route
    const hasAccess = roleRoutes[role]?.some(route => 
      req.nextUrl.pathname.match(new RegExp(`^${route.replace('*', '.*')}$`))
    );

    // If user doesn't have access, redirect to dashboard
    if (!hasAccess) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}; 