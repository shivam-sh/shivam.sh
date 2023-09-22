import styles from './Projects.module.scss';

export default async function Loading() {
  return <LoadingBars />;
}

function LoadingBars() {
  return (
    <div className={styles.loadingProjects}>
      <h3>Projects</h3>
      <div className={`loadingBars ${styles.loadingBars}`}>
        <div className={`loadingBar ${styles.loadingBar}`} />
        <div className={`loadingBar ${styles.loadingBar}`} />
        <div className={`loadingBar ${styles.loadingBar}`} />
        <div className={`loadingBar ${styles.loadingBar}`} />
        <div className={`loadingBar ${styles.loadingBar}`} />
        <div className={`loadingBar ${styles.loadingBar}`} />
      </div>
    </div>
  );
}
