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

import { hooks } from '@/config/queryClient';
import { CARD_TIP_ID } from '@/config/selectors';
import { ACCOUNT } from '@/langs/account';

export function PersonalizationNotificationCard(): JSX.Element | null {
  const { t } = useTranslation();

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
                {t(ACCOUNT.PERSONALIZATION_TITLE)}
              </Box>
            }
          />
          <CardContent>
            <Typography textAlign="center">
              {t(ACCOUNT.PERSONALIZATION_INFORMATION)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default PersonalizationNotificationCard;
