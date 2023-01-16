import fs from "fs";
import { Feed } from "feed";
import { join } from "path";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { unified } from "unified";

export default async function generateRssFeed(postsData) {
  const site_url = process.env.SITE_URL || process.env.VERCEL_URL;

  let posts = [];

  await postsData.forEach(async (post) => {
    const fileContent = fs.readFileSync(join("ssg", "blog", `${post.url}.md`));

    if (post.showInTimeline === true) {
      const { content } = matter(fileContent);

      const markdown = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeHighlight)
        .use(rehypeStringify)
        .process(content);

      posts.push({
        title: post.title,
        date: post.date,
        description: post.description,
        url: `${site_url}${post.url}`,
        content: String(markdown),
      });
    }
  });

  const feedOptions = {
    title: "Shivam Sh",
    id: site_url,
    link: site_url,
    image: `${site_url}/logo.png`,
    favicon: `${site_url}/favicon.png`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Shivam Sh`,
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `${site_url}rss`,
    },
  };

  const feed = new Feed(feedOptions);

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${post.url}`,
      link: `${post.url}`,
      description: post.description,
      date: new Date(post.date),
      content: post.content,
    });
  });

  fs.writeFileSync("./public/rss", feed.rss2());
}
