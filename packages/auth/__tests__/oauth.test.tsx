import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useOAuth, OAuthProvider } from "../src/oauth";

// Mock Clerk
vi.mock("@clerk/nextjs", () => ({
  useClerk: () => ({
    user: {
      createExternalAccount: vi.fn(),
      deleteExternalAccount: vi.fn(),
      externalAccounts: [
        {
          id: "ext_123",
          provider: "google",
          emailAddress: "test@example.com",
          username: "testuser",
        },
      ],
    },
  }),
}));

describe("OAuth Hook", () => {
  const mockProvider: OAuthProvider = "google";
  const mockAccountId = "ext_123";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should connect provider successfully", async () => {
    const { result } = renderHook(() => useOAuth());

    await act(async () => {
      const connectResult = await result.current.connectProvider(mockProvider);
      expect(connectResult.success).toBe(true);
      expect(connectResult.provider).toBe(mockProvider);
    });
  });

  it("should disconnect provider successfully", async () => {
    const { result } = renderHook(() => useOAuth());

    await act(async () => {
      const disconnectResult = await result.current.disconnectProvider(mockAccountId);
      expect(disconnectResult).toBe(true);
    });
  });

  it("should get connected providers", () => {
    const { result } = renderHook(() => useOAuth());

    const providers = result.current.getConnectedProviders();
    expect(providers).toHaveLength(1);
    expect(providers[0].provider).toBe("google");
    expect(providers[0].emailAddress).toBe("test@example.com");
  });

  it("should check if provider is connected", () => {
    const { result } = renderHook(() => useOAuth());

    expect(result.current.isConnected("google")).toBe(true);
    expect(result.current.isConnected("github")).toBe(false);
  });
}); 