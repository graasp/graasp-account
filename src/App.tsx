import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { Alert } from '@mui/material';

import { CustomInitialLoader, withAuthorization } from '@graasp/ui';

import MainProviders from './components/context/MainProviders';
import { GRAASP_AUTH_HOST } from './config/constants';
import {
  AVATAR_SETTINGS_PATH,
  HOME_PATH,
  MANAGE_ACCOUNT_PATH,
  PASSWORD_SETTINGS_PATH,
  PUBLIC_PROFILE_PATH,
  STORAGE_PATH,
} from './config/paths';
import { hooks } from './config/queryClient';
import AvatarSettingsScreen from './pages/AvatarSettingsScreen';
import DestructiveSettingsScreen from './pages/DestructiveSettingsScreen';
import MemberScreen from './pages/MemberScreen';
import PasswordSettingsScreen from './pages/PasswordSettingsScreen';
import PublicProfileScreen from './pages/PublicProfileScreen';
import StorageScreen from './pages/StorageScreen';

export const App = (): JSX.Element => {
  const { data: currentMember, isLoading } = hooks.useCurrentMember();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (currentMember?.extra?.lang !== i18n.language) {
      i18n.changeLanguage(currentMember?.extra?.lang ?? 'en');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMember]);

  const redirectionLink = new URL(GRAASP_AUTH_HOST);
  redirectionLink.searchParams.set('url', window.location.toString());
  const withAuthorizationProps = {
    currentMember,
    redirectionLink: redirectionLink.toString(),
  };

  const MemberProfileWithAuthorization = withAuthorization(
    MemberScreen,
    withAuthorizationProps,
  );
  const PasswordSettingsWithAuthorization = withAuthorization(
    PasswordSettingsScreen,
    withAuthorizationProps,
  );
  const AvatarSettingsWithAuthorization = withAuthorization(
    AvatarSettingsScreen,
    withAuthorizationProps,
  );
  const StorageWithAuthorization = withAuthorization(
    StorageScreen,
    withAuthorizationProps,
  );
  const PublicProfileWithAuthorization = withAuthorization(
    PublicProfileScreen,
    withAuthorizationProps,
  );
  const DestructiveSettingsWithAuthorization = withAuthorization(
    DestructiveSettingsScreen,
    withAuthorizationProps,
  );

  if (currentMember) {
    return (
      <MainProviders>
        <Router>
          <Routes>
            <Route
              path={HOME_PATH}
              element={<MemberProfileWithAuthorization />}
            />
            <Route
              path={PASSWORD_SETTINGS_PATH}
              element={<PasswordSettingsWithAuthorization />}
            />
            <Route
              path={AVATAR_SETTINGS_PATH}
              element={<AvatarSettingsWithAuthorization />}
            />
            <Route
              path={PUBLIC_PROFILE_PATH}
              element={<PublicProfileWithAuthorization />}
            />
            <Route
              path={MANAGE_ACCOUNT_PATH}
              element={<DestructiveSettingsWithAuthorization />}
            />
            <Route path={STORAGE_PATH} element={<StorageWithAuthorization />} />
          </Routes>
        </Router>
      </MainProviders>
    );
  }

  if (isLoading) {
    return <CustomInitialLoader />;
  }
  const ErrorWithAuthorization = withAuthorization(
    () => <Alert severity="error">Could not get member</Alert>,
    withAuthorizationProps,
  );
  return <ErrorWithAuthorization />;
};

export default App;
