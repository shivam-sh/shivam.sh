import Navbar from 'components/Navbar';
import Head from "next/head";
import styles from "../styles/Home.module.scss";

const Home = ({ }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Shivam Sh</title>
        <meta name="description" content="Shivam Sharma's personal site" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
      </Head>

      <Navbar/>

      <div className={styles.content}>
        <div className={styles.intro}>
          <h1 className={styles.title}>
            Hey There<span className="accent">,</span> <br />
            I'm Shivam
          </h1>

          <q className={styles.description}>
            I’m a Systems Design Engineering <br/>
            student at the University of Waterloo <br />
            I like working on a variety of projects <br />
            and sometimes I post about them here
          </q>
        </div>
      </div>
    </div>
  );
}

export default Home;
