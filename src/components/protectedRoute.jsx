import { useEffect } from 'react';
import useAuthStore from '../stores/useAuthStore';

const AuthInitializer = () => {
  const { token, login, logout, setLoading } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        setLoading(true);
        try {
          const res = await fetch('/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (res.ok) {
            const user = await res.json();
            login(user, token);
          } else {
            logout();
          }
        } catch {
          logout();
        } finally {
          setLoading(false);
        }
      }
    };
    initAuth();
  }, [token, login, logout, setLoading]);

  return null;
};

export default AuthInitializer;
