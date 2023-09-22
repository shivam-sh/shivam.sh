import { format } from 'date-fns';
import GhostAdminAPI from '@tryghost/admin-api';

`use server`;

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
          title: post.title,
          excerpt: post.excerpt,
          date: format(new Date(post.published_at), 'dd-MM-yyyy'),
          inline: inline,
          html: inline ? post.html : null,
          url: post.canonical_url != null ? post.canonical_url : post.url,
          externalLink: post.canonical_url != null
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
          date: format(new Date(post.published_at), 'dd-MM-yyyy'),
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
          title: project.title,
          excerpt: project.excerpt,
          url: project.canonical_url != null ? project.canonical_url : project.url,
          featureImage: project.feature_image
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

export async function fetchPost(slug: string) {
  return await api.posts
    .read({ slug, formats: ['html'], include: 'tags' })
    .then((post) => {
      if (!post.tags.some((tag) => tag.name === '#post')) {
        throw new Error('Not found');
      }
      return post;
    })
    .then((post) => {
      return {
        title: post.title,
        excerpt: post.excerpt,
        html: post.html,
        inline: post.tags.some((tag) => tag.name === '#inline'),
        featureImage: post.feature_image
      };
    })
    .catch(() => {
      return '';
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
    .then((project) => {
      return {
        title: project.title,
        excerpt: project.excerpt,
        html: project.html,
        featureImage: project.feature_image
      };
    })
    .catch(() => {
      return '';
    });
}

export async function fetchWithID(id: string) {
  return await api.posts
    .browse({ formats: ['html'], filter: `uuid:${id}` })
    .then((post) => post[0])
    .then((post) => {
      return {
        title: post.title,
        excerpt: post.excerpt,
        html: post.html,
        featureImage: post.feature_image
      };
    })
    .catch(() => {
      return '';
    });
}
