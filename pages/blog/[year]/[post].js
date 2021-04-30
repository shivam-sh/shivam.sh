import fs from 'fs';
import matter from 'gray-matter';
import marked from 'marked'
import { join } from 'path';
import BlogPost from '../../../components/layouts/blogPost';

const Post = ({ post }) => {
  const markdown = JSON.parse(post);
  return <BlogPost meta={markdown.data} htmlString={marked(markdown.content)} />
};

export const getStaticPaths = async () => {
  const filePath = join('ssg', 'posts');
  const years = fs.readdirSync(filePath);
  const posts = [];

  years.forEach((year) => {
    const files = fs.readdirSync(join(filePath, year));
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

export const getStaticProps = async ({ params: { post, year } }) => {
  const rawMarkdown = fs
    .readFileSync(join('ssg', 'posts', year, post + '.md'))
    .toString();
  const markdown = matter(rawMarkdown);

  return {
    props: {
      post: JSON.stringify(markdown),
    },
  };
};

export default Post;
