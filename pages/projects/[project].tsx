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
import styles from '../../styles/Project.module.scss';
import { unified } from 'unified';

const Project = ({ source, frontMatter }) => {
  const data = JSON.parse(frontMatter);

  return (
    <div className={'container'}>
      <Navbar currentPage={NavbarLink.Projects} />
      <div className={'content'}>
        <div
          className={styles.postContent}
          dangerouslySetInnerHTML={{ __html: source }}
        />
      </div>
    </div>
  );
};
export default Project;

export const getStaticPaths: GetStaticPaths = async () => {
    const postsDir = join('ssg', 'projects');
    const projects = fs.readdirSync(postsDir);
  
    const posts = [];
  
    projects.forEach((file) => {
      if (file.endsWith('-auto.md')) {
        posts.push(file);
      };
    });
  
    const paths = posts.map((file) => ({
      params: {
        project: file.replace(/-auto/, '').replace(/\.md$/, ''),
      },
    }));
  
    return {
      paths: paths,
      fallback: false,
    };
  };
  
  export const getStaticProps: GetStaticProps = async ({ params: { project } }) => {
    const fileContent = fs.readFileSync(
      join('ssg', 'projects', `${project}-auto.md`)
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