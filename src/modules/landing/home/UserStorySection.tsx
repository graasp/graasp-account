import { useTranslation } from 'react-i18next';

import { Stack, Typography } from '@mui/material';

import { Image } from '@/components/ui/images';
import { NS } from '@/config/constants';

import { UserStory } from './UserStory';

export function UserStorySection(): JSX.Element {
  const { t } = useTranslation(NS.Landing);
  return (
    <Stack component="section" gap={20} maxWidth="lg">
      <UserStory
        href="/auth/register"
        caption={t('HOME.USER_STORY.TEACHER.LEADING_SENTENCE')}
        buttonText={t('HOME.USER_STORY.TEACHER.BUTTON_TEXT')}
        title={t('HOME.USER_STORY.TEACHER.TITLE')}
        image={
          <Image
            alt={`Photo by <a href="https://unsplash.com/@thutra0803?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Tra  Nguyen</a> on <a href="https://unsplash.com/photos/womens-blue-dress-shirt-TVSRWmnW8Us?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>`}
            src="/illustration/teacher.jpg"
          />
        }
      >
        <Typography>
          <span>{t('HOME.USER_STORY.TEACHER.USE_CASE_1')}</span>
          <br />
          <span>{t('HOME.USER_STORY.TEACHER.USE_CASE_2')}</span>
          <br />
          <span>{t('HOME.USER_STORY.TEACHER.USE_CASE_3')}</span>
        </Typography>
      </UserStory>
      <UserStory
        href="/auth/register"
        caption={t('HOME.USER_STORY.RESEARCHER.LEADING_SENTENCE')}
        buttonText={t('HOME.USER_STORY.RESEARCHER.BUTTON_TEXT')}
        title={t('HOME.USER_STORY.RESEARCHER.TITLE')}
        image={<Image src="/illustration/research.jpg" />}
      >
        <Typography>
          <span>{t('HOME.USER_STORY.RESEARCHER.USE_CASE_1')}</span>
          <br />
          <span>{t('HOME.USER_STORY.RESEARCHER.USE_CASE_2')}</span>
          <br />
          <span>{t('HOME.USER_STORY.RESEARCHER.USE_CASE_3')}</span>
        </Typography>
      </UserStory>
    </Stack>
  );
}
