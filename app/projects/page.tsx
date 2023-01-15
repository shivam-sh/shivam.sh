import fs from 'fs';
import Image from 'next/image';
import { join } from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import styles from '../../styles/Projects.module.scss';

const Projects = async () => {
  const metadata = await getProjectsMetadata();

  return (
    <div className={styles.projects}>
      <h3>Projects</h3>

      {metadata.map((data) => {
        return (
          <Link href={data.url} key={data.title} legacyBehavior>
            <div className={styles.project}>
              <div className={styles.imageContainer}>
                <Image
                  src={'/assets' + data.url + '.png'}
                  alt={data.title}
                  fill
                  className={styles.image}
                />
              </div>

              <div className={styles.info}>
                <div className={styles.text}>
                  <h3 className={styles.title}>{data.title}</h3>
                  <q className={styles.description}>{data.description}</q>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Projects;

const getProjectsMetadata = async () => {
  const postsDir = join('ssg', 'projects');
  const postFiles = fs.readdirSync(postsDir);

  const metadata = [];

  postFiles.forEach((file) => {
    const contents = fs.readFileSync(join(postsDir, file).toString());
    const { data } = matter(contents);

    metadata.push({
      ...data,
      url: `/projects/${file
        .replace(/ssg/, '')
        .replace(/-auto/, '')
        .replace(/\.md$/, '')}`,
    });
  });

  return metadata;
};
