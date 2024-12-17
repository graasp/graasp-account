import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import {
  ActionTriggers,
  AggregateBy,
  AggregateFunction,
  AggregateMetric,
  CountGroupBy,
} from '@graasp/sdk';

import { endOfDay } from 'date-fns/endOfDay';
import { formatISO } from 'date-fns/formatISO';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';

import { NS } from '@/config/constants';
import { hooks } from '@/config/queryClient';

import { DataContext } from '~analytics/context/DataProvider';
import { ViewDataContext } from '~analytics/context/ViewDataProvider';

import ActionChartLabel from '../charts-layout/ActionChartLabel';
import ChartContainer from '../common/ChartContainer';
import ChartTitle from '../common/ChartTitle';
import {
  DEFAULT_REQUEST_SAMPLE_SIZE,
  getColorForActionTriggerType,
} from '../constants';
import { EmptyChart } from './EmptyChart';

const TotalActionsByVerbChart = (): JSX.Element | null => {
  const { t } = useTranslation(NS.Analytics);
  const { t: translateActions } = useTranslation(NS.Enums);
  const { selectedActionTypes, dateRange, itemId } = useContext(DataContext);
  const { view } = useContext(ViewDataContext);

  // get aggregate actions
  const {
    data: aggregateData,
    isLoading,
    isError,
  } = hooks.useAggregateActions(itemId, {
    view,
    requestedSampleSize: DEFAULT_REQUEST_SAMPLE_SIZE,
    type: selectedActionTypes,
    countGroupBy: [CountGroupBy.User, CountGroupBy.ActionType],
    aggregateFunction: AggregateFunction.Sum,
    aggregateMetric: AggregateMetric.ActionCount,
    aggregateBy: [AggregateBy.ActionType],
    startDate: formatISO(dateRange.startDate),
    endDate: formatISO(endOfDay(dateRange.endDate)),
  });

  if (isLoading) {
    return null;
  }

  const title = t('TOTAL_ACTIONS_DISTRIBUTIONS');
  if (!aggregateData?.length) {
    return <EmptyChart chartTitle={title} isError={isError} />;
  }

  const formattedAggregateData = aggregateData.map((d) => ({
    actionCount: d.aggregateResult,
    type: d.actionType,
  }));

  const totalActions = formattedAggregateData.reduce(
    (sum, cur) => sum + cur.actionCount,
    0,
  );

  formattedAggregateData.forEach((d) => {
    d.actionCount = parseFloat(
      ((d.actionCount / totalActions) * 100).toFixed(2),
    );
  });
  formattedAggregateData.push({
    actionCount: 0.0,
    type: t('OTHER_ACTION_TYPE'),
  });

  const formattedAggregateDataSorted = [...formattedAggregateData];
  formattedAggregateDataSorted.sort((a, b) =>
    (a?.type ?? 'Unknown').localeCompare(b.type ?? 'Unknown'),
  );

  return (
    <>
      <ChartTitle title={title} />
      <ChartContainer>
        <PieChart>
          <Pie
            data={formattedAggregateDataSorted}
            dataKey="actionCount"
            nameKey="type"
            label={ActionChartLabel}
            labelLine={false}
          >
            {formattedAggregateDataSorted.map((entry) => (
              <Cell
                key={entry.type}
                fill={getColorForActionTriggerType(entry.type)}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(
              value,
              name: (typeof ActionTriggers)[keyof typeof ActionTriggers],
            ) => [`${value}%`, translateActions(name)]}
          />
        </PieChart>
      </ChartContainer>
    </>
  );
};

export default TotalActionsByVerbChart;
