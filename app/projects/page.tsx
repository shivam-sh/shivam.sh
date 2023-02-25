import { fetchProjects } from 'generation/posts';
import Image from 'next/image';
import Link from 'next/link';
import styles from 'styles/Projects.module.scss';

export default async function Projects() {
  const projects = await fetchProjects();

  return (
    <div className={styles.projects}>
      <h3>Projects</h3>

      {projects.map((project) => {
        return (
          <Link href={project.url} key={project.title}>
            <div className={styles.project}>
              <div className={styles.imageContainer}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className={styles.image}
                />
              </div>

              <div className={styles.info}>
                <div className={styles.text}>
                  <h4 className={styles.title}>{project.title}</h4>
                  <q className={styles.description}>{project.description}</q>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
