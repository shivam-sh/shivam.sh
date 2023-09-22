import Blob from 'app/components/blob';
import Canvas from 'app/components/canvas';
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

      <Canvas
        id={styles.bg_canvas}
        camera={{ position: [0, 0, 4.0] }}
        style={{ position: 'fixed' }}
      >
        <Blob />
      </Canvas>
    </div>
  );
}
