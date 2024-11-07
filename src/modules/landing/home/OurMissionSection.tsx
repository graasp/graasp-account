import { Button, Stack, Typography } from '@mui/material';

import { useAccountTranslation } from '@/config/i18n';

export function OurMissionSection(): JSX.Element {
  const { t } = useAccountTranslation();
  return (
    <Stack component={'section'} direction="column" justifyItems="center">
      <Stack
        direction="column"
        px={{ xs: 5, md: 15 }}
        py={{ xs: 2, md: 5 }}
        gap={4}
        alignItems="center"
        // make the "card"
        bgcolor="white"
        boxShadow={3}
        borderRadius={8}
      >
        <Typography variant="h2" color="primary" fontWeight="bold">
          {t('Our Mission')}
        </Typography>

        <Typography maxWidth="50ch" fontSize="1.25rem" textAlign="center">
          We aim at empowering educators to become the best professionals they
          can be, through technology and revolutionizing their teaching and
          learning experiences in a <strong>wide learning community</strong>!
        </Typography>
        <Stack direction="column" gap={1}>
          <Typography color="textSecondary">
            Do you want to know more?
          </Typography>
          <Button variant="contained" size="small" href="">
            Get to Know Us
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
