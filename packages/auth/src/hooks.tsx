import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { UserRole } from "@edulab-atlas/db";
import { type ReactNode, createContext, useContext, useEffect } from "react";

interface AuthContextType {
  role: UserRole | null;
  isLoading: boolean;
  isAdmin: boolean;
  isTeacher: boolean;
  isStudent: boolean;
}

const AuthContext = createContext<AuthContextType>({
  role: null,
  isLoading: true,
  isAdmin: false,
  isTeacher: false,
  isStudent: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const { isLoaded, sessionClaims } = useAuth();
  const role = sessionClaims?.metadata?.role as UserRole | null;

  const value = {
    role,
    isLoading: !isLoaded,
    isAdmin: role === UserRole.ADMIN,
    isTeacher: role === UserRole.TEACHER,
    isStudent: role === UserRole.STUDENT,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthRole() {
  return useContext(AuthContext);
}

export function useRequireAuth(requiredRole?: UserRole) {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();
  const { role, isLoading } = useAuthRole();

  useEffect(() => {
    if (!isLoading && isLoaded) {
      if (!isSignedIn) {
        router.push("/sign-in");
      } else if (requiredRole && role !== requiredRole) {
        router.push("/dashboard");
      }
    }
  }, [isSignedIn, isLoaded, requiredRole, role, isLoading, router]);

  return {
    isLoading: isLoading || !isLoaded,
    isAuthorized: isSignedIn && (!requiredRole || role === requiredRole),
  };
}

export function useProfile() {
  const { user, isLoaded } = useUser();
  
  return {
    user,
    isLoading: !isLoaded,
    profile: {
      id: user?.id,
      email: user?.primaryEmailAddress?.emailAddress,
      name: user?.fullName,
      imageUrl: user?.imageUrl,
      role: user?.publicMetadata?.role as UserRole,
    },
  };
} 