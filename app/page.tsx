'use client';

import styles from 'styles/Home.module.scss';
import { useState, useEffect } from 'react';

export default function Home() {
  const size = useWindowSize();

  return (
    <div className={styles.intro}>
      <h2 className={styles.title}>
        Hey There<span className="accent">,</span> <br />
        I'm Shivam
      </h2>

      <q className={styles.description}>
        I’m a Systems Design Engineering {optionalBreakpoint(() => (size.width > 500 || size.width === undefined))}
        student at the University of Waterloo {optionalBreakpoint(() => (size.width > 500 || size.width === undefined))}
        I like exploring a variety of technologies {optionalBreakpoint(() => (size.width > 500 || size.width === undefined))}
        and sometimes I post about them here
      </q>
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
    width: undefined,
    height: undefined,
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
