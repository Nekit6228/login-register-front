'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import css from './profile.module.css';
import { getProfile, logout } from '@/lib/authApi';
import { useAuthStore } from '@/lib/authStore';

const Profile = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);

  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        if (data?.email) {
          setUser({ email: data.email });
          setUserEmail(data.email);
        } else {
          router.push('/login');
        }
      } catch (err) {
        console.error('Profile fetch error:', err);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router, setUser]);

  const handleLogout = async () => {
    try {
      await logout();
      clearIsAuthenticated();
      router.push('login');
    } catch (err) {
      console.error('Logout error:', err);
      setError('Failed to logout');
    }
  };

  if (loading) {
    return (
      <main className={css.mainContent}>
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className={css.mainContent}>
      <h1 className={css.greeting}>Hello, {userEmail}</h1>
      <button onClick={handleLogout} className={css.logoutButton}>Logout</button>
      {error && <p className={css.error}>{error}</p>}
    </main>
  );
};

export default Profile;
