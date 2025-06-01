import { useClerk } from "@clerk/nextjs";
import { useCallback } from "react";

export type OAuthProvider =
  | "google"
  | "github"
  | "microsoft"
  | "facebook"
  | "discord";

interface OAuthConfig {
  provider: OAuthProvider;
  clientId: string;
  clientSecret: string;
  scopes?: string[];
}

export function useOAuth() {
  const { user } = useClerk();

  const connectProvider = useCallback(async (provider: OAuthProvider) => {
    if (!user) throw new Error("No user found");

    try {
      const oauthResult = await user.createExternalAccount({
        strategy: provider,
      });

      return {
        success: true,
        accountId: oauthResult.id,
        provider,
      };
    } catch (error) {
      console.error(`Error connecting ${provider}:`, error);
      throw error;
    }
  }, [user]);

  const disconnectProvider = useCallback(async (accountId: string) => {
    if (!user) throw new Error("No user found");

    try {
      await user.deleteExternalAccount(accountId);
      return true;
    } catch (error) {
      console.error("Error disconnecting provider:", error);
      throw error;
    }
  }, [user]);

  const getConnectedProviders = useCallback(() => {
    if (!user) return [];

    return user.externalAccounts.map(account => ({
      id: account.id,
      provider: account.provider as OAuthProvider,
      emailAddress: account.emailAddress,
      username: account.username,
    }));
  }, [user]);

  return {
    connectProvider,
    disconnectProvider,
    getConnectedProviders,
    isConnected: (provider: OAuthProvider) =>
      user?.externalAccounts.some(account => account.provider === provider) ?? false,
  };
}

// OAuth Provider Configuration
export const oauthProviders: Record<OAuthProvider, { name: string; icon: string }> = {
  google: {
    name: "Google",
    icon: "google",
  },
  github: {
    name: "GitHub",
    icon: "github",
  },
  microsoft: {
    name: "Microsoft",
    icon: "microsoft",
  },
  facebook: {
    name: "Facebook",
    icon: "facebook",
  },
  discord: {
    name: "Discord",
    icon: "discord",
  },
};

// OAuth Scopes Configuration
export const defaultScopes: Record<OAuthProvider, string[]> = {
  google: ["profile", "email"],
  github: ["user", "user:email"],
  microsoft: ["user.read", "email"],
  facebook: ["email", "public_profile"],
  discord: ["identify", "email"],
}; 