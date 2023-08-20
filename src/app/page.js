'use client';

// auth
import { AuthGuard } from 'src/auth/guard';
// components
import DashboardLayout from 'src/layouts/dashboard';

import { NewsFeedView } from 'src/sections/newsfeed/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <NewsFeedView />
      </DashboardLayout>
    </AuthGuard>
  );
}
