'use client';

import Link from 'next/link';
import Logo from 'app/components/Logo';
import styles from './Navbar.module.scss';
import { useCurrentPageType, PageType } from 'app/lib/navigation';

export default function Navbar() {
  let currentPage = useCurrentPageType();

  return (
    <header
      className={`fixed lg:fixed z-[1] flex h-auto w-screen flex-row justify-between pb-[0.8rem] pl-4 pr-[0.3rem] pt-4 md:min-w-32 lg:bottom-8 lg:h-full lg:w-auto lg:flex-col lg:gap-[2rem] lg:px-8 lg:py-0 ${styles.navbar}`}
      id='sidebar' 
    >
      <Link href="/" tabIndex={-1}>
        <Logo className="fixed left-0 top-0 px-4 py-[0.6rem] lg:pb-8 lg:pl-[1.8rem] lg:pr-8 lg:pt-6" />
      </Link>

      <nav className="relative bottom-auto flex flex-row gap-[0.7rem] right-[1.5rem] lg:fixed lg:bottom-8 lg:left-8 lg:flex-col lg:gap-8">
        <Link
          href="/"
          className={`group ${currentPage === PageType.HOME ? 'selected' : ''} text-text`}
        >
          <p className="m-0 flex items-center gap-0 text-[1.15rem] font-bold leading-5 transition-all duration-200 ease-in-out group-hover:gap-[0.3rem] group-[.selected]:gap-[0.3rem]">
            <span className="m-0 inline-block w-0 rounded-sm bg-accent opacity-0 transition-all duration-200 ease-in-out group-hover:h-auto group-hover:w-[0.2rem] group-hover:opacity-100 group-[.selected]:h-auto group-[.selected]:w-[0.2rem] group-[.selected]:opacity-100">
              &nbsp;
            </span>
            home
          </p>
        </Link>

        <Link
          href="/posts"
          className={`group ${
            currentPage === PageType.POSTS || currentPage === PageType.POST ? 'selected' : ''
          }`}
        >
          <p className="m-0 flex items-center gap-0 text-[1.15rem] font-bold leading-5 transition-all duration-200 ease-in-out group-hover:gap-[0.3rem] group-[.selected]:gap-[0.3rem]">
            <span className="m-0 inline-block w-0 rounded-sm bg-accent opacity-0 transition-all duration-200 ease-in-out group-hover:h-auto group-hover:w-[0.2rem] group-hover:opacity-100 group-[.selected]:h-auto group-[.selected]:w-[0.2rem] group-[.selected]:opacity-100">
              &nbsp;
            </span>
            posts
          </p>
        </Link>

        <Link
          href="/projects"
          className={`group ${
            currentPage === PageType.PROJECTS || currentPage === PageType.PROJECT ? 'selected' : ''
          }`}
        >
          <p className="m-0 flex w-auto items-center gap-0 text-[1.15rem] font-bold leading-5 transition-all duration-200 ease-in-out group-hover:gap-[0.3rem] group-[.selected]:gap-[0.3rem]">
            <span className="m-0 inline-block w-0 rounded-sm bg-accent opacity-0 transition-all duration-200 ease-in-out group-hover:h-auto group-hover:w-[0.2rem] group-hover:opacity-100 group-[.selected]:h-auto group-[.selected]:w-[0.2rem] group-[.selected]:opacity-100">
              &nbsp;
            </span>
            projects
          </p>
        </Link>

        <Link href="/about" className={`group ${currentPage === PageType.ABOUT ? 'selected' : ''}`}>
          <p className="m-0 flex items-center gap-0 text-[1.15rem] font-bold leading-5 transition-all duration-200 ease-in-out group-hover:gap-[0.3rem] group-[.selected]:gap-[0.3rem]">
            <span className="m-0 inline-block w-0 rounded-sm bg-accent opacity-0 transition-all duration-200 ease-in-out group-hover:h-auto group-hover:w-[0.2rem] group-hover:opacity-100 group-[.selected]:h-auto group-[.selected]:w-[0.2rem] group-[.selected]:opacity-100">
              &nbsp;
            </span>
            about
          </p>
        </Link>
      </nav>
    </header>
  );
}
