import { useTranslation } from 'react-i18next';

import { Stack } from '@mui/material';

import { Link } from '@tanstack/react-router';

import { AppStoreIcon } from './icons/AppStoreIcon';
import { PlayStoreIcon } from './icons/PlayStoreIcon';

export function LandingPage(): JSX.Element {
  const { t } = useTranslation();
  return (
    <Stack component="section" direction="column" marginTop={5}>
      <Stack
        direction={{ xs: 'column-reverse', lg: 'row' }}
        justifyItems="flex-start"
        display="relative"
        flexGrow={1}
        gap={10}
      >
        <Stack direction="column" gap={10}>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col">
              <h2 className="text-center lg:text-left">Graasp</h2>
              <h1 className="text-4xl sm:text-5xl font-bold text-center lg:text-left">
                {t('Your learning experience platform')}
              </h1>
            </div>
            <p className="text-center lg:text-left">
              {t(`Revolutionize your education and professional development!
              Our platform cares for the needs of educators and researchers, seeking a complete solution for content creation, presentation, and collaborative knowledge sharing.`)}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div
              id="buttonsContainer"
              className="flex flex-col md:flex-row items-center justify-center gap-4"
            >
              <a
                href="https://auth.graasp.org/signup"
                className="btn btn-primary text-white"
              >
                <slot>{t('Start Here')}</slot>
              </a>
              <a href="/" className="btn btn-accent btn">
                {t('Visit the Library')}
              </a>
              <Link to="/playstore" className="btn bg-playButtons">
                <div className="flex flex-row gap-4 items-center">
                  <PlayStoreIcon font-size="2rem" />
                  <div className="flex flex-col items-start text-white gap-1">
                    <span className="text-xs"> Get it on</span>
                    <span className="font-bold">Google Play</span>
                  </div>
                </div>
              </Link>
              <Link to="/playstore" className="btn bg-playButtons">
                <div className="flex flex-row gap-4 items-center">
                  <AppStoreIcon font-size="2rem" />
                  <div className="flex flex-col items-start text-white gap-1">
                    <span className="text-xs"> Get it on</span>
                    <span className="font-bold">App Store</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-slate-400">{t('Supported by')}</p>
            <div id="logosContainer" className="flex flex-row flex-wrap gap-5">
              <span>EPFL</span>
              <span>UNCTAD</span>
              <span>BeLEARN</span>
              <span>EDTECH</span>
              <span>GOLAB</span>
              <span>GOGA</span>
              <span>UNINE</span>
              <span>IHUB4SCHOOL</span>
            </div>
          </div>
        </Stack>
        <div>
          <img
            alt="cover"
            className="rounded-3xl m-auto"
            src="https://picsum.photos/400/400"
          />
        </div>
      </Stack>
    </Stack>
  );
}
