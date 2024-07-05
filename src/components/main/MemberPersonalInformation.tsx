import { useState } from 'react';

import { Alert, Stack } from '@mui/material';

import { Loader } from '@graasp/ui';

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
  const { data: member, isLoading } = hooks.useCurrentMember();
  const { t } = useAccountTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleClose = () => {
    setIsEditing(false);
  };
  if (member) {
    return (
      <Stack id={EDIT_MEMBER_INFO_FORM_ID}>
        {isEditing ? (
          <EditMemberPersonalInformation
            onClose={handleClose}
            member={member}
          />
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
  }
  if (isLoading) {
    return <Loader />;
  }

  if (!member) {
    return <Alert severity="error">{t('User is not unauthenticated')}</Alert>;
  }

  return false;
};

export default MemberPersonalInformation;
