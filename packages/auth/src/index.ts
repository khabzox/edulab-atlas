export * from "./hooks";
export { default as authMiddleware } from "./middleware";
export * from "./webhook";

// Re-export commonly used Clerk components and hooks
export {
  SignIn,
  SignUp,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
  useUser,
  useClerk,
} from "@clerk/nextjs"; 