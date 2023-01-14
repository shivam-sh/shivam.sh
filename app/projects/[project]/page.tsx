import fs from 'fs';
import { join } from 'path';
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

export async function generateStaticParams() {
  const postsDir = join('ssg', 'projects');
  const projects = fs.readdirSync(postsDir);

  const posts = [];

  projects.forEach((file) => {
    if (file.endsWith('-auto.md')) {
      posts.push(file);
    }
  });

  return posts.map((file) => ({
    project: file.replace(/-auto/, '').replace(/\.md$/, ''),
  }));
}

async function generatePageSource({ project }) {
  const fileContent = fs.readFileSync(
    join('ssg', 'projects', `${project}-auto.md`)
  );
  const { content } = matter(fileContent);

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
