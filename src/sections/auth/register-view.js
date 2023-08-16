'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useSearchParams, useRouter } from 'src/routes/hooks';
// auth
import { useAuthContext } from 'src/auth/hooks';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';

// ----------------------------------------------------------------------

export default function RegisterView({ roles }) {
  const { register } = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const { enqueueSnackbar } = useSnackbar();

  const password = useBoolean();

  const RegisterSchema = Yup.object().shape({
    roleId: Yup.number().required('Role is required'),
    id: Yup.string().required('ID Card Number is required'),
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    email: Yup.string().when("roleId", {
      is: (roleId) => roles.find(r => r.id === roleId)?.requireUIUEmail,
      then: () => Yup.string().required('Email address is required').email('A valid email address required').matches(/\b[\w\.-]+@(?:\w+\.)?uiu\.ac\.bd\b/, 'Email must end with @uiu.ac.bd or @[subdomain].uiu.ac.bd'),
      otherwise: () => Yup.string().required('Email address is required').email('A valid email address required'),
    }),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(32, 'Password must not exceed 32 characters'),
  });


  const defaultValues = {
    roleId: roles[0].id,
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    watch,
    setValue,
    handleSubmit,
    errors,
    formState: { isSubmitting },
  } = methods;

  const handleRoleChange = (event, newRole) => {
    setValue('roleId', newRole);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      await register?.(data);
      enqueueSnackbar('Registered successfully. Please verify your account before login.');
      router.push(paths.auth.login);
    } catch (error) {
      console.error(error);
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
      <Typography variant="h4">Get started absolutely free</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2"> Already have an account? </Typography>

        <Link href={paths.auth.login} component={RouterLink} variant="subtitle2">
          Sign in
        </Link>
      </Stack>
    </Stack>
  );

  const renderTerms = (
    <Typography
      component="div"
      sx={{
        color: 'text.secondary',
        mt: 2.5,
        typography: 'caption',
        textAlign: 'center',
      }}
    >
      {'By signing up, I agree to '}
      <Link underline="always" color="text.primary">
        Terms of Service
      </Link>
      {' and '}
      <Link underline="always" color="text.primary">
        Privacy Policy
      </Link>
      .
    </Typography>
  );

  const renderForm = (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={2.5}>
        {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

        <ToggleButtonGroup value={watch('roleId')} exclusive color="primary" onChange={handleRoleChange}>
          {roles.map(role => (
            <ToggleButton key={role.id} value={role.id}>
              <Stack direction="row" spacing={1}>
                <Iconify icon={role.icon} />
                <Typography variant="body2">{role.label}</Typography>
              </Stack>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <RHFTextField name="id" label="ID Card Number" />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="firstName" label="First name" />
          <RHFTextField name="lastName" label="Last name" />
        </Stack>

        <RHFTextField
          name="email"
          label="Email address"
          helperText={roles.find(r => r.id === watch("roleId"))?.requireUIUEmail ? 'Must be a valid UIU email' : ''}
        />

        <RHFTextField
          name="password"
          label="Password"
          type={password.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Create account
        </LoadingButton>
      </Stack>
    </FormProvider>
  );

  return (
    <>
      {renderHead}

      {renderForm}

      {renderTerms}
    </>
  );
}
