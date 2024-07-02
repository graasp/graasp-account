import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Routes } from 'react-router-dom';

import { Alert } from '@mui/material';

import { buildSignInPath } from '@graasp/sdk';
import { CustomInitialLoader, withAuthorization } from '@graasp/ui';

import EditMemberPreferences from './components/main/EditMemberPreferences';
import { GRAASP_AUTH_HOST } from './config/env';
import {
  EDIT_MEMBER_INFO,
  EDIT_MEMBER_PREFERENCES,
  HOME_PATH,
  MANAGE_ACCOUNT_PATH,
  PASSWORD_SETTINGS_PATH,
  PROFILE_PATH,
  PUBLIC_PROFILE_PATH,
  STORAGE_PATH,
} from './config/paths';
import { hooks } from './config/queryClient';
import EditMemberPersonalInformation from './pages/EditMemberPersonalInformation';
import EditPublicProfileScreen from './pages/EditPublicProfileScreen';
import HomePage from './pages/HomePage';
import MemberProfileScreen from './pages/MemberProfileScreen';
import PageWrapper from './pages/PageWrapper';
import PasswordSettingsScreen from './pages/PasswordSettingsScreen';
import SettingsScreen from './pages/SettingsScreen';
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

  const redirectionLink = new URL(
    buildSignInPath({
      host: GRAASP_AUTH_HOST,
      redirectionUrl: window.location.toString(),
    }),
  );
  const withAuthorizationProps = {
    currentMember,
    redirectionLink: redirectionLink.toString(),
  };

  const HomePageWithAuthorization = withAuthorization(
    HomePage,
    withAuthorizationProps,
  );
  const MemberProfileWithAuthorization = withAuthorization(
    MemberProfileScreen,
    withAuthorizationProps,
  );
  const EditMemberProfileWithAuthorization = withAuthorization(
    EditMemberPersonalInformation,
    withAuthorizationProps,
  );
  const PasswordSettingsWithAuthorization = withAuthorization(
    PasswordSettingsScreen,
    withAuthorizationProps,
  );
  const StorageWithAuthorization = withAuthorization(
    StorageScreen,
    withAuthorizationProps,
  );
  const PublicProfileWithAuthorization = withAuthorization(
    EditPublicProfileScreen,
    withAuthorizationProps,
  );
  const SettingsWithAuthorization = withAuthorization(
    SettingsScreen,
    withAuthorizationProps,
  );
  const EditPreferencesWithAuthorization = withAuthorization(
    EditMemberPreferences,
    withAuthorizationProps,
  );

  if (currentMember) {
    return (
      <Routes>
        <Route element={<PageWrapper />}>
          <Route path={HOME_PATH} element={<HomePageWithAuthorization />} />
          <Route
            path={PROFILE_PATH}
            element={<MemberProfileWithAuthorization />}
          />
          <Route
            path={EDIT_MEMBER_INFO}
            element={<EditMemberProfileWithAuthorization />}
          />
          <Route
            path={PASSWORD_SETTINGS_PATH}
            element={<PasswordSettingsWithAuthorization />}
          />
          <Route
            path={PUBLIC_PROFILE_PATH}
            element={<PublicProfileWithAuthorization />}
          />
          <Route
            path={MANAGE_ACCOUNT_PATH}
            element={<SettingsWithAuthorization />}
          />
          <Route
            path={EDIT_MEMBER_PREFERENCES}
            element={<EditPreferencesWithAuthorization />}
          />
          <Route path={STORAGE_PATH} element={<StorageWithAuthorization />} />
        </Route>
      </Routes>
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
