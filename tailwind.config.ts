import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        petrol: { DEFAULT: '#275161', deep: '#1A3A46', soft: '#3A6775' },
        sage:   { DEFAULT: '#5F7779', soft: '#7E9294', warm: '#4B6365' },
        cream:  { DEFAULT: '#F5F1EA', soft: '#FAF7F2', warm: '#ECE6DB' },
        copper: { DEFAULT: '#B47548', soft: '#C89A7A', deep: '#8F5A3B' },
        ink:    '#142024',
        muted:  '#6B7280',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans:  ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
