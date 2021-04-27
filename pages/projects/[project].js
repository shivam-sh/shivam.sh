import Head from 'next/head';
import Header from '../../components/header/header';

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
  const files = fs.readdirSync('ssg/projects');
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
  const rawMarkdown = fs.readFileSync(
    path.join('ssg', 'projects', project + '.md'),
    'utf8'
  );
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
