'use client';

import { ConnectIcon, DashboardIcon, FeedIcon, VillaIcon } from 'app/custom/assets/Icons';
import Link from 'next/link';
import Logo from 'app/custom/assets/Logo';
import styles from 'styles/Navbar.module.scss';
import { currentPageType, PageType } from '../navigation';

export default function Navbar() {
  let currentPage = currentPageType()

  return (
    <header className={styles.navbar}>
      <Link href="/" tabIndex={-1}>
        <Logo className={styles.logo} />
      </Link>

      <nav className={styles.links}>
        <Link
          href="/"
          className={currentPage === PageType.HOME ? styles.selected : ''}
        >
          <span>
            <VillaIcon />
          </span>
          <p className={styles.linkText}>
            <span>&nbsp;</span>home
          </p>
        </Link>
        <Link
          href="/posts"
          className={currentPage === PageType.POSTS || currentPage === PageType.POST ? styles.selected : ''}
        >
          <span>
            <FeedIcon />
          </span>
          <p className={styles.linkText}>
            <span>&nbsp;</span>posts
          </p>
        </Link>
        <Link
          href="/projects"
          className={currentPage === PageType.PROJECTS || currentPage === PageType.PROJECT ? styles.selected : ''}
        >
          <span>
            <DashboardIcon />
          </span>
          <p className={styles.linkText}>
            <span>&nbsp;</span>projects
          </p>
        </Link>
        <Link
          href="/about"
          className={currentPage === PageType.ABOUT ? styles.selected : ''}
        >
          <span>
            <ConnectIcon />
          </span>
          <p className={styles.linkText}>
            <span>&nbsp;</span>about
          </p>
        </Link>
      </nav>
    </header>
  );
}
