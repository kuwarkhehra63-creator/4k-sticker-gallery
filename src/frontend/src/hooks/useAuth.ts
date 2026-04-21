import { useInternetIdentity } from "@caffeineai/core-infrastructure";

export function useAuth() {
  const {
    identity,
    login,
    clear,
    loginStatus,
    isAuthenticated,
    isLoggingIn,
    isInitializing,
  } = useInternetIdentity();

  const principal = identity?.getPrincipal();
  const principalText = principal?.toText();

  return {
    login,
    logout: clear,
    isAuthenticated,
    isLoggingIn,
    isInitializing,
    loginStatus,
    identity,
    principal,
    principalText,
  };
}
