import { load } from 'cheerio';
import { rehype } from 'rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import rehypeSlug from 'rehype-slug';

import GhostAdminAPI from '@tryghost/admin-api';

const api = new GhostAdminAPI({
  url: process.env.GHOST_URL,
  key: process.env.GHOST_API_KEY,
  version: 'v5.45',
});

export async function rehypeHTML(htmlString: string) {
  return await rehype()
    .use(rehypeHighlight)
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(htmlString);
}

export async function fetchPosts() {
  return await api.posts
    .browse({ limit: 'all', formats: ['html'], include: 'tags' })
    .then((posts) => {
      return posts.filter(
        (post) =>
          post.tags.some((tag) => tag.name === '#post') &&
          post.status === 'published'
      );
    });
}

export async function fetchPost(slug: string) {
  return await api.posts
    .read({ slug, formats: ['html'], include: 'tags' })
    .then((post) => {
      if (!post.tags.some((tag) => tag.name === '#post')) {
        throw new Error('Not found');
      }
      return post;
    })
    .catch(() => {
      return '';
    });
}

export async function fetchProjects() {
  return await api.posts
    .browse({ limit: 'all', formats: ['plaintext'], include: 'tags' })
    .then((projects) => {
      return projects.filter(
        (project) =>
          project.tags.some((tag) => tag.name === '#project') &&
          project.status === 'published'
      );
    });
}

export async function fetchProject(slug: string) {
  return await api.posts
    .read({ slug, formats: ['html'], include: 'tags' })
    .then((project) => {
      if (!project.tags.some((tag) => tag.name === '#project')) {
        throw new Error('Not found');
      }
      return project;
    })
    .catch(() => {
      return '';
    });
}

export async function fetchWithID(id: string) {
  return await api.posts
    .browse({ formats: ['html'], filter: `uuid:${id}` })
    .then((post) => post[0])
    .catch(() => {
      return '';
    });
}

export async function parseTOC(htmlString: string) {
  const $ = load(htmlString);
  const headings: { id: string; text: string; depth: number }[] = [];

  $('[id]').each((_, element) => {
    const id = $(element).attr('id') ?? '';
    const text = $(element).text() ?? '';

    if (id !== '' && element.tagName.toLowerCase().startsWith('h')) {
      const depth = element.tagName.charCodeAt(1) - 48;
      headings.push({ id, text, depth });
    }
  });
  return headings;
}
