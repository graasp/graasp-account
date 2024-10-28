import { Stack, Typography } from '@mui/material';

import { Button, DEFAULT_LIGHT_PRIMARY_COLOR, GraaspLogo } from '@graasp/ui';

import { Link, createFileRoute } from '@tanstack/react-router';

import { useAuth } from '@/auth';
import { LeftHeaderWrapper } from '@/components/header/LeftHeaderWrapper';
import { useAccountTranslation } from '@/config/i18n';
import { ACCOUNT_HOME_PATH, LANDING_PAGE_PATH } from '@/config/paths';
import { ACCOUNT } from '@/langs/constants';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const { isAuthenticated } = useAuth();
  const { t } = useAccountTranslation();

  return (
    <Stack alignItems="center" height="100svh" id="pageWrapper">
      <Stack
        id="titleWrapper"
        direction="row"
        // take maximum width
        width="100%"
        // separate the logo part from the buttons part
        justifyContent="space-between"
        // make some room around the buttons
        p={2}
        gap={2}
        bgcolor={DEFAULT_LIGHT_PRIMARY_COLOR.main}
      >
        <Stack
          direction="row"
          alignItems="center"
          id="rightTitleWrapper"
          component={Link}
          to={isAuthenticated ? ACCOUNT_HOME_PATH : LANDING_PAGE_PATH}
          // override link styling
          sx={{ textDecoration: 'none', color: 'inherit' }}
          gap={1}
        >
          <GraaspLogo height={44} />
          <Typography fontWeight="bold" variant="h2">
            Graasp
          </Typography>
        </Stack>
        <LeftHeaderWrapper />
      </Stack>
      <Stack
        id="bodyWrapper"
        direction="column"
        width="100%"
        alignItems="center"
        p={2}
        gap={2}
      >
        <Typography>
          {t(ACCOUNT.TEMPORARY_MOVED_ACCOUNT_HOME_PAGE_MESSAGE)}
        </Typography>
        <Link to={ACCOUNT_HOME_PATH}>
          <Button>{t(ACCOUNT.HERE_BUTTON)}</Button>
        </Link>
      </Stack>
    </Stack>
  );
}
