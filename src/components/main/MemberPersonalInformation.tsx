import { Link } from 'react-router-dom';

import { Button, Grid, Stack, Typography } from '@mui/material';

import { useAccountTranslation } from '@/config/i18n';
import { EDIT_MEMBER_INFO } from '@/config/paths';
import { hooks } from '@/config/queryClient';
import {
  MEMBER_PROFILE_EMAIL_ID,
  USERNAME_DISPLAY_ID,
} from '@/config/selectors';

import MemberProfileItem from './MemberProfileItem';
import RoundedStack from './RoundedStack';

const MemberPersonalInformation = (): JSX.Element => {
  const { data: member } = hooks.useCurrentMember();
  const { t } = useAccountTranslation();

  return (
    <RoundedStack>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5">{t('PERSONAL_INFORMATION_TITLE')}</Typography>
        <Link to={EDIT_MEMBER_INFO} className="link">
          <Button variant="contained" color="primary">
            {t('EDIT_BUTTON_LABEL')}
          </Button>
        </Link>
      </Stack>
      <Grid container spacing={1}>
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
        <MemberProfileItem title={t('PASSWORD_TITLE')} contentId="" />
      </Grid>
    </RoundedStack>
  );
};

export default MemberPersonalInformation;
