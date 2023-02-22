'use client';

import matter from 'gray-matter';
import remarkBehead from 'remark-behead';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import styles from 'styles/Post.module.scss';
import { unified } from 'unified';

export default async function Page({ params }) {
  const source = await generatePageSource(params);
  return (
    <div
      className={styles.postContent}
      dangerouslySetInnerHTML={{ __html: source }}
    />
  );
}

async function generatePageSource({ year, blogPost }) {
  const post = await fetch(
    `${process.env.CDN_URL}/blog/${year}/${blogPost}/post.md`,
    { next: { revalidate: 3600 } }
  ).then((res) => res.text());
  const { content } = matter(post);

  const markdown = await unified()
    .use(remarkParse)
    .use(remarkBehead, { minDepth: 3 })
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  return String(markdown);
}
