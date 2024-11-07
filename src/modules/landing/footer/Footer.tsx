import { useTranslation } from 'react-i18next';

import { Stack, Typography } from '@mui/material';

import { PRIMARY_COLOR } from '@graasp/ui';

import { TRANS_NS } from '@/config/i18n';
import { LANDING } from '@/langs/landing';

import { FooterSection } from './FooterSection';
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedInIcon,
  MastodonIcon,
  TwitterIcon,
} from './Icons';
import { ExternalLink, InternalLink, SocialLink } from './Links';

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
    // TODO: this link needs to be updated
    href: 'https://www.facebook.com/graasp',
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

export function Footer(): JSX.Element {
  const { t, i18n } = useTranslation(TRANS_NS.LANDING);
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
        <Typography textAlign="center">{t(LANDING.FOOTER_TAG_LINE)}</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} m={4} gap={10}>
          <FooterSection name={t(LANDING.FOOTER_CONTENT_TITLE)}>
            <InternalLink to="/">{t(LANDING.FOOTER_CONTENT_HOME)}</InternalLink>
            <InternalLink to="/features">
              {t(LANDING.FOOTER_CONTENT_FEATURES)}
            </InternalLink>
            <InternalLink to="/about-us">
              {t(LANDING.FOOTER_CONTENT_ABOUT_US)}
            </InternalLink>
            <InternalLink to="/support">
              {t(LANDING.FOOTER_CONTENT_SUPPORT)}
            </InternalLink>
            <InternalLink to="/contact-us">
              {t(LANDING.FOOTER_CONTENT_CONTACT_US)}
            </InternalLink>
          </FooterSection>

          <FooterSection name={t(LANDING.FOOTER_PARTNERS_TITLE)}>
            {partnerLinks.map(({ href, title }) => (
              <ExternalLink key={title} href={href}>
                {title}
              </ExternalLink>
            ))}
          </FooterSection>

          <FooterSection name={t(LANDING.FOOTER_SOCIAL_TITLE)}>
            {socialLinks.map(({ href, Icon, title }) => (
              <SocialLink key={title} href={href} icon={<Icon size={24} />}>
                {title}
              </SocialLink>
            ))}
          </FooterSection>

          <FooterSection name={t(LANDING.FOOTER_OTHER_TITLE)}>
            <InternalLink to={`/${i18n.language}/terms`}>
              {t('Terms of Service')}
            </InternalLink>
            <InternalLink to={`/${i18n.language}/policy`}>
              {t('Privacy Policy')}
            </InternalLink>
            <InternalLink to={`/${i18n.language}/disclaimer`}>
              {t('Disclaimer')}
            </InternalLink>
          </FooterSection>
        </Stack>
        <Typography textAlign="center" variant="note">
          &copy; Graasp 2014 - {new Date().getFullYear()}
        </Typography>
      </Stack>
    </Stack>
  );
}
