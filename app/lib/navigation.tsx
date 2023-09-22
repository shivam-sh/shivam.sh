`use client`;

import { usePathname } from 'next/navigation';

export enum PageType {
  HOME = 'HOME',
  POSTS = 'POSTS',
  PROJECTS = 'PROJECTS',
  POST = 'POST',
  PROJECT = 'PROJECT',
  ABOUT = 'ABOUT',
  UNKNOWN = 'UNKNOWN'
}

const pathToPageTypeRegex = {
  [PageType.HOME]: /^\/$/,
  [PageType.POSTS]: /^\/posts$/,
  [PageType.PROJECTS]: /^\/projects$/,
  [PageType.ABOUT]: /^\/about$/,
  [PageType.POST]: /^\/posts\/[a-zA-Z0-9_-]+$/,
  [PageType.PROJECT]: /^\/projects\/[a-zA-Z0-9_-]+$/
};

export function currentPageType(): PageType {
  const pathname = usePathname();

  const pageType =
    Object.entries(pathToPageTypeRegex).find(([, regex]) => regex.test(pathname))?.[0] ??
    PageType.UNKNOWN;

  return pageType as PageType;
}
