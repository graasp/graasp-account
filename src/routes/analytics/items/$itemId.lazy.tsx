import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Grid2, Skeleton, Stack, Typography } from '@mui/material';

import { Outlet, createLazyFileRoute } from '@tanstack/react-router';

import { NS } from '@/config/constants';

import { PageWrapper } from '~analytics/PageWrapper';
import ActionsLegend from '~analytics/charts-layout/ActionsLegend';
import StyledAlert from '~analytics/common/StyledAlert';
import { CONTAINER_HEIGHT } from '~analytics/constants';
import DataProvider, { DataContext } from '~analytics/context/DataProvider';
import ViewDataProvider, {
  ViewDataContext,
} from '~analytics/context/ViewDataProvider';

export const Route = createLazyFileRoute('/analytics/items/$itemId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { itemId } = Route.useParams();

  return (
    <DataProvider itemId={itemId}>
      <PageWrapper>
        {
          // temp disable as we need to adapt it to the current router
          <Typography color="textSecondary" p={2} bgcolor="lime">
            here we should have the navigator
          </Typography>
          /* <Navigator itemId={itemId} /> */
        }
        <ViewDataProvider>
          <ItemPage />
        </ViewDataProvider>
      </PageWrapper>
    </DataProvider>
  );
}

function ItemPage() {
  const { t } = useTranslation(NS.Analytics);
  const { view } = useContext(ViewDataContext);
  const { isLoading, actions } = useContext(DataContext);

  if (actions) {
    const types = [...new Set(actions.map((a) => a.type))];

    return (
      <Stack direction="column" p={2} alignItems="center" width="100%">
        <Outlet />
        <ActionsLegend actionsTypes={types} />
      </Stack>
    );
  }

  if (isLoading) {
    return (
      <Grid2 container spacing={2} p={2}>
        <Grid2 size={{ xs: 6 }}>
          <Skeleton variant="rectangular" height={CONTAINER_HEIGHT} />
        </Grid2>
        <Grid2 size={{ xs: 6 }}>
          <Skeleton variant="rectangular" height={CONTAINER_HEIGHT} />
        </Grid2>
        <Grid2 size={{ xs: 6 }}>
          <Skeleton variant="rectangular" height={CONTAINER_HEIGHT} />
        </Grid2>
        <Grid2 size={{ xs: 6 }}>
          <Skeleton variant="rectangular" height={CONTAINER_HEIGHT} />
        </Grid2>
      </Grid2>
    );
  }

  return (
    <Box pl={2} pr={2} mb={2} flexGrow={1}>
      <StyledAlert severity="error">
        {t('GET_ITEM_ERROR', { view })}
      </StyledAlert>
    </Box>
  );
}
