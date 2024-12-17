import { useTranslation } from 'react-i18next';

import { Stack } from '@mui/material';

import { createFileRoute } from '@tanstack/react-router';

import { NS } from '@/config/constants';

import ChartsAlerts from '~analytics/charts-layout/ChartsAlerts';
import ChartsArea from '~analytics/charts-layout/ChartsArea';
import ChartsHeader from '~analytics/charts-layout/ChartsHeader';
import ActiveUsersCard from '~analytics/charts/ActionsCard';
import ActiveUsersChart from '~analytics/charts/ActiveUsersChart';
import SectionTitle from '~analytics/common/SectionTitle';

export const Route = createFileRoute('/analytics/items/$itemId/')({
  component: GeneralAnalyticsPage,
});

function GeneralAnalyticsPage(): JSX.Element {
  const { t } = useTranslation(NS.Analytics);

  return (
    <>
      <ChartsHeader />
      <ChartsAlerts />
      <SectionTitle title={t('GENERAL_ANALYTICS_TITLE')} />
      <Stack direction={{ sm: 'column', md: 'row' }} alignItems="center">
        <ActiveUsersCard />
        <ActiveUsersChart />
      </Stack>
      <ChartsArea />
    </>
  );
}
