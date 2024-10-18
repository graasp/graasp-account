import { useForm } from 'react-hook-form';

import { Button, Stack, TextField, Typography } from '@mui/material';

import { createFileRoute } from '@tanstack/react-router';

import { mutations } from '@/config/queryClient';
import { Altcha } from '@/modules/auth/Altcha';

export const Route = createFileRoute('/register')({
  component: RegisterRoute,
});

type RegisterInput = {
  name: string;
  email: string;
  enableSaveActions: boolean;
  captcha: string;
};

function RegisterRoute() {
  const { register, handleSubmit, setValue } = useForm<RegisterInput>();
  const useRegister = mutations.useSignUp();

  // register the captcha outside since the value will be updated with `setValue`
  register('captcha', { required: true });

  const onSubmit = async (formData: RegisterInput) => {
    useRegister.mutate(formData);
  };

  return (
    <>
      <Typography>Hello /register</Typography>
      <Stack component="form" onSubmit={handleSubmit(onSubmit)} gap={1}>
        <TextField {...register('email')} placeholder="Email" />
        <TextField {...register('name')} placeholder="Name" />
        <Stack direction="row">
          <input
            type="checkbox"
            id="enableSaveActions"
            {...register('enableSaveActions')}
          />
          <label
            htmlFor="enableSaveActions"
            style={{ paddingInlineStart: '4px', userSelect: 'none' }}
          >
            Enable Save Actions
          </label>
        </Stack>
        <Altcha onChange={(value) => setValue('captcha', value)} />
        <Button
          type="submit"
          sx={{ textTransform: 'none' }}
          variant="contained"
        >
          Create an account
        </Button>
      </Stack>
    </>
  );
}
