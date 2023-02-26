import Blob from './blob';
import Canvas from './canvas';
import Description from './description';
import styles from 'styles/Home.module.scss';

export default function Page() {
  return (
    <div className={styles.intro}>
      <h2 className={styles.title}>
        Hey There<span className="accent">,</span> <br />
        I'm Shivam
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
