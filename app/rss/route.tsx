import { Feed } from 'feed';
import { fetchRSSPosts } from 'app/lib/server/ghostData';

`use server`;

export async function GET() {
  const site_url = process.env.SITE_URL || process.env.VERCEL_URL;
  const postsData = await fetchRSSPosts();
  const rssData = postsData.slice(0, 10);

  const feedOptions = {
    title: 'Shivam Sh',
    id: site_url ?? '',
    link: site_url,
    image: `${site_url}/logo.png`,
    favicon: `${site_url}/favicon.png`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Shivam Sh`,
    generator: 'Feed for Node.js',
    feedLinks: {
      rss2: `${site_url}rss`
    }
  };

  const feed = new Feed(feedOptions);

  await Promise.allSettled(
    rssData.map(async (post) => {
      feed.addItem({
        title: post.title,
        description: post.excerpt,
        date: new Date(post.date),
        link: `${post.url}`,
        content: String(post.html)
      });
    })
  );

  return new Response(feed.rss2(), {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml'
    }
  });
}
