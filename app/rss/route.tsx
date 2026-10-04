import { Feed } from 'feed';
import { fetchRSSPosts } from 'app/lib/server/ghostData';
import { siteURL } from 'app/lib/siteURL';

// Without this the feed is prerendered once at build and never refreshed
export const revalidate = 3600;

export async function GET() {
  const site_url = siteURL();
  const posts = await fetchRSSPosts();

  const feed = new Feed({
    title: 'Shivam Sh',
    description: 'Posts by Shivam Sh about the things I build and explore',
    id: `${site_url}/`,
    link: `${site_url}/`,
    language: 'en',
    image: `${site_url}/logo.png`,
    favicon: `${site_url}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Shivam Sh`,
    updated: posts[0]?.date,
    generator: 'Feed for Node.js',
    feedLinks: {
      rss2: `${site_url}/rss`
    }
  });

  for (const post of posts) {
    const link = post.externalURL ?? `${site_url}/posts/${post.slug}`;
    feed.addItem({
      title: post.title,
      id: link,
      link,
      description: post.excerpt,
      date: post.date,
      content: String(post.html)
    });
  }

  return new Response(feed.rss2(), {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml'
    }
  });
}
