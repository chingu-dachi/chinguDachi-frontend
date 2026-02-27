import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6',
          dark: '#2563EB',
          light: '#93C5FD',
        },
        bubble: {
          mine: '#3B82F6',
          partner: '#F3F4F6',
        },
        credit: '#F59E0B',
        success: '#22C55E',
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
