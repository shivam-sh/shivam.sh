import Link from 'next/link';
import SiteLogo from '../siteLogo';
import styles from './header.module.scss';

export default function Header() {
  return (
    <div className={styles.header}>
      <Link href="/">
        <SiteLogo className={styles.siteLogo} />
      </Link>

      <div className={styles.nav}>
        <Link href="/blog">
          <a className={styles.navButton}>Blog</a>
        </Link>

        <p className={styles.divider}>/</p>

        <Link href="/projects">
          <a className={styles.navButton}>Projects</a>
        </Link>

        <p className={styles.divider}>/</p>

        <Link href="/about">
          <a className={styles.navButton}>About</a>
        </Link>
      </div>
    </div>
  );
}
