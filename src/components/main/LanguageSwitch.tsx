import { SelectChangeEvent } from '@mui/material';

import { langs } from '@graasp/translations';
import { Select } from '@graasp/ui';

import { MEMBER_PROFILE_LANGUAGE_SWITCH_ID } from '@/config/selectors';

import { mutations } from '../../config/queryClient';

type Props = {
  memberId: string;
  lang: string;
};

const LanguageSwitch = ({ memberId, lang }: Props): JSX.Element => {
  const { mutate: editMember } = mutations.useEditMember();

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    if (event.target.value) {
      editMember({
        id: memberId,
        extra: {
          lang: event.target.value as string,
        },
      });
    } else {
      console.error(`The lang ${event.target.value} is not valid`);
    }
  };

  return (
    <Select
      variant="standard"
      id={MEMBER_PROFILE_LANGUAGE_SWITCH_ID}
      defaultValue={lang}
      onChange={handleChange}
      buildOptionId={(value) => value}
      values={Object.entries(langs).map(([value, text]) => ({ value, text }))}
    />
  );
};

export default LanguageSwitch;
