import { format } from 'date-fns';
import GhostAdminAPI from '@tryghost/admin-api';
import { cache } from 'react';

const api = new GhostAdminAPI({
  url: process.env.GHOST_URL,
  key: process.env.GHOST_API_KEY,
  version: 'v5.45'
});

export async function fetchPosts() {
  return await api.posts
    .browse({ limit: 'all', formats: ['html'], include: 'tags' })
    .then((posts) => {
      return posts.filter(
        (post) => post.tags.some((tag) => tag.name === '#post') && post.status === 'published'
      );
    })
    .then((ghostPosts) => {
      let posts: any[] = [];
      for (const post of ghostPosts) {
        const inline = post.tags.some((tag) => tag.name === '#inline');

        const localPost = {
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          date: format(new Date(post.published_at), 'dd-MM-yyyy'),
          inline: inline,
          html: inline ? post.html : null,
          url: post.canonical_url != null ? post.canonical_url : post.url,
          externalLink: post.canonical_url != null,
          updatedAt: post.updated_at
        };

        posts.push(localPost);
      }
      return posts;
    })
    .then((posts) => {
      for (const post of posts) {
        if (post.url.startsWith(process.env.SITE_URL)) {
          post.url = post.url.replace(process.env.SITE_URL, '');
        } else if (process.env.VERCEL_URL && post.url.startsWith(process.env.VERCEL_URL)) {
          post.url = post.url.replace(process.env.VERCEL_URL, '');
        }
      }
      return posts;
    });
}

export async function fetchRSSPosts() {
  return await api.posts
    .browse({ limit: 20, formats: ['html'], include: 'tags' })
    .then((posts) => {
      return posts.filter(
        (post) => post.tags.some((tag) => tag.name === '#post') && post.status === 'published'
      );
    })
    .then((ghostPosts) => {
      let posts: any[] = [];
      for (const post of ghostPosts) {
        const localPost = {
          title: post.title,
          excerpt: post.excerpt,
          date: new Date(post.published_at),
          url: post.canonical_url != null ? post.canonical_url : post.url,
          html: post.html
        };

        posts.push(localPost);
      }
      return posts;
    })
    .then((posts) => {
      for (const post of posts) {
        if (post.url.startsWith(process.env.SITE_URL)) {
          post.url = post.url.replace(process.env.SITE_URL, '');
        } else if (process.env.VERCEL_URL && post.url.startsWith(process.env.VERCEL_URL)) {
          post.url = post.url.replace(process.env.VERCEL_URL, '');
        }
      }
      return posts;
    });
}

export async function fetchProjects() {
  return await api.posts
    .browse({ limit: 'all', formats: ['plaintext'], include: 'tags' })
    .then((projects) => {
      return projects.filter(
        (project) =>
          project.tags.some((tag) => tag.name === '#project') && project.status === 'published'
      );
    })
    .then((ghostProjects) => {
      let projects: any[] = [];
      for (const project of ghostProjects) {
        const localProject = {
          slug: project.slug,
          title: project.title,
          excerpt: project.excerpt,
          url: project.canonical_url != null ? project.canonical_url : project.url,
          externalLink: project.canonical_url != null,
          featureImage: project.feature_image,
          updatedAt: project.updated_at
        };
        projects.push(localProject);
      }
      return projects;
    })
    .then((projects) => {
      for (const project of projects) {
        if (project.url.startsWith(process.env.SITE_URL)) {
          project.url = project.url.replace(process.env.SITE_URL, '');
        } else if (process.env.VERCEL_URL && project.url.startsWith(process.env.VERCEL_URL)) {
          project.url = project.url.replace(process.env.VERCEL_URL, '');
        }
      }
      return projects;
    });
}

// Ghost's Admin API reports a missing resource as a `NotFoundError`. Anything else (network
// failure, timeout, auth, 5xx) is rethrown so ISR keeps serving the last good page instead of
// caching a 404 over it, and so builds fail loudly.
function isNotFound(error): boolean {
  return error?.name === 'NotFoundError' || error?.type === 'NotFoundError';
}

async function readPost(slug: string) {
  try {
    return await api.posts.read({ slug, formats: ['html'], include: 'tags' });
  } catch (error) {
    if (isNotFound(error)) return null;
    throw error;
  }
}

// Returns null only when the post genuinely doesn't exist; throws if Ghost is unreachable
export const fetchPost = cache(async (slug: string) => {
  const post = await readPost(slug);
  if (!post || !post.tags.some((tag) => tag.name === '#post')) return null;

  return {
    title: post.title,
    excerpt: post.excerpt,
    html: post.html,
    inline: post.tags.some((tag) => tag.name === '#inline'),
    featureImage: post.feature_image,
    publishedAt: post.published_at,
    updatedAt: post.updated_at,
    projectSlug: linkedProjectSlug(post)
  };
});

// Posts are linked to a project with an internal tag `#project-<project-slug>`. Ghost slugs
// internal ('#') tags as `hash-<name>`, so `#project-goose-bot` becomes `hash-project-goose-bot`.
const PROJECT_LINK_TAG_PREFIX = 'hash-project-';

function linkedProjectSlug(post): string | null {
  const tag = post.tags.find((tag) => tag.slug.startsWith(PROJECT_LINK_TAG_PREFIX));
  return tag ? tag.slug.slice(PROJECT_LINK_TAG_PREFIX.length) : null;
}

function toSitePath(url: string): string {
  if (process.env.SITE_URL && url.startsWith(process.env.SITE_URL)) {
    return url.replace(process.env.SITE_URL, '');
  } else if (process.env.VERCEL_URL && url.startsWith(process.env.VERCEL_URL)) {
    return url.replace(process.env.VERCEL_URL, '');
  }
  return url;
}

// Published posts tagged `#project-<slug>`, newest first
export const fetchProjectLog = cache(async (slug: string) => {
  // slug ends up in an NQL filter, so only allow slug characters
  if (!/^[a-z0-9-]+$/.test(slug)) return [];

  const posts = await api.posts.browse({
    limit: 'all',
    include: 'tags',
    filter: `tag:${PROJECT_LINK_TAG_PREFIX}${slug}+status:published`,
    order: 'published_at DESC'
  });

  return posts
    .filter((post) => post.tags.some((tag) => tag.name === '#post'))
    .sort((a, b) => Date.parse(b.published_at) - Date.parse(a.published_at))
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      publishedAt: post.published_at,
      url: toSitePath(post.canonical_url ?? post.url)
    }));
});

// Returns null only when the project genuinely doesn't exist; throws if Ghost is unreachable
export const fetchProject = cache(async (slug: string) => {
  const project = await readPost(slug);
  if (!project || !project.tags.some((tag) => tag.name === '#project')) return null;

  return {
    title: project.title,
    excerpt: project.excerpt,
    html: project.html,
    featureImage: project.feature_image,
    publishedAt: project.published_at,
    updatedAt: project.updated_at
  };
});

export const fetchWithID = cache(async (id: string) => {
  // ids are Ghost uuids; anything else can't match and shouldn't reach the NQL filter
  if (!/^[0-9a-f-]+$/i.test(id)) return null;

  const posts = await api.posts.browse({
    formats: ['html'],
    include: 'tags',
    filter: `uuid:${id}`
  });
  const post = posts[0];
  if (!post) return null;

  return {
    title: post.title,
    excerpt: post.excerpt,
    html: post.html,
    inline: post.tags.some((tag) => tag.name === '#inline'),
    featureImage: post.feature_image
  };
});
