import React, { useState } from 'react';

import { Button, Stack, Typography } from '@mui/material';

import { useAccountTranslation } from '@/config/i18n';
import { PASSWORD_EDIT_BUTTON_ID } from '@/config/selectors';
import PasswordSettings from '@/pages/PasswordSettingsScreen';

import RoundedStack from '../common/RoundedStack';

const MemberPassword = (): JSX.Element => {
  const { t } = useAccountTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleClose = () => {
    setIsEditing(false);
  };
  return (
    <RoundedStack>
      {isEditing ? (
        <PasswordSettings onClose={handleClose} />
      ) : (
        <>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">{t('PASSWORD_SETTINGS_TITLE')}</Typography>
            <Button
              variant="contained"
              onClick={handleEditClick}
              id={PASSWORD_EDIT_BUTTON_ID}
            >
              {t('EDIT_BUTTON_LABEL')}
            </Button>
          </Stack>
          <Typography variant="body1" color="textSecondary">
            {t('PASSWORD_SETTINGS_INFORMATION')}
          </Typography>
        </>
      )}
    </RoundedStack>
  );
};

export default MemberPassword;
