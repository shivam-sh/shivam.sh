import fs from 'fs';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { join } from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import Navbar, { NavbarLink } from 'components/Navbar';
import styles from '../../styles/Projects.module.scss';

const Projects = ({ metaString }) => {
  const metadata = JSON.parse(metaString);

  return (
    <div className={'container'}>
      <Navbar currentPage={NavbarLink.Projects} />

      <div className={'content'}>
        <div className={styles.projects}>
          <h3>Projects</h3>

          {metadata.map((data) => {
            return (
              <Link href={data.url} key={data.title}>
                <div className={styles.project}>
                  <div className={styles.imageContainer}>
                    <Image
                      src={'/assets' + data.url + '.png'}
                      alt={data.title}
                      layout="fill"
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
      </div>
    </div>
  );
};

export default Projects;

export const getStaticProps: GetStaticProps = async () => {
  const postsDir = join('ssg', 'projects');
  const postFiles = fs.readdirSync(postsDir);

  const metadata = [];

  postFiles.forEach((file) => {
    const contents = fs.readFileSync(join(postsDir, file).toString());
    const { data } = matter(contents);

    metadata.push({
      ...data,
      url: `/projects/${file.replace(/ssg/, '').replace(/-auto/, '').replace(/\.md$/, '')}`,
    });
  });

  return {
    props: {
      metaString: JSON.stringify(metadata),
    },
  };
};
