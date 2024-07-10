import { useState } from 'react';

import { Button } from '@mui/material';

import BorderedSection from '@/components/layout/BorderedSection';
import MemberProfileItem from '@/components/main/MemberProfileItem';
import { useAccountTranslation } from '@/config/i18n';
import { hooks } from '@/config/queryClient';
import {
  MEMBER_PROFILE_EMAIL_ID,
  PERSONAL_INFO_DISPLAY_CONTAINER_ID,
  PERSONAL_INFO_EDIT_BUTTON_ID,
  USERNAME_DISPLAY_ID,
} from '@/config/selectors';
import EditPersonalInformation from '@/modules/profile/EditPersonalInformation';

const PersonalInformation = (): JSX.Element | false => {
  const { data: member } = hooks.useCurrentMember();
  const { t } = useAccountTranslation();

  const [isEditing, setIsEditing] = useState(false);

  const onClose = () => setIsEditing(false);

  if (isEditing) {
    return <EditPersonalInformation member={member} onClose={onClose} />;
  }
  return (
    <BorderedSection
      title={t('PERSONAL_INFORMATION_TITLE')}
      id={PERSONAL_INFO_DISPLAY_CONTAINER_ID}
      topActions={[
        <Button
          key="edit"
          id={PERSONAL_INFO_EDIT_BUTTON_ID}
          onClick={() => setIsEditing(true)}
          variant="contained"
          size="small"
        >
          {t('EDIT_BUTTON_LABEL')}
        </Button>,
      ]}
    >
      <MemberProfileItem
        key="name"
        title={t('PROFILE_MEMBER_NAME')}
        content={member?.name}
        contentId={USERNAME_DISPLAY_ID}
      />
      <MemberProfileItem
        key="email"
        title={t('PROFILE_EMAIL_TITLE')}
        content={member?.email}
        contentId={MEMBER_PROFILE_EMAIL_ID}
      />
    </BorderedSection>
  );
};

export default PersonalInformation;
