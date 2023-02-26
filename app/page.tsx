'use client';

import dynamic from 'next/dynamic';
import styles from 'styles/Home.module.scss';
import { useState, useEffect } from 'react';

const Blob = dynamic(() => import('./blob/blob'), { ssr: false });
const Canvas = dynamic(
  () => import('@react-three/fiber').then((fiber) => fiber.Canvas),
  { ssr: false }
);

export default function Page() {
  const size = useWindowSize();

  return (
    <div className={styles.intro}>
      <h2 className={styles.title}>
        Hey There<span className="accent">,</span> <br />
        I'm Shivam
      </h2>

      <q className={styles.description}>
        I’m a Systems Design Engineering{' '}
        {optionalBreakpoint(() => (size.width ?? 1000) > 500 || size.width === undefined)}
        {optionalBreakpoint(
          () => (size.width ?? 0) > 500 || size.width === undefined
        )}
        student at the University of Waterloo{' '}
        {optionalBreakpoint(() => (size.width ?? 1000) > 500 || size.width === undefined)}
        {optionalBreakpoint(
          () => (size.width ?? 0) > 500 || size.width === undefined
        )}
        I like exploring and creating with tech{' '}
        {optionalBreakpoint(() => (size.width ?? 1000) > 500 || size.width === undefined)}
        {optionalBreakpoint(
          () => (size.width ?? 0) > 500 || size.width === undefined
        )}
        and sometimes I post about it here
      </q>

      <Canvas
        id={styles.bg_canvas}
        camera={{ position: [0, 0, 4.0] }}
        style={{ position: 'fixed' }}
      >
        <Blob window={size} />
      </Canvas>
    </div>
  );
}

function optionalBreakpoint(expression: () => boolean) {
  if (expression()) {
    return <br />;
  }
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 1000,
    height: 1000,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize;
}
