import * as React from 'react';

import { getCurrentAccountLang } from '@graasp/sdk';
import { DEFAULT_LANG } from '@graasp/translations';
import { CustomInitialLoader } from '@graasp/ui';

import { hooks, mutations } from './config/queryClient';

type LoginInput = {
  email: string;
  captcha: string;
  url?: string;
};

type AuthContextLoggedMember = {
  isAuthenticated: true;
  user: {
    name: string;
    id: string;
    lang: string;
  };
  logout: () => Promise<void>;
  login: null;
};
type AuthContextSignedOut = {
  isAuthenticated: false;
  user: null;
  logout: null;
  login: (args: LoginInput) => Promise<void>;
};
/**
 * Auth context used inside the router to know if the user is logged in
 */
export type AuthContextType = AuthContextLoggedMember | AuthContextSignedOut;

const AuthContext = React.createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const { data: currentMember, isPending } = hooks.useCurrentMember();

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

  // if the query has not resolved yet, we can not render the rest of the tree
  if (isPending) {
    return <CustomInitialLoader />;
  }

  const value = currentMember
    ? {
        isAuthenticated: true as const,
        user: {
          name: currentMember.name,
          id: currentMember.id,
          lang:
            // FIX: type of the function should be correctly inferred when the member is not nullable
            getCurrentAccountLang(currentMember, DEFAULT_LANG) ?? DEFAULT_LANG,
        },
        logout,
        login: null,
      }
    : { isAuthenticated: false as const, user: null, login, logout: null };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Auth context accessible via the router to know if the user is logged in
 */
export function useAuth(): AuthContextType {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
