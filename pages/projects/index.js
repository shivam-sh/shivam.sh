import Head from 'next/head';
import Header from '../../components/header';
import Link from 'next/link';
import styles from '../../styles/Projects.module.scss';

import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';

const Projects = ({ metadata }) => {
  return (
    <>
      <Head>
        <title>Projects</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className={styles.projects}>
        <h2>Projects</h2>

        {JSON.parse(metadata).map((meta) => (
          <Link href={meta.url} key={meta.title}>
            <a>
              <div className={styles.projectPreview}>
                <div className={styles.graphic}>
                  <img className={styles.accent} src={meta.url + '/accent.png'} />
                  <img className={styles.preview} src={meta.url + '/preview.png'} />
                </div>
                <div className={styles.description}>
                  <h2>{meta.title}</h2>
                  <p>{meta.description}</p>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  const filePath = join('ssg', 'projects');
  const files = fs.readdirSync(filePath);
  const metadata = files.map((file) => {
    const meta = matter(fs
      .readFileSync(join(filePath, file))
      .toString()).data

    meta.url = 'projects/' + file.replace('.mdx', '')

    return meta;
  });

  return {
    props: {
      metadata: JSON.stringify(metadata),
    },
  };
};

export default Projects;
