import React, { useState } from 'react';

import { Button, Stack, Typography } from '@mui/material';

import { useAccountTranslation } from '@/config/i18n';
import { PASSWORD_EDIT_BUTTON_ID } from '@/config/selectors';

import RoundedStack from '../common/RoundedStack';
import EditPassword from './EditPassword';

const MemberPassword = (): JSX.Element => {
  const { t } = useAccountTranslation();
  const [isInEditMode, setIsInEditMode] = useState(false);
  const handleEditClick = () => {
    setIsInEditMode(true);
  };

  const handleClose = () => {
    setIsInEditMode(false);
  };
  return (
    <RoundedStack>
      {isInEditMode ? (
        <EditPassword onClose={handleClose} />
      ) : (
        <>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">{t('PASSWORD_SETTINGS_TITLE')}</Typography>
            <Button
              variant="contained"
              onClick={handleEditClick}
              id={PASSWORD_EDIT_BUTTON_ID}
              size="small"
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
