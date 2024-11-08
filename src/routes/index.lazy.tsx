import { Stack, Typography } from '@mui/material';

import {
  DEFAULT_BACKGROUND_COLOR,
  GraaspLogo,
  useButtonColor,
  useMobileView,
} from '@graasp/ui';

import { Link, createLazyFileRoute } from '@tanstack/react-router';

import { useAuth } from '@/AuthContext';
import { ACCOUNT_HOME_PATH, LANDING_PAGE_PATH } from '@/config/paths';

import { Footer } from '~landing/footer/Footer';
import { RightHeader } from '~landing/header/RightHeader';
import { OurMissionSection } from '~landing/home/OurMissionSection';
import { PuzzleSection } from '~landing/home/PuzzleSection';
import { TitleSection } from '~landing/home/TitleSection';
import { UserStorySection } from '~landing/home/UserStorySection';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  const { isAuthenticated } = useAuth();
  const { isMobile } = useMobileView();
  const { fill: primary } = useButtonColor('primary');

  return (
    <Stack alignItems="center" id="pageWrapper">
      <Stack
        id="navBar"
        // take maximum width
        width="100%"
        // make some room around the buttons
        p={2}
        gap={2}
        bgcolor="white"
        position="fixed"
        top="0px"
        sx={{
          boxShadow: (theme) => theme.shadows[3],
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Stack
          direction="row"
          maxWidth="lg"
          // take maximum width
          width="100%"
          m="auto"
          // separate the logo part from the buttons part
          justifyContent="space-between"
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
            <GraaspLogo height={44} sx={{ fill: primary! }} />
            {!isMobile && (
              <Typography fontWeight="bold" variant="h2" color="primary">
                Graasp
              </Typography>
            )}
          </Stack>
          <RightHeader />
        </Stack>
      </Stack>
      <Stack
        id="bodyWrapper"
        direction="column"
        width="100%"
        alignItems="center"
        mt={
          // compensate the nav bar height
          10
        }
        p={4}
        pb={
          // give some breathing room before the footer
          15
        }
        gap={15}
        bgcolor={DEFAULT_BACKGROUND_COLOR}
      >
        <TitleSection />
        <PuzzleSection />
        <UserStorySection />
        <OurMissionSection />
      </Stack>
      <Footer />
    </Stack>
  );
}
