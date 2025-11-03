import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: '#0274BE',
          light: '#0170B9',
          accent: '#1da0f8',
          50: '#E6F3FC',
          100: '#CCE7F9',
          200: '#99CFF3',
          300: '#66B7ED',
          400: '#339FE7',
          500: '#0274BE',
          600: '#025D98',
          700: '#014672',
          800: '#012E4C',
          900: '#001726',
        },
        // Colores vibrantes para niños
        fun: {
          yellow: '#FFD93D',
          orange: '#FF8C42',
          pink: '#FF6BCB',
          purple: '#9D4EDD',
          green: '#06D6A0',
          red: '#EF476F',
        },
        dark: {
          DEFAULT: '#3a3a3a',
          light: '#4b4f58',
          medium: '#424242',
        },
        gray: {
          light: '#f5f5f5',
          border: '#e5e5e5',
        },
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      fontFamily: {
        'fun': ['Comic Sans MS', 'Chalkboard SE', 'Comic Neue', 'cursive'],
      },
    },
  },
  plugins: [],
};
export default config;
