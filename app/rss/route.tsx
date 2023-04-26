import { Feed } from 'feed';
import { fetchPost, fetchPosts, parseMarkdown } from 'app/custom/posts';

export async function GET(request: Request) {
  const site_url = process.env.SITE_URL || process.env.VERCEL_URL;
  const postsData = await fetchPosts();
  const rssData = postsData
    .filter((post) => post.showInRSSFeed === true)
    .slice(0, 10);

  const feedOptions = {
    title: 'Shivam Sh',
    id: site_url ?? '',
    link: site_url,
    image: `${site_url}/logo.png`,
    favicon: `${site_url}/favicon.png`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Shivam Sh`,
    generator: 'Feed for Node.js',
    feedLinks: {
      rss2: `${site_url}rss`,
    },
  };

  const feed = new Feed(feedOptions);

  await Promise.allSettled(
    rssData.map(async (postData) => {
      const postIdentifier = postData.path.split('/').pop();
      const postYear = new Date(postData.date).getFullYear();
      const { data, content } = await fetchPost(postYear, postIdentifier);
      const markdown = await parseMarkdown(content);

      feed.addItem({
        title: data.title,
        description: data.description,
        date: new Date(postData.date),
        link: `${site_url}/${postData.path}`,
        content: String(markdown),
      });
    })
  );

  return new Response(feed.rss2(), {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml',
    },
  });
}
