import { useTranslation } from 'react-i18next';

import { createFileRoute } from '@tanstack/react-router';

import { NS } from '@/config/constants';

import ChartsAlerts from '~analytics/charts-layout/ChartsAlerts';
import ChartsHeader from '~analytics/charts-layout/ChartsHeader';
import ItemsAnalytics from '~analytics/charts-layout/ItemsAnalytics';
import SectionTitle from '~analytics/common/SectionTitle';

export const Route = createFileRoute('/analytics/items/$itemId/items')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation(NS.Analytics);

  return (
    <>
      <ChartsHeader />
      <ChartsAlerts />
      <SectionTitle title={t('ITEMS_ANALYTICS_TITLE')} />
      <ItemsAnalytics />
    </>
  );
}
