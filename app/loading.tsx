import Description from 'app/components/description';
import styles from './Home.module.scss';

export default function Page() {
  return (
    <div className={styles.intro}>
      <h2 className={styles.title}>
        Hey There<span className="accent-gradient">,</span> <br />
        I&apos;m Shivam
      </h2>

      <Description className={styles.description} />
    </div>
  );
}
