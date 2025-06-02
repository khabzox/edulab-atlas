import { useAuth as useClerkAuth, useUser } from "@clerk/nextjs";
import type { UserRole, UserSession } from "@edulab-atlas/types";

export const useAuth = () => {
    const { isLoaded, userId, sessionId } = useClerkAuth();
    const { user } = useUser();

    const role = user?.publicMetadata?.role as UserRole || "guest";

    const session: UserSession | null = user ? {
        id: userId || "",
        email: user.primaryEmailAddress?.emailAddress || "",
        role,
        firstName: user.firstName || undefined,
        lastName: user.lastName || undefined,
        imageUrl: user.imageUrl || undefined,
    } : null;

    return {
        isLoaded,
        isAuthenticated: !!userId,
        session,
        role,
    };
};

export const useAuthorization = () => {
    const { role } = useAuth();

    const checkAccess = (allowedRoles: UserRole[]) => {
        return allowedRoles.includes(role);
    };

    return {
        checkAccess,
        role,
    };
};