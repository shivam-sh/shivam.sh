import styles from './Home.module.scss';

export default function NotFound() {
  return (
    <>
      <h5 className={styles.title}>
        404 <span className="accent">|</span> Page Not Found
      </h5>
    </>
  );
}
