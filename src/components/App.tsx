import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { CustomInitialLoader, withAuthorization } from '@graasp/ui';

import { GRAASP_AUTH_HOST } from '../config/constants';
import {
  AVATAR_SETTINGS_PATH,
  HOME_PATH,
  PASSWORD_SETTINGS_PATH,
  STORAGE_PATH,
  SUBSCRIPTIONS_PATH,
} from '../config/paths';
import { hooks } from '../config/queryClient';
import MainProviders from './context/MainProviders';
import AvatarSettings from './main/AvatarSettings';
import MemberProfileScreen from './main/MemberProfileScreen';
import PasswordSettings from './main/PasswordSettings';
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

  if (isLoading) {
    return <CustomInitialLoader />;
  }

  const withAuthorizationProps = {
    currentMember,
    redirectionLink: GRAASP_AUTH_HOST,
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
};

export default App;
