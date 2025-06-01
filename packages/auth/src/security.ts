import { z } from "zod";
import { useClerk } from "@clerk/nextjs";
import { useCallback } from "react";

// Password validation schema
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character");

// 2FA Management Hook
export function useTwoFactorAuth() {
  const { user } = useClerk();

  const enable2FA = useCallback(async () => {
    if (!user) throw new Error("No user found");

    try {
      // Start the 2FA enrollment process
      const factor = await user.createTOTP();
      
      return {
        secret: factor.secret,
        qrCode: factor.totp.qrCodeUrl,
      };
    } catch (error) {
      console.error("Error enabling 2FA:", error);
      throw error;
    }
  }, [user]);

  const verify2FA = useCallback(async (code: string) => {
    if (!user) throw new Error("No user found");

    try {
      const factor = await user.twoFactorAuth.attemptVerification({
        code,
      });
      return factor.verified;
    } catch (error) {
      console.error("Error verifying 2FA:", error);
      throw error;
    }
  }, [user]);

  const disable2FA = useCallback(async () => {
    if (!user) throw new Error("No user found");

    try {
      await user.twoFactorAuth.disable();
      return true;
    } catch (error) {
      console.error("Error disabling 2FA:", error);
      throw error;
    }
  }, [user]);

  return {
    enable2FA,
    verify2FA,
    disable2FA,
    isEnabled: user?.twoFactorEnabled ?? false,
  };
}

// Session Management Hook
export function useSession() {
  const { sessions, signOut } = useClerk();

  const activeSessions = sessions?.filter(session => !session.expireAt) ?? [];
  const expiredSessions = sessions?.filter(session => session.expireAt) ?? [];

  const revokeSession = useCallback(async (sessionId: string) => {
    try {
      await signOut({ sessionId });
      return true;
    } catch (error) {
      console.error("Error revoking session:", error);
      throw error;
    }
  }, [signOut]);

  const revokeAllSessions = useCallback(async () => {
    try {
      await signOut();
      return true;
    } catch (error) {
      console.error("Error revoking all sessions:", error);
      throw error;
    }
  }, [signOut]);

  return {
    activeSessions,
    expiredSessions,
    revokeSession,
    revokeAllSessions,
  };
}

// Rate Limiting Utility
export class RateLimiter {
  private attempts: Map<string, { count: number; resetTime: number }>;
  private maxAttempts: number;
  private windowMs: number;

  constructor(maxAttempts = 5, windowMs = 15 * 60 * 1000) {
    this.attempts = new Map();
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  checkRateLimit(key: string): boolean {
    const now = Date.now();
    const attempt = this.attempts.get(key);

    if (!attempt) {
      this.attempts.set(key, { count: 1, resetTime: now + this.windowMs });
      return true;
    }

    if (now > attempt.resetTime) {
      this.attempts.set(key, { count: 1, resetTime: now + this.windowMs });
      return true;
    }

    if (attempt.count >= this.maxAttempts) {
      return false;
    }

    attempt.count++;
    return true;
  }

  getRemainingAttempts(key: string): number {
    const now = Date.now();
    const attempt = this.attempts.get(key);

    if (!attempt || now > attempt.resetTime) {
      return this.maxAttempts;
    }

    return Math.max(0, this.maxAttempts - attempt.count);
  }

  getResetTime(key: string): number | null {
    const attempt = this.attempts.get(key);
    return attempt ? attempt.resetTime : null;
  }
} 