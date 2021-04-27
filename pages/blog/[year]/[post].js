import Head from 'next/head';
import Header from '../../../components/header/header';

import fs from 'fs';
import marked from 'marked';
import matter from 'gray-matter';
import path from 'path';

const Project = ({ data, content }) => {
  return (
    <>
      <Head>
        <title>{data.title}</title>
      </Head>

      <Header />

      <div dangerouslySetInnerHTML={{ __html: content }} />
    </>
  );
};

export const getStaticPaths = async () => {
  const years = fs.readdirSync('ssg/posts');
  const posts = [];

  years.forEach((year) => {
    const files = fs.readdirSync('ssg/posts/' + year);
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
    .readFileSync(path.join('ssg', 'posts', year, post + '.md'))
    .toString();

  const parsedMarkdown = matter(rawMarkdown);
  const html = marked(parsedMarkdown.content);

  return {
    props: {
      data: parsedMarkdown.data,
      content: html,
    },
  };
};

export default Project;
