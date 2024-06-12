import { Link } from 'react-router-dom';

import { Button, Stack, Typography } from '@mui/material';

import { useAccountTranslation } from '@/config/i18n';
import { EDIT_MEMBER_INFO } from '@/config/paths';
import { hooks } from '@/config/queryClient';
import {
  MEMBER_PROFILE_EMAIL_ID,
  PASSWORD_DISPLAY_ID,
  PERSONAL_INFO_EDIT_BUTTON_ID,
  USERNAME_DISPLAY_ID,
} from '@/config/selectors';

import RoundedStack from '../common/RoundedStack';
import MemberProfileItem from './MemberProfileItem';

const MemberPersonalInformation = (): JSX.Element => {
  const { data: member } = hooks.useCurrentMember();
  const { t } = useAccountTranslation();

  return (
    <RoundedStack>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5">{t('PERSONAL_INFORMATION_TITLE')}</Typography>
        <Button
          component={Link}
          to={EDIT_MEMBER_INFO}
          variant="contained"
          id={PERSONAL_INFO_EDIT_BUTTON_ID}
        >
          {t('EDIT_BUTTON_LABEL')}
        </Button>
      </Stack>

      <MemberProfileItem
        title={t('PROFILE_MEMBER_NAME')}
        content={member?.name}
        contentId={USERNAME_DISPLAY_ID}
      />
      <MemberProfileItem
        title={t('PROFILE_EMAIL_TITLE')}
        content={member?.email}
        contentId={MEMBER_PROFILE_EMAIL_ID}
      />
      <MemberProfileItem
        title={t('PASSWORD_TITLE')}
        contentId={PASSWORD_DISPLAY_ID}
      />
    </RoundedStack>
  );
};

export default MemberPersonalInformation;
