import { Grid2, Stack, Typography } from '@mui/material';

import { useAccountTranslation } from '@/config/i18n';

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
        <Stack direction={{ xs: 'column', lg: 'row' }} gap={5}>
          <Stack
            alignItems="center"
            mx={5}
            className="lg:order-1 lg:col-span-4 text-center mx-10"
          >
            <BuilderPuzzle />
          </Stack>
          <Grid2 className="grid lg:order-0 max-lg:grid-cols-2 lg:grid-flow-row gap-4">
            {/* <PlatformButton
              href=""
              caption={t('Use the')}
              name="Builder"
              color="builder"
              buttonText={t('Create')}
              description={t('To create rich and interactive material')}
            />
            <PlatformButton
              href=""
              caption={t('Use the')}
              name="Player"
              color="player"
              buttonText={t('Experience')}
              description={t('And let learners access material in a new way')}
            /> */}
          </Grid2>
          <div className="grid lg:order-2 max-lg:grid-cols-2 lg:grid-flow-row gap-4">
            {/* <PlatformButton
              href=""
              caption={t('Access the')}
              name="Analytics"
              direction="right"
              color="analytics"
              buttonText={t('Analyze')}
              description={t(
                'To collect insights and data about your className',
              )}
            />
            <PlatformButton
              href=""
              caption={t('Navigate the')}
              name="Library"
              direction="right"
              color="library"
              buttonText={t('Explore')}
              description={t('To find resources and be part of a community')}
            /> */}
          </div>
        </Stack>
      </Stack>
    </Stack>
  );
}
