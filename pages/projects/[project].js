import fs from 'fs';
import marked from 'marked'
import matter from 'gray-matter';
import { join } from 'path';
import BlogPost from '../../components/layouts/blogPost';

const Project = ({ project }) => {
  const markdown = JSON.parse(project);
  return <BlogPost meta={markdown.data} htmlString={marked(markdown.content)} />
};

export const getStaticPaths = async () => {
  const files = fs.readdirSync(join('ssg', 'projects'));
  const paths = files.map((filename) => ({
    params: {
      project: filename.replace('.md', ''),
    },
  }));

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { project } }) => {
  const rawMarkdown = fs
    .readFileSync(join('ssg', 'projects', project + '.md'))
    .toString();
  const markdown = matter(rawMarkdown)

  return {
    props: {
      project: JSON.stringify(markdown),
    },
  };
};

export default Project;
