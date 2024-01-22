import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { Alert } from '@mui/material';

import { CustomInitialLoader, withAuthorization } from '@graasp/ui';

import { GRAASP_AUTH_HOST } from '../config/constants';
import {
  AVATAR_SETTINGS_PATH,
  DELETE_ACCOUNT_PATH,
  HOME_PATH,
  PASSWORD_SETTINGS_PATH,
  PUBLIC_PROFILE_PATH,
  STORAGE_PATH,
} from '../config/paths';
import { hooks } from '../config/queryClient';
import MainProviders from './context/MainProviders';
import AvatarSettings from './main/AvatarSettings';
import DestructiveSettingsScreen from './main/DestructiveSettingsScreen';
import MemberProfileScreen from './main/MemberProfileScreen';
import PasswordSettings from './main/PasswordSettings';
import PublicProfileScreen from './main/PublicProfileScreen';
import StockageScreen from './main/StockageScreen';

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

  const MemberProfileWithAutorization = withAuthorization(
    MemberProfileScreen,
    withAuthorizationProps,
  );
  const PasswordSettingsWithAutorization = withAuthorization(
    PasswordSettings,
    withAuthorizationProps,
  );
  const AvatarSettingsWithAutorization = withAuthorization(
    AvatarSettings,
    withAuthorizationProps,
  );
  const StockageWithAutorization = withAuthorization(
    StockageScreen,
    withAuthorizationProps,
  );
  const PublicProfileWithAutorization = withAuthorization(
    PublicProfileScreen,
    withAuthorizationProps,
  );
  const DestructiveSettingsWithAuthoriztion = withAuthorization(
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
              element={<MemberProfileWithAutorization />}
            />
            <Route
              path={PASSWORD_SETTINGS_PATH}
              element={<PasswordSettingsWithAutorization />}
            />
            <Route
              path={AVATAR_SETTINGS_PATH}
              element={<AvatarSettingsWithAutorization />}
            />
            <Route
              path={PUBLIC_PROFILE_PATH}
              element={<PublicProfileWithAutorization />}
            />
            <Route
              path={DELETE_ACCOUNT_PATH}
              element={<DestructiveSettingsWithAuthoriztion />}
            />
            <Route path={STORAGE_PATH} element={<StockageWithAutorization />} />

            {/*
          <Route
            path={PAYMENT_OPTIONS_PATH}
            exact
            element={<PaymentOptionsWithAutorization />}
          />
          <Route
            path={`${PAYMENT_CONFIRM_PATH}/:id`}
            element={<PayementConfirmationWithAutorization />}
          /> */}
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
