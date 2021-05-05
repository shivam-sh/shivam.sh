import Head from 'next/head';

import Header from '../components/header';
import Prompt from '../components/prompt';
import styles from '../styles/Home.module.scss';

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Shivam Sh</title>
        <link rel="shortcut icon" href="/favicon.png" type="image/png"/>
      </Head>

      <Header />

      <main className={styles.main}>
        <div className={styles.welcome}>
          <h1 className={styles.title}>
            Hey There<span className="accent">,</span>
            <br />
            I’m Shivam
          </h1>

          <caption className={styles.description}>
            <span className={styles.line}>
              I’m a Systems Design Engineering
            </span>
            <span className={styles.line}>
              student at the University of Waterloo
            </span>
            <span className={styles.line}>
              I like working on a variety of projects
            </span>
            <span className={styles.line}>
              and sometimes I post about them here
            </span>
          </caption>
        </div>
      </main>

      <div className={styles.typing}>
        <p>
          <span className={styles.bash}>{'> '}</span>
          <Prompt />
        </p>
      </div>
    </div>
  );
};

export default Home;
