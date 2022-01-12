import BlogPost from '../../../components/layouts/blogPost';
import MDXParse from '../../../components/mdxParse'

import fs from 'fs';
import { MDXRemote } from 'next-mdx-remote';
import { join } from 'path';

const Post = ({ source, frontMatter }) => {
  const data = JSON.parse(frontMatter);

  return <BlogPost meta={data}>
    <MDXRemote {...source} />
  </BlogPost>;
};
export default Post;

export const getStaticPaths = async () => {
  const filePath = join('ssg', 'posts');
  const years = fs.readdirSync(filePath);
  const posts = [];

  years.forEach((year) => {
    const files = fs.readdirSync(join(filePath, year));
    posts.push(
      ...files.map((file) => ({
        name: file.replace('.mdx', ''),
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

export const getStaticProps = async ({ params: { post, year } }) => {
  return { props: await MDXParse(join('ssg', 'posts', year, post + '.mdx')) };
};