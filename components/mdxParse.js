import fs from 'fs';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import highlight from 'remark-highlight.js';

const Parse = async (filename) => {
  const source = fs
    .readFileSync(filename)
    .toString();

  const { content, data } = matter(source);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [highlight],
    },
  });

  return { source: mdxSource, frontMatter: JSON.stringify(data) };
};
export default Parse;