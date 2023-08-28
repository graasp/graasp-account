import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { CustomInitialLoader, withAuthorization } from '@graasp/ui';

import { SIGN_IN_PATH } from '../config/constants';
import {
  AVATAR_SETTINGS_PATH,
  HOME_PATH,
  PASSWORD_SETTINGS_PATH,
} from '../config/paths';
import { hooks } from '../config/queryClient';
import MainProviders from './context/MainProviders';
import AvatarSettings from './main/AvatarSettings';
import MemberProfileScreen from './main/MemberProfileScreen';
import PasswordSettings from './main/PasswordSettings';

export const App = () => {
  const { data: currentMember, isLoading } = hooks.useCurrentMember();

  if (isLoading) {
    return <CustomInitialLoader />;
  }

  const withAuthorizationProps = {
    currentMember,
    redirectionLink: SIGN_IN_PATH,
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
  return (
    <MainProviders>
      <Router>
        <Routes>
          <Route path={HOME_PATH} element={<MemberProfileWithAutorization />} />
          <Route
            path={PASSWORD_SETTINGS_PATH}
            element={<PasswordSettingsWithAutorization />}
          />
          <Route
            path={AVATAR_SETTINGS_PATH}
            element={<AvatarSettingsWithAutorization />}
          />
          {/* <Route
            path={SUBSCRIPTIONS_PATH}
            exact
            element={<SubscriptionsWithAutorization />}
          />
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
};

export default App;
