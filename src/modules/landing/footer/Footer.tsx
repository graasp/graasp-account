import { useTranslation } from 'react-i18next';

import { Stack, Typography } from '@mui/material';

import { PRIMARY_COLOR } from '@graasp/ui';

import { NS } from '@/config/constants';

import { FooterSection } from './FooterSection';
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedInIcon,
  MastodonIcon,
  TwitterIcon,
} from './icons';
import { ExternalLink, InternalLink, SocialLink } from './links';

const partnerLinks = [
  {
    title: 'EPFL',
    href: 'https://epfl.ch',
  },
  {
    title: 'Swiss EdTech Collider',
    href: 'https://edtech-collider.ch',
  },
  {
    title: 'Go-Lab',
    href: 'https://www.golabz.eu',
  },
  {
    title: 'Swiss Digital Skills Academy',
    href: 'https://d-skills.ch/',
  },
  {
    title: 'iHub4Schools',
    href: 'https://www.ihub4schools.eu/',
  },
  {
    title: 'BeLEARN',
    href: 'https://belearn.swiss/en/',
  },
  {
    title: 'GO-GA',
    href: 'https://go-ga.org/',
  },
];

const socialLinks = [
  {
    title: 'Facebook',
    href: 'https://www.facebook.com/graasp',
    Icon: FacebookIcon,
  },
  {
    title: 'Twitter',
    href: 'https://twitter.com/graasp',
    Icon: TwitterIcon,
  },
  {
    title: 'Instragram',
    href: 'https://www.instagram.com/graasper',
    Icon: InstagramIcon,
  },
  {
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/company/graasp',
    Icon: LinkedInIcon,
  },
  {
    title: 'Github',
    href: 'https://github.com/graasp',
    Icon: GithubIcon,
  },
  {
    title: 'Mastodon',
    href: 'https://tooting.ch/@graasp',
    Icon: MastodonIcon,
  },
];

const internalLinkActiveProp = () => ({
  sx: {
    backgroundColor: '#00000040',
    // textDecoration: 'underline',
    '&::before': {
      content: `url("data:image/svg+xml,${encodeURI('<svg xmlns="http://www.w3.org/2000/svg" color="white" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>')}")`,
      position: 'relative',
      top: '2px',
      marginRight: '8px',
    },
  },
});

export function Footer(): JSX.Element {
  const { t } = useTranslation(NS.Landing);
  return (
    <Stack
      component="footer"
      direction="column"
      width="100%"
      bgcolor={PRIMARY_COLOR}
      color="white"
      gap={1}
      p={3}
    >
      <Stack maxWidth="lg" m="auto" width="100%">
        <Typography textAlign="center" fontWeight="bold">
          {t('FOOTER.TAG_LINE')}
        </Typography>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          m={4}
          gap={5}
          justifyContent="space-between"
        >
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            gap={5}
            flex={1}
            justifyContent="space-around"
          >
            <FooterSection name={t('FOOTER.CONTENT.TITLE')}>
              <InternalLink to="/" activeProps={internalLinkActiveProp}>
                {t('FOOTER.CONTENT.HOME')}
              </InternalLink>
              <InternalLink to="/features" activeProps={internalLinkActiveProp}>
                {t('FOOTER.CONTENT.FEATURES')}
              </InternalLink>
              <InternalLink to="/about-us" activeProps={internalLinkActiveProp}>
                {t('FOOTER.CONTENT.ABOUT_US')}
              </InternalLink>
              <InternalLink to="/support" activeProps={internalLinkActiveProp}>
                {t('FOOTER.CONTENT.SUPPORT')}
              </InternalLink>
              <InternalLink
                to="/contact-us"
                activeProps={internalLinkActiveProp}
              >
                {t('FOOTER.CONTENT.CONTACT_US')}
              </InternalLink>
            </FooterSection>

            <FooterSection name={t('FOOTER.PARTNERS.TITLE')}>
              {partnerLinks.map(({ href, title }) => (
                <ExternalLink key={title} href={href}>
                  {title}
                </ExternalLink>
              ))}
            </FooterSection>
          </Stack>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            gap={5}
            flex={1}
            justifyContent="space-around"
          >
            <FooterSection name={t('FOOTER.SOCIAL.TITLE')}>
              {socialLinks.map(({ href, Icon, title }) => (
                <SocialLink key={title} href={href} icon={<Icon size={24} />}>
                  {title}
                </SocialLink>
              ))}
            </FooterSection>

            <FooterSection name={t('FOOTER.OTHER.TITLE')}>
              <InternalLink to="/terms" activeProps={internalLinkActiveProp}>
                {t('FOOTER.OTHER.TERMS')}
              </InternalLink>
              <InternalLink to="/policy" activeProps={internalLinkActiveProp}>
                {t('FOOTER.OTHER.POLICY')}
              </InternalLink>
              <InternalLink
                to="/disclaimer"
                activeProps={internalLinkActiveProp}
              >
                {t('FOOTER.OTHER.DISCLAIMER')}
              </InternalLink>
            </FooterSection>
          </Stack>
        </Stack>
        <Typography textAlign="center" variant="note">
          &copy; Graasp 2014 - {new Date().getFullYear()}
        </Typography>
      </Stack>
    </Stack>
  );
}
