import BlogPost from '../../../components/layouts/blogPost';

import fs from 'fs';
import { join } from 'path';

import matter from 'gray-matter';
import hydrate from "next-mdx-remote/hydrate";
import renderToString from "next-mdx-remote/render-to-string";
import highlight from 'remark-highlight.js';


const Post = ({ source, frontMatter }) => {
  const data = JSON.parse(frontMatter)
  const content = hydrate(source)

  return <BlogPost meta={data} content={content} />
};

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
  const source = fs
    .readFileSync(join('ssg', 'posts', year, post + '.mdx'))
    .toString();

  const { content, data } = matter(source)
  const mdxSource = await renderToString(content, {
    mdxOptions: {
      remarkPlugins: [highlight],
    }
  })

  return { props: { source: mdxSource, frontMatter: JSON.stringify(data) } }
};

export default Post;
