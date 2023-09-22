'use client';

import { createContext, useEffect, useState } from 'react';

export const accentColors = {
  dark: ['#a0c0c0', '#40a3ff', '#fe523c', '#fc80ff', '#21debb', '#8746f0', '#f5c116', '#f5241d'],
  light: ['#5c8888', '#40a3ff', '#fe523c', '#fc80ff', '#21debb', '#8746f0', '#f5c116', '#f5241d']
};

export const AppContext = createContext({
  incrementAccent: () => {}
});

export const AppContextController = ({ children }) => {
  const [windowExists, setWindowExists] = useState(false);

  useEffect(() => {
    setWindowExists(true);

    const lightAccent = window.localStorage.getItem('lightAccent');
    const darkAccent = window.localStorage.getItem('darkAccent');

    if (lightAccent) {
      document.documentElement.style.setProperty('--accent', lightAccent);
    } else if (darkAccent) {
      document.documentElement.style.setProperty('--accent', darkAccent);
    }

    const debounce = (fn) => {
      let frame;

      return (...params) => {
        if (frame) {
          cancelAnimationFrame(frame);
        }

        frame = requestAnimationFrame(() => {
          fn(...params);
        });
      };
    };

    const storeScroll = () => {
      document.documentElement.dataset.scroll = window.scrollY > 20 ? 'true' : 'false';
    };

    document.addEventListener('scroll', debounce(storeScroll), { passive: true });

    storeScroll();

    return () => setWindowExists(false);
  }, []);

  const incrementAccentColor = () => {
    if (windowExists) {
      const onThemeChange = (e) => {
        if (e.matches) {
          const lightAccent = window.localStorage.getItem('lightAccent');
          document.documentElement.style.setProperty(
            '--accent',
            lightAccent || accentColors.light[0]
          );
        } else {
          const darkAccent = window.localStorage.getItem('darkAccent');
          document.documentElement.style.setProperty(
            '--accent',
            darkAccent || accentColors.dark[0]
          );
        }
      };

      const lightModeQuery = window.matchMedia('(prefers-color-scheme: light)');
      lightModeQuery.addEventListener('change', onThemeChange);

      if (lightModeQuery.matches) {
        const lightAccent = window.localStorage.getItem('lightAccent') || accentColors.light[0];
        const index = accentColors.light.indexOf(lightAccent);
        const nextColor = accentColors.light[index + 1] || accentColors.light[0];

        window.localStorage.setItem('lightAccent', nextColor);
        document.documentElement.style.setProperty('--accent', nextColor);
      } else {
        const darkAccent = window.localStorage.getItem('darkAccent') || accentColors.dark[0];
        const index = accentColors.dark.indexOf(darkAccent);
        const nextColor = accentColors.dark[index + 1] || accentColors.dark[0];

        window.localStorage.setItem('darkAccent', nextColor);
        document.documentElement.style.setProperty('--accent', nextColor);
      }
    }
  };

  return (
    <AppContext.Provider value={{ incrementAccent: incrementAccentColor }}>
      {children}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                function updateTheme(lightMode) {
                  if (lightMode === true) {
                    document.documentElement.classList.remove('darkTheme');
                    document.documentElement.classList.add('lightTheme');
                  } else {
                    document.documentElement.classList.remove('lightTheme');
                    document.documentElement.classList.add('darkTheme');
                  }

                  const darkAccent = localStorage.getItem('darkAccent');
                  const lightAccent = localStorage.getItem('lightAccent');

                  if (lightMode === true && lightAccent) {
                    document.documentElement.style.setProperty('--accent', lightAccent);
                  } else if (darkAccent) {
                    document.documentElement.style.setProperty('--accent', darkAccent);
                  } 
                }

                const lightModeQuery = window.matchMedia('(prefers-color-scheme: light)');

                lightModeQuery.addEventListener('change', (e) => {
                  updateTheme(e.matches);
                });

                updateTheme(lightModeQuery.matches);
              }
              catch (e) {}
            })();
            `
        }}
      />
    </AppContext.Provider>
  );
};
