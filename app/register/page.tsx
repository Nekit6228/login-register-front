'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Auth, register } from '@/lib/authApi';
import css from './SingUp.module.css';
import { useAuthStore } from '@/lib/authStore';

const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    setError('');

    try {
      const formData = new FormData(e.currentTarget);
      const formValues = Object.fromEntries(formData) as Auth;

      const res = await register(formValues);
      if (res) {
        setUser(res);
        router.push('/profile'); 
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.log('error', error);
      setError('Invalid email or password');
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} onSubmit={handleSubmit}>
        <h1 className={css.formTitle}>Sign up</h1>

        <div className={css.formGroup}>
          <label htmlFor="email" className={css.label}>Email</label>
          <input id="email" type="email" name="email" className={css.input} required />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password" className={css.label}>Password</label>
          <input id="password" type="password" name="password" className={css.input} required />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>Register</button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};

export default SignUp;
