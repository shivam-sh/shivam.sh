import Image from 'next/image';
import Link from 'next/link';
import styles from 'styles/Projects.module.scss';

export default async function Projects() {
  const metadata = await getProjectsMetadata();

  return (
    <div className={styles.projects}>
      <h3>Projects</h3>

      {metadata.map((data) => {
        return (
          <Link href={data.url} key={data.title}>
            <div className={styles.project}>
              <div className={styles.imageContainer}>
                <Image
                  src={data.image}
                  alt={data.title}
                  fill
                  className={styles.image}
                />
              </div>

              <div className={styles.info}>
                <div className={styles.text}>
                  <h4 className={styles.title}>{data.title}</h4>
                  <q className={styles.description}>{data.description}</q>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

async function getProjectsMetadata() {
  const metadata = await fetch(`${process.env.CDN_URL}/projects.json`, {
    next: { revalidate: 3600 },
  })
    .then((res) => res.json())
    .then((data) => data.projects);

  return metadata;
}
