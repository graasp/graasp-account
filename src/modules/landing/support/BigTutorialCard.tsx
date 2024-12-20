import { useTranslation } from 'react-i18next';

import { Button, Card, Stack, Typography } from '@mui/material';

import { NS } from '@/config/constants';

function BigTutorialCard({
  title,
  description,
  link,
}: {
  title: string;
  description: string;
  link: string;
}) {
  const { t } = useTranslation(NS.Landing, { keyPrefix: 'SUPPORT.TUTORIALS' });
  return (
    <Card sx={{ width: '100%', p: 2, textAlign: 'center' }}>
      <Stack gap={1} justifyContent="space-between" height="100%">
        <Typography variant="h6">{title}</Typography>
        <Typography>{description}</Typography>
        <a href={link}>
          <Button
            variant="contained"
            disableElevation
            // fullWidth
            size="small"
            color="primary"
          >
            {t('READ_BUTTON')}
          </Button>
        </a>
      </Stack>
    </Card>
  );
}

export default BigTutorialCard;
