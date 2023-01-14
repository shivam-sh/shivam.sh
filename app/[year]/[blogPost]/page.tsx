import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import remarkBehead from 'remark-behead';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import styles from '../../../styles/BlogPost.module.scss';
import { unified } from 'unified';

const Post = async ({ params }) => {
  const source = await generatePageSource(params);

  return (
    <div
      className={styles.postContent}
      dangerouslySetInnerHTML={{ __html: source }}
    />
  );
};
export default Post;

export const generateStaticParams = async () => {
  const postsDir = join('ssg', 'blog');
  const years = fs.readdirSync(postsDir);

  const posts = [];

  years.forEach((year) => {
    const files = fs.readdirSync(join(postsDir, year));
    posts.push(
      ...files.map((file) => ({
        name: file.replace('.md', ''),
        year: year,
      }))
    );
  });

  return posts.map((file) => ({
    year: file.year,
    blogPost: file.name,
  }));
};

const generatePageSource = async ({ year, blogPost }) => {
  const fileContent = fs.readFileSync(
    join('ssg', 'blog', `${year}`, `${blogPost}.md`)
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
};
