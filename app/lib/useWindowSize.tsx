'use client';

import { useState, useEffect } from 'react';

export default function useWindowSize({ defaultSize: { width, height } }) {
  const [windowSize, setWindowSize] = useState({
    width: width,
    height: height
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize;
}
