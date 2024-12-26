/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Adjust this path based on your project structure
    // "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        bg: 'var(--bg)',
        bg_alt: 'var(--bg-alt)',
        text: 'var(--text)',
        text_alt: 'var(--text-alt)',
      },
      typography: {
        DEFAULT: {
          css: {
            blockquote: {
              quotes: "none",
            },
          },
        },
      },
    },
  },
  plugins: [],
}


