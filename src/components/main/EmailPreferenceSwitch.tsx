import { SelectChangeEvent } from '@mui/material';

import { MemberExtra } from '@graasp/sdk';
import { Select } from '@graasp/ui';

import { useAccountTranslation } from '@/config/i18n';

import { emailFrequency } from '../../config/constants';
import { mutations } from '../../config/queryClient';

type EmailPreferenceSwitchProps = {
  id?: string;
  memberId: string;
  emailFreq: MemberExtra['emailFreq'];
};

const EmailPreferenceSwitch = ({
  id,
  memberId,
  emailFreq,
}: EmailPreferenceSwitchProps): JSX.Element => {
  const { t } = useAccountTranslation();
  const { mutate: editMember } = mutations.useEditMember();

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    if (event.target.value) {
      editMember({
        id: memberId,
        extra: {
          emailFreq: event.target.value as MemberExtra['emailFreq'],
        },
      });
    } else {
      console.error(`The frequency ${event.target.value} is not valid`);
    }
  };

  return (
    <Select
      id={id}
      defaultValue={emailFreq}
      onChange={handleChange}
      variant="standard"
      values={Object.entries(emailFrequency).map(([freq, name]) => ({
        value: freq,
        text: t(name),
      }))}
    />
  );
};

export default EmailPreferenceSwitch;
