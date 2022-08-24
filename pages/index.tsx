import Navbar, { NavbarLink } from 'components/Navbar';
import Head from "next/head";
import styles from "../styles/Home.module.scss";

const Home = ({ }) => {
  return (
    <div className={'container'}>
      <Head>
        <title>Shivam Sh</title>
        <meta name="description" content="Shivam Sharma's personal site" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
      </Head>

      <Navbar currentPage={NavbarLink.Home} />

      <div className={'content'}>
        <div className={styles.intro}>
          <h2 className={styles.title}>
            Hey There<span className="accent">,</span> <br />
            I'm Shivam
          </h2>

          <q className={styles.description}>
            I’m a Systems Design Engineering <br/>
            student at the University of Waterloo <br />
            I like exploring a variety of technology <br />
            and sometimes I post about it here
          </q>
        </div>
      </div>
    </div>
  );
}

export default Home;
