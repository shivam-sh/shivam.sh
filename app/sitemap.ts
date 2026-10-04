import { fetchPosts, fetchProjects } from 'app/lib/server/ghostData';
import { siteURL } from 'app/lib/siteURL';
import { MetadataRoute } from 'next';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteURL();
  const [posts, projects] = await Promise.all([fetchPosts(), fetchProjects()]);

  // Entries with a canonical URL live elsewhere (or duplicate a post), so leave them out
  const postEntries = posts
    .filter((post) => !post.externalLink)
    .map((post) => ({
      url: `${base}/posts/${post.slug}`,
      lastModified: new Date(post.updatedAt)
    }));
  const projectEntries = projects
    .filter((project) => !project.externalLink)
    .map((project) => ({
      url: `${base}/projects/${project.slug}`,
      lastModified: new Date(project.updatedAt)
    }));

  const latest = (entries: { lastModified: Date }[]) =>
    entries.length > 0
      ? new Date(Math.max(...entries.map((entry) => entry.lastModified.getTime())))
      : undefined;

  return [
    { url: base, lastModified: latest([...postEntries, ...projectEntries]) },
    { url: `${base}/posts`, lastModified: latest(postEntries) },
    { url: `${base}/projects`, lastModified: latest(projectEntries) },
    { url: `${base}/about` },
    ...postEntries,
    ...projectEntries
  ];
}
