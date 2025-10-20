'use client';

import css from './SingUp.module.css';
import { Auth, register } from '@/lib/authApi';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/authStore';
import axios from 'axios';

const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData) as Auth;

    try {
      const res = await register(formValues);
      if (res) {
        setUser({ email: formValues.email }); 
        router.push('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch (err: unknown) {
  if (axios.isAxiosError(err)) {
    setError(err.response?.data?.message || 'Invalid email or password');
  } else if (err instanceof Error) {
    setError(err.message);
  } else {
    setError('Invalid email or password');
  }
}

  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" className={css.input} required />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" className={css.input} required />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};

export default SignUp;
