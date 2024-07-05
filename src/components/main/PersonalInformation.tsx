import { useNavigate } from 'react-router';

import { Button } from '@mui/material';

import { useAccountTranslation } from '@/config/i18n';
import { EDIT_MEMBER_INFO } from '@/config/paths';
import { hooks } from '@/config/queryClient';
import {
  MEMBER_PROFILE_EMAIL_ID,
  PASSWORD_DISPLAY_ID,
  PERSONAL_INFO_EDIT_BUTTON_ID,
  USERNAME_DISPLAY_ID,
} from '@/config/selectors';

import BorderedSection from '../layout/BorderedSection';
import MemberProfileItem from './MemberProfileItem';

const PersonalInformation = (): JSX.Element | false => {
  const { data: member } = hooks.useCurrentMember();
  const { t } = useAccountTranslation();
  const navigate = useNavigate();

  return (
    <BorderedSection
      title={t('PERSONAL_INFORMATION_TITLE')}
      actions={[
        <Button
          id={PERSONAL_INFO_EDIT_BUTTON_ID}
          onClick={() => navigate(EDIT_MEMBER_INFO)}
          variant="contained"
        >
          {t('EDIT_BUTTON_LABEL')}
        </Button>,
      ]}
    >
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
    </BorderedSection>
  );
};

export default PersonalInformation;
