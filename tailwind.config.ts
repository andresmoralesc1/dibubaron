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
        // Colores ultra vibrantes optimizados para niños
        fun: {
          yellow: '#FFD93D',    // Amarillo brillante
          orange: '#FF9F1C',    // Naranja más saturado
          pink: '#FF006E',      // Rosa fucsia vibrante
          purple: '#C77DFF',    // Morado más claro y alegre
          green: '#06FFA5',     // Verde menta brillante
          red: '#EF476F',       // Rojo coral
          blue: '#4CC9F0',      // Azul cielo
          lime: '#CCFF00',      // Lima neón
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
        '4xl': '2.5rem',
      },
      fontFamily: {
        'fun': ['var(--font-fredoka)', 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', 'cursive'],
      },
      fontSize: {
        // Tamaños optimizados para niños (más grandes)
        'xs': ['0.875rem', { lineHeight: '1.5' }],      // 15.75px
        'sm': ['1rem', { lineHeight: '1.6' }],          // 18px
        'base': ['1.125rem', { lineHeight: '1.7' }],    // 20.25px
        'lg': ['1.25rem', { lineHeight: '1.7' }],       // 22.5px
        'xl': ['1.5rem', { lineHeight: '1.6' }],        // 27px
        '2xl': ['1.875rem', { lineHeight: '1.5' }],     // 33.75px
        '3xl': ['2.25rem', { lineHeight: '1.4' }],      // 40.5px
        '4xl': ['3rem', { lineHeight: '1.3' }],         // 54px
        '5xl': ['3.75rem', { lineHeight: '1.2' }],      // 67.5px
        '6xl': ['4.5rem', { lineHeight: '1.1' }],       // 81px
      },
      boxShadow: {
        'kid': '0 8px 0 rgba(0, 0, 0, 0.2)',
        'kid-hover': '0 4px 0 rgba(0, 0, 0, 0.2)',
        'kid-active': '0 2px 0 rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
};
export default config;
