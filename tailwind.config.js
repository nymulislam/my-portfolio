/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        xs: "380px",
      },
      fontFamily: {
        serif: ['"Fraunces"', 'Georgia', 'Cambria', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        paper: '#FBF9F5',
        paperDark: '#161514',
        paperCard: '#F5F1EA',
        paperCardDark: '#1E1C1A',
        paperBorder: '#E6E0D6',
        paperBorderDark: '#2C2825',
        ink: '#1C1917',
        inkDark: '#F5F5F4',
        inkMuted: '#78716C',
        inkMutedDark: '#A8A29E',
      },
    },
  },
  plugins: [],
}
