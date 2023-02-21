import matter from 'gray-matter';
import remarkBehead from 'remark-behead';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import styles from 'styles/Project.module.scss';
import { unified } from 'unified';

export default async function Project({ params }) {
  const source = await generatePageSource(params);

  return (
    <div
      className={styles.postContent}
      dangerouslySetInnerHTML={{ __html: source }}
    />
  );
}

async function generatePageSource({ project }) {
  const post = await fetch(
    `${process.env.CDN_URL}/projects/${project}/post.md`,
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
