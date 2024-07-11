import { SelectChangeEvent } from '@mui/material';

import { CompleteMember, EmailFrequency } from '@graasp/sdk';
import { Select } from '@graasp/ui';

import { useAccountTranslation } from '@/config/i18n';

import { emailFrequency } from '../../config/constants';

type EmailPreferenceSwitchProps = {
  id?: string;
  emailFreq: CompleteMember['extra']['emailFreq'];
  onChange: (newEmailFreq: `${EmailFrequency}`) => void;
};

const EmailPreferenceSwitch = ({
  id,
  emailFreq,
  onChange,
}: EmailPreferenceSwitchProps): JSX.Element => {
  const { t } = useAccountTranslation();

  const handleChange = (event: SelectChangeEvent<string>) => {
    const newEmailFreq = event.target.value as `${EmailFrequency}`;
    if (newEmailFreq) {
      onChange(newEmailFreq);
    } else {
      console.error(`The frequency ${event.target.value} is not valid`);
    }
  };

  return (
    <Select
      id={id}
      defaultValue={emailFreq}
      onChange={handleChange}
      variant="outlined"
      size="small"
      values={Object.entries(emailFrequency).map(([freq, name]) => ({
        value: freq,
        text: t(name),
      }))}
    />
  );
};

export default EmailPreferenceSwitch;
