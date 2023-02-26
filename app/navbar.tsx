'use client';

import { ConnectIcon, DashboardIcon, FeedIcon, VillaIcon } from 'assets/Icons';
import Link from 'next/link';
import Logo from 'assets/Logo';
import styles from 'styles/Navbar.module.scss';
import { usePathname } from 'next/navigation';

enum NavbarLink {
  Home = '',
  Blog = 'blog',
  Projects = 'projects',
  About = 'about',
}

export default function Navbar() {
  const pathname = usePathname() ?? '';
  const currentPage = pathname.split('/')[1];
  let currentLink: NavbarLink;

  if (currentPage.length === 4 && !isNaN(parseInt(currentPage))) {
    currentLink = NavbarLink.Blog;
  } else currentLink = currentPage as NavbarLink;

  return (
    <header className={styles.navbar}>
      <Link href="/" tabIndex={-1}>
        <Logo className={styles.logo} />
      </Link>

      <nav className={styles.links}>
        <Link
          href="/"
          className={currentLink === NavbarLink.Home ? styles.selected : ''}
        >
          <span>
            <VillaIcon />
          </span>
          <p className={styles.linkText}>
            <span>&nbsp;</span>home
          </p>
        </Link>
        <Link
          href="/blog"
          className={currentLink === NavbarLink.Blog ? styles.selected : ''}
        >
          <span>
            <FeedIcon />
          </span>
          <p className={styles.linkText}>
            <span>&nbsp;</span>blog
          </p>
        </Link>
        <Link
          href="/projects"
          className={currentLink === NavbarLink.Projects ? styles.selected : ''}
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
          className={currentLink === NavbarLink.About ? styles.selected : ''}
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
