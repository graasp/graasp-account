import { Link, Stack, Typography } from '@mui/material';

import { PRIMARY_COLOR } from '@graasp/ui';

import { useAccountTranslation } from '@/config/i18n';

import { FooterSection } from './FooterSection';
import { ExternalLink, SocialLink } from './Links';

export function Footer(): JSX.Element {
  const { t } = useAccountTranslation();
  return (
    <Stack
      component="footer"
      direction="column"
      gap={1}
      bgcolor={PRIMARY_COLOR}
      color="white"
      width="100%"
    >
      <Stack maxWidth="lg" m="auto" width="100%">
        <Typography textAlign="center">
          {t('footer.description')}
          <Link color="inherit" href="https://association.graasp.org">
            {t('footer.description.association')}
          </Link>
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} m={4} gap={10}>
          <FooterSection name={t('footer.partners.title')}>
            <ExternalLink href="https://epfl.ch">EPFL</ExternalLink>
            <ExternalLink href="https://edtech-collider.ch">
              Swiss EdTech Collider
            </ExternalLink>
            <ExternalLink href="https://www.golabz.eu">Go-Lab</ExternalLink>
            <ExternalLink href="https://d-skills.ch/">
              Swiss Digital Skills Academy
            </ExternalLink>
            <ExternalLink href="https://www.ihub4schools.eu/">
              iHub4Schools
            </ExternalLink>
            <ExternalLink href="https://belearn.swiss/en/">
              BeLEARN
            </ExternalLink>
            <ExternalLink href="https://go-ga.org/">GO-GA</ExternalLink>
          </FooterSection>
          <FooterSection name={t('footer.social.title')}>
            <SocialLink
              href="https://www.facebook.com/graasp"
              icon={'facebook'}
            >
              <span>Facebook</span>
            </SocialLink>
            {/* <SocialLink href="https://twitter.com/graasp">
            <Icon name="twitter" slot="icon" class="w-6 h-6" />
            <span>Twitter</span>
            </SocialLink>
            <SocialLink href="https://www.facebook.com/graasp">
            <Icon name="instagram" slot="icon" class="w-6 h-6" />
            <span>Instagram</span>
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/company/graasp">
            <Icon name="linkedin" slot="icon" class="w-6 h-6" />
            <span>LinkedIn</span>
            </SocialLink>
            <SocialLink href="https://github.com/graasp">
            <Icon name="github" slot="icon" class="w-6 h-6" />
            <span>GitHub</span>
            </SocialLink>
            <SocialLink href="https://tooting.ch/@graasp">
            <Icon name="mastodon" slot="icon" class="w-6 h-6" />
            <span>Mastodon</span>
            </SocialLink> */}
          </FooterSection>
          <FooterSection name={t('Other')}>
            <ExternalLink href={t('footer.support.tutorials.link')}>
              {t('Termns of Service')}
            </ExternalLink>
            <ExternalLink href="https://graasp.github.io/docs/">
              {t('Privacy Policy')}
            </ExternalLink>
            <ExternalLink href="https://portal.klewel.com/watch/webcast/swiss-edtech-collider-april-2017/talk/2/">
              {t('Disclaimer')}
            </ExternalLink>
          </FooterSection>
        </Stack>
        <Typography textAlign="center">
          &copy; Graasp 2014 - {new Date().getFullYear()}
        </Typography>
      </Stack>
    </Stack>
  );
}
