import Head from 'next/head';

import Prompt from '../components/prompt';
import Header from '../components/header';
import styles from '../styles/Home.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Shivam Sh</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>
        <div className={styles.welcome}>
          <h1 className={styles.title}>404</h1>

          <p className={styles.description}>Page not found</p>
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
}
