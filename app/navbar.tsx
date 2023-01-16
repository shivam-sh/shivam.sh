'use client';

import { BoxIcon, FileTextIcon, HomeIcon } from 'components/Icons';
import Link from 'next/link';
import Logo from 'components/Logo';
import styles from 'styles/components/Navbar.module.scss';
import { usePathname } from 'next/navigation';

enum NavbarLink {
  Home = '',
  Blog = 'blog',
  Projects = 'projects',
  About = 'about',
}

export default function Navbar() {
  const pathname = usePathname();
  const currentPage = pathname.split('/')[1];
  let currentLink: NavbarLink;

  if (currentPage.length === 4 && !isNaN(parseInt(currentPage))) {
    currentLink = NavbarLink.Blog;
  } else currentLink = currentPage as NavbarLink;

  return (
    <header className={styles.navbar}>
      <Link href="/">
        <Logo className={styles.logo} />
      </Link>

      <nav className={styles.links}>
        <Link
          href="/"
          className={currentLink === NavbarLink.Home ? styles.selected : ''}
        >
          <span>
            <HomeIcon />
          </span>
          <h6>
            <span>❯ </span>home
          </h6>
        </Link>
        <Link
          href="/blog"
          className={currentLink === NavbarLink.Blog ? styles.selected : ''}
        >
          <span>
            <FileTextIcon />
          </span>
          <h6>
            <span>❯ </span>blog
          </h6>
        </Link>
        <Link
          href="/projects"
          className={currentLink === NavbarLink.Projects ? styles.selected : ''}
        >
          <span>
            <BoxIcon />
          </span>
          <h6>
            <span>❯ </span>projects
          </h6>
        </Link>
      </nav>
    </header>
  );
}
