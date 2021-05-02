import BlogPost from '../../components/layouts/blogPost';

import fs from 'fs';
import { join } from 'path';

import matter from 'gray-matter';
import hydrate from "next-mdx-remote/hydrate";
import renderToString from "next-mdx-remote/render-to-string";

const Project = ({ source, frontMatter }) => {
  const data = JSON.parse(frontMatter)
  const content = hydrate(source)

  return (
    <>
      <BlogPost meta={data} content={content} />
    </>
  )
};

export const getStaticPaths = async () => {
  const files = fs.readdirSync(join('ssg', 'projects'));
  const paths = files.map((filename) => ({
    params: {
      project: filename.replace('.mdx', ''),
    },
  }));

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { project } }) => {
  const source = fs
    .readFileSync(join('ssg', 'projects', project + '.mdx'))
    .toString();

  const { content, data } = matter(source)
  const mdxSource = await renderToString(content, {/* components, scope: data */ })

  return { props: { source: mdxSource, frontMatter: JSON.stringify(data) } }
};

export default Project;
