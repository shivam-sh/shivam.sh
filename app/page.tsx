import Description from './description';
// import dynamic from 'next/dynamic';
import styles from 'styles/Home.module.scss';
import { Canvas } from '@react-three/fiber';
import Blob from './blob/blob';

// const Blob = dynamic(() => import('./blob/blob'), { ssr: false });
// const Canvas = dynamic(
//   () => import('@react-three/fiber').then((fiber) => fiber.Canvas),
//   { ssr: false }
// );

export default function Page() {
  return (
    <div className={styles.intro}>
      <h2 className={styles.title}>
        Hey There<span className="accent">,</span> <br />
        I'm Shivam
      </h2>

      <Description className={styles.className} />

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
