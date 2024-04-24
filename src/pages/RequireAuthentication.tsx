import { useEffect } from 'react';

import { Button, Typography } from '@mui/material';

import { AccountType, buildSignInPath } from '@graasp/sdk';
import { DEFAULT_LANG } from '@graasp/translations';
import { CustomInitialLoader } from '@graasp/ui';

import { Link, Outlet } from '@tanstack/react-router';

import CenteredContainer from '@/components/layout/CenteredContainer';
import { GRAASP_AUTH_HOST } from '@/config/env';
import { useAccountTranslation } from '@/config/i18n';
import { hooks } from '@/config/queryClient';
import {
  LOGIN_REQUIRED_BUTTON_ID,
  LOGIN_REQUIRED_TEXT_ID,
} from '@/config/selectors';

const RequireAuthentication = (): JSX.Element => {
  const { data: currentMember, isLoading } = hooks.useCurrentMember();

  const { i18n, t: translate } = useAccountTranslation();

  useEffect(() => {
    if (
      currentMember?.type === AccountType.Individual &&
      currentMember?.extra?.lang !== i18n.language
    ) {
      i18n
        .changeLanguage(currentMember?.extra?.lang ?? DEFAULT_LANG)
        .catch((err) => console.error(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMember]);

  const redirectionLink = new URL(
    buildSignInPath({
      host: GRAASP_AUTH_HOST,
      redirectionUrl: window.location.toString(),
    }),
  );

  if (currentMember) {
    return <Outlet />;
  }

  if (isLoading) {
    return <CustomInitialLoader />;
  }

  return (
    <CenteredContainer>
      <Typography id={LOGIN_REQUIRED_TEXT_ID}>
        {translate('LOGIN_REQUIRED')}
      </Typography>
      <Button
        component={Link}
        to={redirectionLink.toString()}
        id={LOGIN_REQUIRED_BUTTON_ID}
      >
        {translate('LOGIN_REQUIRED_BUTTON_TEXT')}
      </Button>
    </CenteredContainer>
  );
};
export default RequireAuthentication;
