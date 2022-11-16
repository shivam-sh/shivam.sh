import fs from 'fs';
import { GetStaticPaths, GetStaticProps } from 'next';
import { join } from 'path';
import matter from 'gray-matter';
import Navbar, { NavbarLink } from 'components/Navbar';
import remarkBehead from 'remark-behead';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import styles from '../../styles/BlogPost.module.scss';
import { unified } from 'unified';

const Post = ({ source, frontMatter }) => {
  const data = JSON.parse(frontMatter);

  return (
    <div className={'container'}>
      <Navbar currentPage={NavbarLink.Blog} />
      <div className={'content'}>
        <div
          className={styles.postContent}
          dangerouslySetInnerHTML={{ __html: source }}
        />
      </div>
    </div>
  );
};
export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
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

  const paths = posts.map((file) => ({
    params: {
      post: file.name,
      year: file.year,
    },
  }));

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params: { post, year } }) => {
  const fileContent = fs.readFileSync(
    join('ssg', 'blog', `${year}`, `${post}.md`)
  );
  const { content, data } = matter(fileContent);

  const markdown = await unified()
    .use(remarkParse)
    .use(remarkBehead, { minDepth: 3 })
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  return {
    props: { source: String(markdown), frontMatter: JSON.stringify(data) },
  };
};
