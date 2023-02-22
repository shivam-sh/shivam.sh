'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export const colors = {
  accent: [
    '#40a3ff',
    '#fe523c',
    '#fc80ff',
    '#21debb',
    '#8746f0',
    '#f5c116',
    '#f5241d',
  ],
};

export const ColorContext = createContext({
  color: '',
  setColor: (color: string) => {},
});

export const ColorPicker = ({ children }) => {
  const [windowExists, setWindowExists] = useState(false);

  const preferLightMode = windowExists
    ? window.matchMedia('(prefers-color-scheme: light)').matches
    : false;

  const defaultAccent = preferLightMode ? '#fe523c' : '#f5c116';
  const [accentColor, setAccentColor] = useState(defaultAccent);

  useEffect(() => {
    setWindowExists(true);
    const storedColor = window.localStorage.getItem('accentColor');
    if (storedColor) {
      setAccentColor(storedColor);
    }

    return () => setWindowExists(false);
  }, []);

  const updateAccentColor = (color) => {
    setAccentColor(color);
    if (windowExists) {
      window.localStorage.setItem('accentColor', color);
      document.documentElement.style.setProperty('--accent', color);
    }
  };

  return (
    <ColorContext.Provider
      value={{ color: accentColor, setColor: updateAccentColor }}
    >
      {children}
      <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              try {
                const lightModeQuery = window.matchMedia('(prefers-color-scheme: light)');

                lightModeQuery.addEventListener('change', (e) => {
                  if (e.matches === true) {
                    document.documentElement.classList.remove('darkTheme');
                    document.documentElement.classList.add('lightTheme');
                  } else {
                    document.documentElement.classList.remove('lightTheme');
                    document.documentElement.classList.add('darkTheme');
                  }
                });

                if (lightModeQuery.matches === true) {
                  document.documentElement.classList.add('lightTheme');
                } else {
                  document.documentElement.classList.add('darkTheme');
                }

                const localAccentColor = localStorage.getItem('accentColor');
                if (localAccentColor) {
                  document.documentElement.style.setProperty('--accent', localAccentColor);
                }
              }
              catch (e) {}
            })();
            `
          }}
        />
    </ColorContext.Provider>
  );
};
