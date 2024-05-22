import { Card, CardContent, Grid, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

import { ImageUp } from 'lucide-react';

import { useAccountTranslation } from '@/config/i18n';
import { hooks } from '@/config/queryClient';
import { CARD_TIP_ID } from '@/config/selectors';

const NotifCard = (): JSX.Element | null => {
  const { t } = useAccountTranslation();

  const { data: member } = hooks.useCurrentMember();

  const { data: avatarUrl } = hooks.useAvatarUrl({
    id: member?.id,
  });

  if (avatarUrl) {
    return null;
  }
  return (
    <Grid2 justifyContent="center" container spacing={2}>
      <Grid xs={12} md={6} item>
        <Card variant="outlined" sx={{ height: '100%' }} data-cy={CARD_TIP_ID}>
          <CardContent sx={{ padding: 3 }}>
            <Typography
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={2}
              variant="h5"
            >
              <ImageUp fontSize="large" />
              {t('PERSONALISATION_TITLE')}
            </Typography>
            <Typography variant="body1" textAlign="center" marginTop={2}>
              {t('PERSONALISATION_INFORMATION')}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid2>
  );
};

export default NotifCard;
