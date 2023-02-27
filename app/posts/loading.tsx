import styles from 'styles/Posts.module.scss';
import Link from 'next/link';

export default async function Loading() {
  return <LoadingBars />;
}

function LoadingBars() {
  return (
    <div className={styles.loadingPosts}>
      <span className={styles.inline}>
        <h3>Posts</h3>
        <p className={`caption ${styles.rssLink}`}>
          <Link href="/rss">RSS</Link>
        </p>
      </span>

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
