import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';
// routes
import { useRouter, useSearchParams } from 'src/routes/hooks';
//
import { PATH_AFTER_LOGIN } from 'src/config-global';
import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

export default function GuestGuard({ children }) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo') || PATH_AFTER_LOGIN;

  const { authenticated } = useAuthContext();

  const check = useCallback(() => {
    if (authenticated) {
      router.replace(returnTo);
    }
  }, [authenticated, returnTo, router]);

  useEffect(() => {
    check();
  }, [check]);

  return <>{children}</>;
}

GuestGuard.propTypes = {
  children: PropTypes.node,
};
