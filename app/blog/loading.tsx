import styles from 'styles/Blog.module.scss';

export default async function Loading() {
  return <LoadingBars />;
}

function LoadingBars() {
  return (
    <div className={styles.loadingPosts}>
      <h3>Blog</h3>
      <div className={`loadingBars ${styles.loadingBars}`}>
        <div className={`loadingBar ${styles.loadingBar}`} />
        <div className={`loadingBar ${styles.loadingBar}`} />
        <div className={`loadingBar ${styles.loadingBar}`} />
        <div className={`loadingBar ${styles.loadingBar}`} />
        <div className={`loadingBar ${styles.loadingBar}`} />
      </div>
    </div>
  );
}
