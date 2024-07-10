import { useState } from 'react';

import { Button, Typography } from '@mui/material';

import BorderedSection from '@/components/layout/BorderedSection';
import { useAccountTranslation } from '@/config/i18n';
import {
  PASSWORD_DISPLAY_CONTAINER_ID,
  PASSWORD_DISPLAY_INFORMATION_ID,
  PASSWORD_EDIT_BUTTON_ID,
} from '@/config/selectors';

import EditPassword from './EditPassword';

const DisplayPassword = (): JSX.Element => {
  const { t } = useAccountTranslation();
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return <EditPassword onClose={handleClose} />;
  }
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
          {t('EDIT_BUTTON_LABEL')}
        </Button>,
      ]}
    >
      <Typography
        id={PASSWORD_DISPLAY_INFORMATION_ID}
        variant="body1"
        color="textSecondary"
      >
        {t('PASSWORD_SETTINGS_INFORMATION')}
      </Typography>
    </BorderedSection>
  );
};

export default DisplayPassword;
