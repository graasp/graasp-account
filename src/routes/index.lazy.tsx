import { Stack, Typography } from '@mui/material';

import { DEFAULT_LIGHT_PRIMARY_COLOR, GraaspLogo } from '@graasp/ui';

import { Link, createLazyFileRoute } from '@tanstack/react-router';

import { useAuth } from '@/AuthContext';
import { LeftHeaderWrapper } from '@/components/header/LeftHeaderWrapper';
import { LandingPage } from '@/components/landing/LandingPage';
import { ACCOUNT_HOME_PATH, LANDING_PAGE_PATH } from '@/config/paths';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  const { isAuthenticated } = useAuth();

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
        <LandingPage />
      </Stack>
    </Stack>
  );
}
