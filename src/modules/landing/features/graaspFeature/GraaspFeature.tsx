import { Trans, useTranslation } from 'react-i18next';

import { Box, Stack, Typography, styled } from '@mui/material';

import { useButtonColor } from '@graasp/ui';

import { ButtonLink } from '@/components/ui/ButtonLink';
import { NS } from '@/config/constants';

const BUTTON_CONTAINER = 'button-container';
const TEXT_CONTAINER = 'text-container';

const FeatureContainer = styled(Stack)(({ theme }) => ({
  justifyContent: 'center',
  textAlign: 'center',
  [`.${TEXT_CONTAINER}`]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  [`.${BUTTON_CONTAINER}`]: {
    // default for small screens (always primary action on top)
    flexDirection: 'column-reverse',
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-start',
    textAlign: 'left',
    [`.${TEXT_CONTAINER}`]: {
      flexDirection: 'row-reverse',
    },
    [`.${BUTTON_CONTAINER}`]: {
      flexDirection: 'row-reverse',
    },
  },
  '&:nth-child(even)': {
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-end',
      textAlign: 'right',
      [`.${TEXT_CONTAINER}`]: {
        flexDirection: 'row',
      },
      [`.${BUTTON_CONTAINER}`]: {
        flexDirection: 'row',
      },
    },
  },
}));

type GraaspFeatureProps = {
  platform: 'builder' | 'player' | 'analytics' | 'library';
};

export function GraaspFeature({ platform }: Readonly<GraaspFeatureProps>) {
  const { t } = useTranslation(NS.Landing, {
    keyPrefix: `FEATURES.GRAASP_FEATURES.${platform}`,
  });
  const { color } = useButtonColor(platform);
  return (
    <FeatureContainer gap={2}>
      <Stack className={TEXT_CONTAINER} gap={8}>
        <Box width="200px" height="200px" bgcolor="red" flexShrink={0}></Box>
        <Stack gap={4}>
          <Box>
            <Typography variant="note" color="textSecondary">
              {t('LEAD_SENTENCE')}
            </Typography>
            <Typography variant="h2" component="h3" color="primary">
              <Trans
                i18nKey="TITLE"
                t={t}
                components={{ color: <span style={{ color }} /> }}
              />
            </Typography>
          </Box>
          <Typography>
            <Trans i18nKey="DESCRIPTION" t={t} />
          </Typography>
        </Stack>
      </Stack>

      <Stack className={BUTTON_CONTAINER} gap={3}>
        <ButtonLink
          sx={{ flex: 1 }}
          variant="contained"
          color="secondary"
          fullWidth
        >
          {t('SECONDARY_ACTION_BUTTON_TEXT')}
        </ButtonLink>
        <ButtonLink
          sx={{ flex: 1 }}
          variant="contained"
          color="secondary"
          fullWidth
        >
          {t('TERTIARY_ACTION_BUTTON_TEXT')}
        </ButtonLink>
        <ButtonLink sx={{ flex: 2 }} variant="contained" color="primary">
          {t('CTA_BUTTON_TEXT')}
        </ButtonLink>
      </Stack>
    </FeatureContainer>
  );
}
