import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import { Alert, Stack, Typography } from '@mui/material';

import { AccountType, formatDate } from '@graasp/sdk';

import i18n, { useAccountTranslation } from '@/config/i18n';
import { hooks } from '@/config/queryClient';
import {
  MEMBER_CREATED_AT_ID,
  MEMBER_USERNAME_DISPLAY_ID,
} from '@/config/selectors';

import AvatarUploader from '../ProfilePicture/AvatarUploader';

const MemberCard = (): JSX.Element | null => {
  const { t } = useAccountTranslation();
  const { data: member } = hooks.useCurrentMember();

  if (member?.type !== AccountType.Individual) {
    return (
      <Alert severity="error">
        {t('User is a guest or is not unauthenticated')}
      </Alert>
    );
  }

  if (member) {
    return (
      <Stack direction="row" spacing={2} alignItems="center">
        <Stack alignItems="center" spacing={2}>
          <AvatarUploader member={member} />
        </Stack>
        <Stack spacing={3}>
          <Typography variant="h4">
            {t('GENERAL_PAGE_WELCOME_TEXT')},
          </Typography>
          <Typography variant="h4" id={MEMBER_USERNAME_DISPLAY_ID}>
            {member?.name}
          </Typography>
          <Typography
            display="flex"
            alignItems="center"
            gap={1}
            variant="h5"
            id={MEMBER_CREATED_AT_ID}
          >
            <AlarmOnIcon fontSize="small" />

            {t('PROFILE_CREATED_AT_INFO', {
              date: formatDate(member?.createdAt, { locale: i18n.language }),
            })}
          </Typography>
        </Stack>
      </Stack>
    );
  }

  // improvement: add a loading interface
  return null;
};

export default MemberCard;
