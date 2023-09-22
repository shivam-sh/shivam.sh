'use client';

import Link from 'next/link';
import Logo from 'app/components/Logo';
import styles from './Navbar.module.scss';
import { useCurrentPageType, PageType } from 'app/lib/navigation';

export default function Navbar() {
  let currentPage = useCurrentPageType();

  return (
    <header className={styles.navbar}>
      <Link href="/" tabIndex={-1}>
        <Logo className={styles.logo} />
      </Link>

      <nav className={styles.links}>
        <Link href="/" className={currentPage === PageType.HOME ? styles.selected : ''}>
          <p className={styles.linkText}>
            <span>&nbsp;</span>home
          </p>
        </Link>
        <Link
          href="/posts"
          className={
            currentPage === PageType.POSTS || currentPage === PageType.POST ? styles.selected : ''
          }
        >
          <p className={styles.linkText}>
            <span>&nbsp;</span>posts
          </p>
        </Link>
        <Link
          href="/projects"
          className={
            currentPage === PageType.PROJECTS || currentPage === PageType.PROJECT
              ? styles.selected
              : ''
          }
        >
          <p className={styles.linkText}>
            <span>&nbsp;</span>projects
          </p>
        </Link>
        <Link href="/about" className={currentPage === PageType.ABOUT ? styles.selected : ''}>
          <p className={styles.linkText}>
            <span>&nbsp;</span>about
          </p>
        </Link>
      </nav>
    </header>
  );
}
