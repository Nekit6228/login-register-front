'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Auth, register } from '@/lib/authApi';
import css from './SingUp.module.css';

const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData) as Auth;

    try {
      const res = await register(formValues);
      if (res) {
        // После успешной регистрации редиректим на login
        router.push('/login');
      } else {
        setError('Invalid email or password');
      }
    } catch (err: unknown) {
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
