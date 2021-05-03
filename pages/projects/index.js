import Head from 'next/head';
import Header from '../../components/header';
import Link from 'next/link';
import styles from '../../styles/Projects.module.scss';

import metadata from '../../ssg/projects';

const Projects = () => {
  return (
    <>
      <Head>
        <title>Projects</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className={styles.projects}>
        <h2>Projects</h2>

        {metadata.map((meta) => (
          <Link href={meta.url} key={meta.title}>
            <a>
              <div className={styles.projectPreview}>
                <div className={styles.graphic}>
                  <img
                    className={styles.accent}
                    src={meta.url + '/accent.png'}
                  />
                  <img
                    className={styles.preview}
                    src={meta.url + '/preview.png'}
                  />
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

export default Projects;
