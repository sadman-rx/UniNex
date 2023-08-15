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
// config
import { PATH_AFTER_LOGIN } from 'src/config-global';
// auth
import { useAuthContext } from 'src/auth/hooks';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function RegisterView() {
  const { register } = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const password = useBoolean();

  const roles = [
    { value: 'student', label: 'Student', icon: 'mdi:account-school-outline' },
    { value: 'faculty', label: 'Faculty', icon: 'mdi-account-group' },
    { value: 'alumni', label: 'Alumni', icon: 'mdi:account-group-outline' },
  ];  

  const RegisterSchema = Yup.object().shape({
    role: Yup.string()
      .required('Role is required')
      .oneOf(roles.map(role => role.value), 'Invalid role option'),
    id: Yup.string().required('ID Card Number is required'),
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    email: Yup.string()
      .when('role', {
        is: role => ['student', 'faculty'].includes(role),
        then: () => Yup.string()
          .email('Invalid email format')
          .matches(/^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)?uiu\.ac\.bd$/, {
            message: 'Email must end with @uiu.ac.bd or @[any subdomain].uiu.ac.bd',
            excludeEmptyString: true,
          })
          .required('Email is required'),
        otherwise: () => Yup.string().email('Invalid email format'),
      }),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(32, 'Password must not exceed 32 characters'),
  });
    

  const defaultValues = {
    role: 'student',
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
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleRoleChange = (event, newRole) => {
    setValue('role', newRole);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      await register?.(data);

      router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);
      reset();
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
        
          <ToggleButtonGroup value={watch('role')} exclusive color="primary" onChange={handleRoleChange}>
            {roles.map(role => (
              <ToggleButton key={role.value} value={role.value}>
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
          helperText={watch('role') === 'student' || watch('role') === 'faculty' ? 'Must be a valid UIU email' : ''}
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
