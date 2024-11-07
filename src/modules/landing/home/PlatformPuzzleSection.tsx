import { Grid2, Stack, Typography } from '@mui/material';

import { Platform } from '@graasp/ui';

import { useAccountTranslation } from '@/config/i18n';

import { PlatformButton } from './PlatformButton';
import { BuilderPuzzle } from './icons/BuilderPuzzle';

export function PlatformPuzzleSection(): JSX.Element {
  const { t } = useAccountTranslation();
  return (
    <Stack
      component="section"
      direction="column"
      maxWidth="lg"
      alignSelf="center"
    >
      <Stack direction="column" alignItems="center" gap={5}>
        <Typography variant="h2" textAlign="center">
          {t('An all-in-one tool, how?')}
        </Typography>
        <Grid2
          container
          direction={{ xs: 'column', lg: 'row' }}
          alignItems="center"
          spacing={5}
        >
          <Grid2
            size={{ xs: 12, lg: 6 }}
            justifySelf="center"
            order={{ xs: 0, lg: 1 }}
            px={10}
            maxWidth={{ xs: '600px' }}
          >
            <BuilderPuzzle />
          </Grid2>
          <Grid2
            container
            direction={{ xs: 'row', lg: 'column' }}
            spacing={{ xs: 2, lg: 8 }}
            size={{ xs: 12, lg: 3 }}
            order={{ xs: 1, lg: 0 }}
            justifyContent="space-between"
          >
            <PlatformButton
              caption={t('Use the')}
              platform={Platform.Builder}
              buttonText={t('Create')}
              description={t('To create rich and interactive material')}
              direction="left"
            />
            <PlatformButton
              caption={t('Use the')}
              platform={Platform.Player}
              buttonText={t('Experience')}
              description={t('And let learners access material in a new way')}
              direction="left"
            />
          </Grid2>
          <Grid2
            container
            direction={{ xs: 'row', lg: 'column' }}
            spacing={{ xs: 2, lg: 8 }}
            size={{ xs: 12, lg: 3 }}
            order={{ xs: 2, lg: 2 }}
            justifyContent="space-between"
          >
            <PlatformButton
              caption={t('Access the')}
              platform={Platform.Analytics}
              direction="right"
              buttonText={t('Analyze')}
              description={t(
                'To collect insights and data about your className',
              )}
            />
            <PlatformButton
              caption={t('Navigate the')}
              platform={Platform.Library}
              direction="right"
              buttonText={t('Explore')}
              description={t('To find resources and be part of a community')}
            />
          </Grid2>
        </Grid2>
      </Stack>
    </Stack>
  );
}
