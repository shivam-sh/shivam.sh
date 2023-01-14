import styles from 'styles/Home.module.scss';

export default function Home() {
  return (
    <div className={styles.intro}>
      <h2 className={styles.title}>
        Hey There<span className="accent">,</span> <br />
        I'm Shivam
      </h2>

      <q className={styles.description}>
        I’m a Systems Design Engineering <br />
        student at the University of Waterloo <br />
        I like exploring a variety of technologies <br />
        and sometimes I post about them here
      </q>
    </div>
  );
}
