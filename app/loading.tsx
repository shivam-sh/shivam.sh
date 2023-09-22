import Description from 'app/components/description';
import styles from './Home.module.scss';

export default function Page() {
  return (
    <div className={styles.intro}>
      <h2 className={styles.title}>
        This is <br />
        <span className="accent-gradient">Spectre</span>
      </h2>

      <Description className={styles.description} />
    </div>
  );
}
