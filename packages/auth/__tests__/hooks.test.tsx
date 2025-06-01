import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useAuthRole, useRequireAuth, useProfile, AuthProvider } from "../src/hooks";
import { UserRole } from "@edulab-atlas/db";

// Mock Next.js router
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// Mock Clerk
vi.mock("@clerk/nextjs", () => ({
  useAuth: () => ({
    isLoaded: true,
    isSignedIn: true,
    sessionClaims: {
      metadata: {
        role: "TEACHER",
      },
    },
  }),
  useUser: () => ({
    isLoaded: true,
    user: {
      id: "user_123",
      primaryEmailAddress: {
        emailAddress: "teacher@example.com",
      },
      fullName: "Test Teacher",
      imageUrl: "https://example.com/avatar.jpg",
      publicMetadata: {
        role: "TEACHER",
      },
    },
  }),
}));

describe("Authentication Hooks", () => {
  describe("useAuthRole", () => {
    it("should provide role and status flags", () => {
      const { result } = renderHook(() => useAuthRole(), {
        wrapper: AuthProvider,
      });

      expect(result.current.role).toBe(UserRole.TEACHER);
      expect(result.current.isTeacher).toBe(true);
      expect(result.current.isAdmin).toBe(false);
      expect(result.current.isStudent).toBe(false);
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe("useRequireAuth", () => {
    it("should allow access with correct role", () => {
      const { result } = renderHook(() => useRequireAuth(UserRole.TEACHER), {
        wrapper: AuthProvider,
      });

      expect(result.current.isAuthorized).toBe(true);
      expect(result.current.isLoading).toBe(false);
    });

    it("should deny access with incorrect role", () => {
      const { result } = renderHook(() => useRequireAuth(UserRole.ADMIN), {
        wrapper: AuthProvider,
      });

      expect(result.current.isAuthorized).toBe(false);
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe("useProfile", () => {
    it("should provide user profile information", () => {
      const { result } = renderHook(() => useProfile());

      expect(result.current.isLoading).toBe(false);
      expect(result.current.profile).toEqual({
        id: "user_123",
        email: "teacher@example.com",
        name: "Test Teacher",
        imageUrl: "https://example.com/avatar.jpg",
        role: UserRole.TEACHER,
      });
    });
  });
}); 