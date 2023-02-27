'use client';

import { createContext, useEffect, useState } from 'react';

export const accentColors = {
  dark: [
    '#dfc58d',
    '#777777',
    '#40a3ff',
    '#fe523c',
    '#fc80ff',
    '#21debb',
    '#8746f0',
    '#f5c116',
    '#f5241d',
  ],
  light: [
    '#ddae49',
    '#AAAAAA',
    '#40a3ff',
    '#fe523c',
    '#fc80ff',
    '#21debb',
    '#8746f0',
    '#f5c116',
    '#f5241d',
  ],
};

export const ColorSchemeContext = createContext({
  incrementAccent: () => {},
});

export const ColorSchemeController = ({ children }) => {
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
        const nextColor =
          accentColors.light[index + 1] || accentColors.light[0];

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
    <ColorSchemeContext.Provider
      value={{ incrementAccent: incrementAccentColor }}
    >
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
            `,
        }}
      />
    </ColorSchemeContext.Provider>
  );
};
