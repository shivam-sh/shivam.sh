import styles from 'styles/Home.module.scss';

export default function NotFound() {
  return (
    <>
      <h4 className={styles.title}>
        404 <span className="accent">|</span> Page not found
      </h4>
    </>
  );
}
