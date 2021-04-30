import Head from 'next/head';
import Link from 'next/link';

import Header from '../../components/header';
import styles from '../../styles/Blog.module.scss';

import { format } from 'date-fns';
import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';

const Blog = ({ metadata }) => {
  return (
    <>
      <Head>
        <title>Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="text-content">
        <h2>Blog</h2>

        {JSON.parse(metadata).map((meta) => {
          const date = new Date(meta.date);

          return (
            <Link href={meta.url} key={meta.title}>
              <div className={styles.postPreview}>
                <div className={styles.title}>
                  <h4 className="accent">// </h4>
                  <h4>{meta.title}</h4>
                </div>

                <div className={styles.description}>
                  <caption>{meta.description}</caption>

                  <div className={styles.postInfo}>
                    <caption>[{format(date, 'dd-MM-yyyy')}]</caption>
                    <caption>{meta.tags}</caption>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  const filePath = join('ssg', 'posts');
  const years = fs
    .readdirSync(filePath)
    .filter((file) => fs.statSync(join(filePath, file)).isDirectory());
  const postFiles = [];

  years.forEach((year) => {
    const files = fs.readdirSync(join(filePath, year));
    postFiles.push(...files.map((file) => join(year, file)));
  });

  const metadata = postFiles.map((file) => {
    const meta = matter(fs
      .readFileSync(join(filePath, file))
      .toString())
      .data

    meta.url = 'blog/' + file.replace('.md', "")
    return meta
  })

  return {
    props: {
      metadata: JSON.stringify(metadata),
    },
  };
};

export default Blog;
