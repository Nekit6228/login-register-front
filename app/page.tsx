import Link from "next/link";
import css from './page.module.css';

export default function Home() {
  return (
    <div className={css.homeContainer}>
      <h1 className={css.homeTitle}>Welcome 👋</h1>
      <div className={css.linksWrapper}>
        <Link href="/login" className={css.linkButton}>Login</Link>
        <Link href="/register" className={css.linkButton}>Register</Link>
      </div>
    </div>
  );
}
