import { fetchProjects } from 'generation/posts';
import Image from 'next/image';
import Link from 'next/link';
import styles from 'styles/Projects.module.scss';

export const metadata = {
  title: 'Projects • Shivam Sh',
  description: 'A list of some of my projects • Shivam Sh',
  openGraph: {
    siteName: 'Shivam Sh',
    title: 'Projects • Shivam Sh',
    description: 'A list of some of my projects • Shivam Sh',
    url: (process.env.SITE_URL ?? process.env.VERCEL_URL) + '/projects',
  },
};

export default async function Page() {
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
