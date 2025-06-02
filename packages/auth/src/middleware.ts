import { authMiddleware } from "@clerk/nextjs/server";
import type { AuthObject } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { UserRole } from "@edulab-atlas/types";

// Define routes that don't require authentication
const publicRoutes = [
    "/",
    "/login*",
    "/sign-up*",
    "/api/webhook/clerk",
];

// Define role-based route access
const roleRoutes: Record<UserRole, string[]> = {
    admin: ["/admin*", "/dashboard*"],
    teacher: ["/dashboard*", "/courses*"],
    student: ["/dashboard*", "/courses*", "/assignments*"],
    guest: ["/courses/preview*"]
};

export default authMiddleware({
    publicRoutes,
    afterAuth: (auth: AuthObject, req) => {
        // Handle public routes
        if (publicRoutes.some(route =>
            req.nextUrl.pathname.match(new RegExp(`^${route.replace('*', '.*')}$`)))) {
            return NextResponse.next();
        }

        // If the user is not signed in and the route is not public, redirect to sign-in
        if (!auth.userId) {
            const signInUrl = new URL('/sign-in', req.url);
            signInUrl.searchParams.set('redirect_url', req.url);
            return NextResponse.redirect(signInUrl);
        }

        // Get user's role from public metadata
        const metadata = auth.sessionClaims?.publicMetadata as { role?: UserRole } | undefined;
        const role = metadata?.role || 'guest';

        // Check if user has access to the requested route
        const hasAccess = roleRoutes[role]?.some(route =>
            req.nextUrl.pathname.match(new RegExp(`^${route.replace('*', '.*')}$`)));

        if (!hasAccess) {
            // Redirect to dashboard or show unauthorized page
            return NextResponse.redirect(new URL('/unauthorized', req.url));
        }

        return NextResponse.next();
    },
});

// Specify which routes to run the middleware on
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};