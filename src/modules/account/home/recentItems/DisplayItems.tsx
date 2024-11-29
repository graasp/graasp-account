import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { Alert, Grid2 as Grid } from '@mui/material';

import { PackedItem } from '@graasp/sdk';

import { NS } from '@/config/constants';

import ItemCard from '~player/common/ItemCard';
import LoadingItemsIndicator from '~player/common/LoadingItemsIndicator';

const GridWrapper = ({ children }: { children: ReactNode }): JSX.Element => (
  <Grid size={{ xs: 12, sm: 6, md: 4, xl: 2 }}>{children}</Grid>
);

export function DisplayItems({
  items,
  isLoading,
}: Readonly<{
  items?: PackedItem[];
  isLoading: boolean;
}>): ReactNode | null {
  const { t } = useTranslation(NS.Player);

  if (items) {
    if (!items.length) {
      return (
        <Alert severity="info" sx={{ m: 1, width: '100%' }}>
          {t('HOME_EMPTY')}
        </Alert>
      );
    }

    return items.map((item) => (
      <GridWrapper key={item.id}>
        <ItemCard item={item} />
      </GridWrapper>
    ));
  }

  if (isLoading) {
    return Array.from(Array(6)).map((i) => (
      <GridWrapper key={i}>
        <LoadingItemsIndicator />
      </GridWrapper>
    ));
  }
  return null;
}
