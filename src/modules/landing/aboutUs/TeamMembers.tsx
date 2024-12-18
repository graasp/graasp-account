import { useTranslation } from 'react-i18next';

import { Box, Grid2 as Grid, Stack, Typography } from '@mui/material';

import { NS } from '@/config/constants';

function TeamMembers() {
  const { t } = useTranslation(NS.Landing, {
    keyPrefix: 'ABOUT_US.TEAM',
  });

  const TEAM = [
    {
      name: 'Denis Gillet',
      image: 'denis.png',
      role: 'STATUSES.TITLE_PRESIDENT',
    },
    {
      name: 'Isabelle Vonèche Cardia',
      image: 'isabelle.jpg',
      role: 'STATUSES.TITLE_MANAGING_DIRECTOR',
    },
    {
      name: 'María Jesús Rodríguez-Triana',
      image: 'maria.jpg',
      role: 'STATUSES.TITLE_VP_RESEARCH',
    },
    {
      name: 'Juan Carlos Farah',
      image: 'juancarlos.jpg',
      role: 'STATUSES.TITLE_VP_PRODUCT',
    },
    {
      name: 'Kim Lan Phan Hoang',
      image: 'kim.jpg',
      role: 'STATUSES.TITLE_VP_ENGINEERING',
    },
    {
      name: 'Jérémy La Scala',
      image: 'jeremy.jpg',
      role: 'STATUSES.TITLE_VP_OUTREACH',
    },
    {
      name: 'Sandy Ingram',
      image: 'sandy.jpg',
      role: 'STATUSES.TITLE_VP_INNOVATION',
    },
    {
      name: 'Basile Spaenlehauer',
      image: 'basile.jpg',
      role: 'STATUSES.TITLE_VP_TECHNOLOGY',
    },
    {
      name: 'Michele Notari',
      image: 'michele.jpg',
      role: 'STATUSES.TITLE_VP_EDUCATION_AND_CONTENT',
    },
    {
      name: 'Hagop Taminian',
      image: 'hagop.jpg',
      role: 'STATUSES.TITLE_SOFTWARE_ENGINEER',
    },
    {
      name: 'Philippe Kobel',
      image: 'philippe.jpg',
      role: 'STATUSES.TITLE_AMBASSADOR',
    },
    {
      name: 'François Bierlaire',
      image: 'francois.jpg',
      role: 'STATUSES.TITLE_PEDAGOGICAL_ENGINEER',
    },
  ];

  return (
    <Stack
      maxWidth={{ xs: '600px', md: 'lg' }}
      width="100%"
      alignItems={{ xs: 'center', md: 'flex-start' }}
      gap={4}
    >
      <Typography variant="h2" color="primary">
        {t('TITLE')}
      </Typography>
      <Grid container justifyContent="center" alignItems="center">
        {TEAM.map(({ name, image, role }) => (
          <Grid size={{ xs: 6, sm: 4, lg: 3 }} mb={3}>
            <Box
              margin="auto"
              borderRadius={50}
              height={'150px'}
              width="150px"
              sx={{ overflow: 'hidden' }}
              mb={2}
            >
              <img
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                src={`/team/` + image}
                alt={name}
              />
            </Box>

            <Typography variant="h5" component="p" textAlign="center">
              {name}
            </Typography>
            <Typography
              textTransform="uppercase"
              variant="body1"
              textAlign="center"
            >
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-expect-error */}
              {t(role)}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}

export default TeamMembers;
