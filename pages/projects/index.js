import Head from 'next/head';
import Header from '../../components/header/header';

import styles from '../../styles/Projects.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Projects</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <h2>Projects</h2>
    </div>
  );
}
