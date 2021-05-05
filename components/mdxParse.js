import fs from 'fs';
import matter from 'gray-matter';
import renderToString from 'next-mdx-remote/render-to-string';
import highlight from 'remark-highlight.js';

const Parse = async (filename) => {
  const source = fs
    .readFileSync(filename)
    .toString();

  const { content, data } = matter(source);
  const mdxSource = await renderToString(content, {
    mdxOptions: {
      remarkPlugins: [highlight],
    },
  });

  return { source: mdxSource, frontMatter: JSON.stringify(data) };
};
export default Parse;