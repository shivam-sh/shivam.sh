const colors = {
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


export function randomizeAccentColor() {
  document.documentElement.style.setProperty(
    '--accent',
    colors.accent[Math.floor(Math.random() * colors.accent.length)]
  );
}
