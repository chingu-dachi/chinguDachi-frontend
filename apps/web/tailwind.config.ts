import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        coral: {
          50: '#fff0f0',
          100: '#ffdede',
          200: '#ffc2c2',
          300: '#ff9999',
          400: '#ff6b6b',
          500: '#fc4b4b',
          600: '#fc2626',
          700: '#e31010',
          800: '#ba1010',
          900: '#9a1414',
          950: '#540404',
        },
        indigo: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        background: 'var(--background)',
        surface: 'var(--surface)',
        primary: {
          DEFAULT: '#ff6b6b', // Coral 400
          dark: '#fc4b4b',
          light: '#ff9999',
        },
        bubble: {
          mine: '#ff6b6b',
          partner: '#fafafa',
          partnerDark: '#27272a',
        },
        credit: '#F59E0B',
        success: '#10B981',
        danger: '#EF4444',
      },
      fontFamily: {
        sans: ['Pretendard', 'Noto Sans JP', 'sans-serif'],
      },
      fontSize: {
        h1: ['24px', { lineHeight: '32px', fontWeight: '700' }],
        h2: ['20px', { lineHeight: '28px', fontWeight: '700' }],
        body: ['16px', { lineHeight: '24px' }],
        caption: ['12px', { lineHeight: '16px' }],
      },
      maxWidth: {
        mobile: '430px',
      },
      spacing: {
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },
    },
  },
  plugins: [],
};

export default config;
