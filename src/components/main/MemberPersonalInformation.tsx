import { useState } from 'react';

import { Stack } from '@mui/material';

import { useAccountTranslation } from '@/config/i18n';
import { hooks } from '@/config/queryClient';
import {
  EDIT_MEMBER_INFO_FORM_ID,
  MEMBER_PROFILE_EMAIL_ID,
  PERSONAL_INFO_EDIT_BUTTON_ID,
  USERNAME_DISPLAY_ID,
} from '@/config/selectors';

import BorderedSection from '../layout/BorderedSection';
import EditMemberPersonalInformation from './EditMemberPersonalInformation';
import MemberProfileItem from './MemberProfileItem';

const MemberPersonalInformation = (): JSX.Element | false => {
  const { data: member } = hooks.useCurrentMember();
  const { t } = useAccountTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleClose = () => {
    setIsEditing(false);
  };
  return (
    <Stack id={EDIT_MEMBER_INFO_FORM_ID}>
      {isEditing ? (
        <EditMemberPersonalInformation onClose={handleClose} />
      ) : (
        <BorderedSection
          title={t('PERSONAL_INFORMATION_TITLE')}
          onEdit={handleEditClick}
          editButtonText={t('EDIT_BUTTON_LABEL')}
          editButtonId={PERSONAL_INFO_EDIT_BUTTON_ID}
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
        </BorderedSection>
      )}
    </Stack>
  );
};

export default MemberPersonalInformation;
