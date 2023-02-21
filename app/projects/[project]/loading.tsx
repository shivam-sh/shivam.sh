import styles from 'styles/Post.module.scss';

export default async function Loading() {
  return <LoadingBars />;
}

function LoadingBars() {
  return (
    <div className={styles.loadingPostContent}>
      <div className={`loadingBars ${styles.loadingBars}`}>
        <div className={`loadingBar ${styles.loadingBar}`} />
        <div className={`spacer ${styles.spacer}`} />
        <div className={`loadingBar ${styles.loadingBar}`} />
        <div className={`spacer ${styles.spacer}`} />
        <div className={`loadingBar ${styles.loadingBar}`} />
        <div className={`loadingBar ${styles.loadingBar}`} />
        <div className={`loadingBar ${styles.loadingBar}`} />
        <div className={`loadingBar ${styles.loadingBar}`} />
        <div className={`loadingBar ${styles.loadingBar}`} />
        <div className={`spacer ${styles.spacer}`} />
        <div className={`loadingBar ${styles.loadingBar}`} />
        <div className={`loadingBar ${styles.loadingBar}`} />
        <div className={`loadingBar ${styles.loadingBar}`} />
        <div className={`loadingBar ${styles.loadingBar}`} />
        <div className={`loadingBar ${styles.loadingBar}`} />
        <div className={`spacer ${styles.spacer}`} />
        <div className={`loadingBar ${styles.loadingBar}`} />
        <div className={`loadingBar ${styles.loadingBar}`} />
        <div className={`loadingBar ${styles.loadingBar}`} />
        <div className={`loadingBar ${styles.loadingBar}`} />
        <div className={`loadingBar ${styles.loadingBar}`} />
        <div className={`spacer ${styles.spacer}`} />
        <div className={`loadingBar ${styles.loadingBar}`} />
        <div className={`loadingBar ${styles.loadingBar}`} />
        <div className={`loadingBar ${styles.loadingBar}`} />
        <div className={`loadingBar ${styles.loadingBar}`} />
        <div className={`loadingBar ${styles.loadingBar}`} />
      </div>
    </div>
  );
}
