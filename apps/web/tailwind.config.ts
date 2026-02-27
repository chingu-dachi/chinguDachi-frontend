import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

// Brand palette
const coral = {
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
};

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Palette
        coral,

        // Semantic tokens
        background: 'var(--background)',
        surface: 'var(--surface)',
        primary: {
          DEFAULT: coral[600],
          dark: coral[700],
          light: coral[400],
        },
        bubble: {
          mine: coral[600],
          partner: 'var(--surface)',
        },
        credit: colors.amber[400],
        success: colors.emerald[500],
        danger: colors.red[500],
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
      boxShadow: {
        'mobile-edge':
          '4px 0 8px rgba(0,0,0,0.05), -4px 0 8px rgba(0,0,0,0.05)',
      },
    },
  },
  plugins: [],
};

export default config;
