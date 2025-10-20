'use client';
import { useRouter } from 'next/navigation';
import css from './SignIn.module.css';
import { useState, FormEvent } from 'react';
import { useAuthStore } from '@/lib/authStore';
import { Auth, login } from '@/lib/authApi';

const SignIn = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData) as Auth;

    try {
      const res = await login(formValues);
      if (res) {
        setUser({ email: formValues.email }); 
        router.push('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch (err: any) {
      console.error('Login error:', err.response?.data || err);
      setError(err.response?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} onSubmit={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" className={css.input} required />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" className={css.input} required />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>Log in</button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};

export default SignIn;
