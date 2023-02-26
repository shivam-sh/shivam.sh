import { Feed } from 'feed';
import fs from 'fs';
import matter from 'gray-matter';
import { parseMarkdown } from './posts';

export default async function generateRssFeed(postsData) {
  const site_url = process.env.SITE_URL || process.env.VERCEL_URL;

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
    postsData.map(async (post) => {
      const postContent = await fetch(
        `${process.env.CDN_URL}/blog${post.url}/post.md`
      ).then((res) => res.text());

      const { content } = matter(postContent);

      const markdown = await parseMarkdown(content);

      feed.addItem({
        title: post.title,
        date: post.date,
        description: post.description,
        link: `${site_url}${post.url}`,
        content: String(markdown),
      });
    })
  );

  fs.writeFileSync('./public/rss.xml', feed.rss2());
}
