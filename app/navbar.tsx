'use client';

import { BoxIcon, FileTextIcon, HomeIcon } from 'components/Icons';
import Link from 'next/link';
import Logo from 'components/Logo';
import styles from 'styles/components/Navbar.module.scss';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

enum NavbarLink {
  Home = '',
  Blog = 'blog',
  Projects = 'projects',
  About = 'about',
}

const accentColors = {
  accent: [
    '#40a3ff',
    '#fe523c',
    '#fc80ff',
    '#21debb',
    '#8746f0',
    '#f5c116',
    '#f5241d',
  ],
};

export class AccentChanger {
  static observer: Function = () => {};

  static subscribe(observer: Function) {
    AccentChanger.observer = observer;
  }

  static unsubscribe() {
    AccentChanger.observer = () => {};
  }

  static randomizeAccentColor() {
    const color =
      accentColors.accent[
        Math.floor(Math.random() * accentColors.accent.length)
      ];

    document.documentElement.style.setProperty('--accent', color);

    AccentChanger.observer({ accentColor: color });
  }
}

export default function Navbar() {
  const pathname = usePathname();
  const currentPage = pathname.split('/')[1];
  let currentLink: NavbarLink;

  if (currentPage.length === 4 && !isNaN(parseInt(currentPage))) {
    currentLink = NavbarLink.Blog;
  } else currentLink = currentPage as NavbarLink;

  const [accentColor, setAccentColor] = useState(
    typeof window !== 'undefined' ?
      document.documentElement.style.getPropertyValue('--accent')
      : '#40a3ff'
  );

  useEffect(() => {
    AccentChanger.subscribe((e) => {
      setAccentColor(e.accentColor);
    });

    return AccentChanger.unsubscribe();
  }, []);

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
            <HomeIcon />
          </span>
          <h6>
            <span>&nbsp;</span>home
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
            <span>&nbsp;</span>blog
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
            <span>&nbsp;</span>projects
          </h6>
        </Link>
      </nav>
    </header>
  );
}
