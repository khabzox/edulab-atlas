import { passwordSchema, RateLimiter } from "../src/security";
import { describe, it, expect, beforeEach } from "vitest";

describe("Password Validation", () => {
  const validPassword = "Test123!@#";
  const invalidPasswords = {
    tooShort: "Abc1!",
    noUppercase: "test123!@#",
    noLowercase: "TEST123!@#",
    noNumber: "TestAbc!@#",
    noSpecial: "Test123abc",
  };

  it("should accept valid password", () => {
    const result = passwordSchema.safeParse(validPassword);
    expect(result.success).toBe(true);
  });

  it("should reject password that's too short", () => {
    const result = passwordSchema.safeParse(invalidPasswords.tooShort);
    expect(result.success).toBe(false);
  });

  it("should reject password without uppercase", () => {
    const result = passwordSchema.safeParse(invalidPasswords.noUppercase);
    expect(result.success).toBe(false);
  });

  it("should reject password without lowercase", () => {
    const result = passwordSchema.safeParse(invalidPasswords.noLowercase);
    expect(result.success).toBe(false);
  });

  it("should reject password without number", () => {
    const result = passwordSchema.safeParse(invalidPasswords.noNumber);
    expect(result.success).toBe(false);
  });

  it("should reject password without special character", () => {
    const result = passwordSchema.safeParse(invalidPasswords.noSpecial);
    expect(result.success).toBe(false);
  });
});

describe("Rate Limiter", () => {
  let rateLimiter: RateLimiter;
  const testKey = "test-user";

  beforeEach(() => {
    rateLimiter = new RateLimiter(3, 1000); // 3 attempts per second for testing
  });

  it("should allow initial attempts", () => {
    expect(rateLimiter.checkRateLimit(testKey)).toBe(true);
    expect(rateLimiter.getRemainingAttempts(testKey)).toBe(2);
  });

  it("should block after max attempts", () => {
    expect(rateLimiter.checkRateLimit(testKey)).toBe(true);
    expect(rateLimiter.checkRateLimit(testKey)).toBe(true);
    expect(rateLimiter.checkRateLimit(testKey)).toBe(true);
    expect(rateLimiter.checkRateLimit(testKey)).toBe(false);
  });

  it("should track remaining attempts correctly", () => {
    expect(rateLimiter.getRemainingAttempts(testKey)).toBe(3);
    rateLimiter.checkRateLimit(testKey);
    expect(rateLimiter.getRemainingAttempts(testKey)).toBe(2);
    rateLimiter.checkRateLimit(testKey);
    expect(rateLimiter.getRemainingAttempts(testKey)).toBe(1);
  });

  it("should return reset time", () => {
    rateLimiter.checkRateLimit(testKey);
    const resetTime = rateLimiter.getResetTime(testKey);
    expect(resetTime).toBeDefined();
    expect(typeof resetTime).toBe("number");
    expect(resetTime).toBeGreaterThan(Date.now());
  });
}); 