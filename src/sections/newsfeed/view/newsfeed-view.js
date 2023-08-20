'use client';

import { useSearchParams } from 'next/navigation'
// @mui
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
// components
import { useSettingsContext } from 'src/components/settings';
// assets
import { SeoIllustration } from 'src/assets/illustrations';
import { useAuthContext } from 'src/auth/hooks';

import Welcome from '../welcome';
import Feed from '../feed';

// ----------------------------------------------------------------------

export default function OverviewAppView() {
  const { user } = useAuthContext();

  const settings = useSettingsContext();

  const searchParams = useSearchParams()
  const search = searchParams.get('utm_source');


  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Stack spacing={3}>
        {
          search && search === "login" && (
            <Welcome
              title={`Welcome back 👋 \n ${user?.displayName}`}
              description="If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything."
              img={<SeoIllustration />}
            />           
          )
        }
        <Feed />
      </Stack>
    </Container>
  );
}
