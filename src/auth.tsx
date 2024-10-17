import * as React from 'react';

import { hooks, mutations } from './config/queryClient';

type LoginInput = {
  email: string;
  captcha: string;
  url?: string;
};
export type AuthContextType =
  | {
      isAuthenticated: true;
      user: { name: string; id: string };
      logout: () => Promise<void>;
      login: null;
    }
  | {
      isAuthenticated: false;
      user: null;
      logout: null;
      login: (args: LoginInput) => Promise<void>;
    };

const AuthContext = React.createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const useCurrentMember = hooks.useCurrentMember();

  const useLogin = mutations.useSignIn();
  const useLogout = mutations.useSignOut();

  const logout = React.useCallback(async () => {
    await useLogout.mutateAsync();
  }, [useLogout]);

  const login = React.useCallback(
    async (args: LoginInput) => {
      await useLogin.mutateAsync(args);
    },
    [useLogin],
  );

  const value = useCurrentMember.data
    ? {
        isAuthenticated: true as const,
        user: {
          name: useCurrentMember.data.name,
          id: useCurrentMember.data.id,
        },
        logout,
        login: null,
      }
    : { isAuthenticated: false as const, user: null, login, logout: null };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
