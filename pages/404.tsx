import Navbar, { NavbarLink } from 'app/Navbar';
import Head from "next/head";
import styles from "../styles/404.module.scss";

const Home = ({ }) => {
  return (
    <div className={'container'}>
      <Head>
        <title>Shivam Sh</title>
        <meta name="description" content="Page not found" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
      </Head>

      <Navbar />

      <div className={'content'}>
        <div className={styles.intro}>
          <h2 className={styles.title}>
            404
          </h2>

          <q className={styles.description}>
            Page not found
          </q>
        </div>
      </div>
    </div>
  );
}

export default Home;
