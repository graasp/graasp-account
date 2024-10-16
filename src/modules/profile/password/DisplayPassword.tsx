import { useState } from 'react';

import { Alert, Button, Skeleton, Typography } from '@mui/material';

import BorderedSection from '@/components/layout/BorderedSection';
import { useAccountTranslation } from '@/config/i18n';
import { hooks } from '@/config/queryClient';
import {
  PASSWORD_DISPLAY_CONTAINER_ID,
  PASSWORD_DISPLAY_INFORMATION_ID,
  PASSWORD_EDIT_BUTTON_ID,
} from '@/config/selectors';
import { ACCOUNT } from '@/langs/constants';

import CreatePassword from './CreatePassword';
import EditPassword from './EditPassword';

const DisplayPassword = (): JSX.Element => {
  const { t } = useAccountTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const { data: passwordStatus, isPending: isPasswordStatusPending } =
    hooks.usePasswordStatus();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  // show correct form if is editing
  if (isEditing && passwordStatus) {
    if (passwordStatus.hasPassword) {
      return <EditPassword onClose={handleClose} />;
    }
    return <CreatePassword onClose={handleClose} />;
  }

  // read content
  if (!isEditing) {
    return (
      <BorderedSection
        id={PASSWORD_DISPLAY_CONTAINER_ID}
        title={t('PASSWORD_SETTINGS_TITLE')}
        topActions={[
          <Button
            key="edit"
            variant="contained"
            onClick={handleEditClick}
            id={PASSWORD_EDIT_BUTTON_ID}
            size="small"
          >
            {passwordStatus?.hasPassword
              ? t(ACCOUNT.EDIT_BUTTON_LABEL)
              : t(ACCOUNT.CONFIGURE_BUTTON_LABEL)}
          </Button>,
        ]}
      >
        <Typography
          id={PASSWORD_DISPLAY_INFORMATION_ID}
          variant="body1"
          color="textSecondary"
        >
          {passwordStatus?.hasPassword
            ? t(ACCOUNT.PASSWORD_SETTINGS_INFORMATION)
            : t(ACCOUNT.PASSWORD_SETTINGS_INFORMATION_NEW_PASSWORD)}
        </Typography>
      </BorderedSection>
    );
  }

  if (isPasswordStatusPending) {
    return <Skeleton />;
  }

  return <Alert severity="error">{t('UNEXPECTED_ERROR')}</Alert>;
};

export default DisplayPassword;
