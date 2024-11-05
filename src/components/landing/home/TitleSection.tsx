import { useTranslation } from 'react-i18next';

import { Button, Stack, Typography } from '@mui/material';

import { ZoomingImage } from '@/components/ui/Image';
import { GRAASP_LIBRARY_HOST } from '@/config/env';

import { ButtonLink } from '../../ui/ButtonLink';
import { BeLEARN } from './icons/BeLEARN';
import { EPFL } from './icons/EPFL';
import { EdTech } from './icons/EdTech';
import { GoLab } from './icons/GoLab';
import { Unine } from './icons/Unine';

export function TitleSection(): JSX.Element {
  const { t } = useTranslation();
  return (
    <Stack component="section" direction="column" my={5} maxWidth="lg">
      <Stack
        direction={{ xs: 'column', lg: 'row-reverse' }}
        justifyItems="flex-start"
        alignItems="center"
        width="100%"
        gap={10}
      >
        <Stack
          flex={{ lg: 1 }}
          height={{ xs: '400px', lg: 'unset' }}
          borderRadius={4}
          overflow="hidden"
        >
          <ZoomingImage
            alt="cover"
            src="/illustration/learning-old-cropped.jpeg"
          />
        </Stack>
        <Stack direction="column" gap={10} flex={{ lg: 2 }}>
          <Stack direction="column" gap={4}>
            <Stack direction="column">
              <Typography
                variant="h2"
                color="primary"
                alignSelf={{ xs: 'center', lg: 'flex-start' }}
              >
                Graasp
              </Typography>
              <Typography
                variant="h1"
                color="primary"
                textAlign={{ xs: 'center', lg: 'unset' }}
                alignSelf={{ xs: 'center', lg: 'flex-start' }}
              >
                {t('Your learning experience platform')}
              </Typography>
            </Stack>
            <Typography
              variant="h4"
              component="p"
              textAlign={{ xs: 'center', lg: 'unset' }}
              alignSelf={{ xs: 'center', lg: 'flex-start' }}
            >
              {t(`Revolutionize your education and professional development!
              Our platform cares for the needs of educators and researchers, seeking a complete solution for content creation, presentation, and collaborative knowledge sharing.`)}
            </Typography>
          </Stack>
          <Stack direction="column" gap={4}>
            <Stack
              id="buttonsContainer"
              direction={{ xs: 'column', md: 'row' }}
              justifyItems="center"
              alignItems="center"
              gap={4}
            >
              <ButtonLink variant="contained" to="/register">
                {t('Start Here')}
              </ButtonLink>
              <Button
                component="a"
                variant="contained"
                color="secondary"
                href={GRAASP_LIBRARY_HOST}
              >
                {t('Visit the Library')}
              </Button>
            </Stack>
          </Stack>
          <Stack direction="column" gap={1}>
            <Typography color="textSecondary">{t('Supported by')}</Typography>
            <Stack
              id="logosContainer"
              direction="row"
              gap={1}
              flexWrap="wrap"
              alignItems="center"
            >
              <EPFL width="150px" height="3rem" />
              <BeLEARN width="150px" height="3rem" />
              <EdTech width="150px" height="3rem" />
              <Unine width="150px" height="3rem" />
              <GoLab width="150px" height="3rem" />
              <span>GOGA</span>
              <span>IHUB4SCHOOL</span>
              <span>UNCTAD</span>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
