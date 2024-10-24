import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid2 as Grid,
  Typography,
} from '@mui/material';

import { ImageUp } from 'lucide-react';

import { useAccountTranslation } from '@/config/i18n';
import { hooks } from '@/config/queryClient';
import { CARD_TIP_ID } from '@/config/selectors';

const PersonalizationNotificationCard = (): JSX.Element | null => {
  const { t } = useAccountTranslation();

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
                {t('PERSONALISATION_TITLE')}
              </Box>
            }
          />
          <CardContent>
            <Typography textAlign="center">
              {t('PERSONALISATION_INFORMATION')}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PersonalizationNotificationCard;
