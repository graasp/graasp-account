import { useTranslation } from 'react-i18next';

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid2 as Grid,
  Typography,
} from '@mui/material';

import { ImageUp } from 'lucide-react';

import { NS } from '@/config/constants';
import { hooks } from '@/config/queryClient';
import { CARD_TIP_ID } from '@/config/selectors';

export function TipCard(): JSX.Element | null {
  const { t } = useTranslation(NS.Account);

  const { data: member } = hooks.useCurrentMember();

  const { data: avatarUrl } = hooks.useAvatarUrl({
    id: member?.id,
  });

  if (avatarUrl) {
    return null;
  }
  return (
    <Grid justifyContent="center" container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Card variant="outlined" id={CARD_TIP_ID}>
          <CardHeader
            title={
              <Box display="flex" justifyContent="center" gap={2}>
                <ImageUp fontSize="large" />
                {t('PERSONALIZATION_TITLE')}
              </Box>
            }
          />
          <CardContent>
            <Typography textAlign="center">
              {t('PERSONALIZATION_INFORMATION')}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
