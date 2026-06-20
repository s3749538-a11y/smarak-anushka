import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand color — rose/pink
        pink: {
          50: '#FDF1F6',
          100: '#FCE3EE',
          200: '#FBC4DD',
          300: '#F892BF',
          400: '#F25B9C',
          500: '#DB2777',
          600: '#BE185D',
          700: '#9D174D',
          800: '#7A1240',
          900: '#5C0F32',
        },
        // Secondary contrast color — warm gold
        gold: {
          50: '#FBF3E2',
          100: '#F3DDA8',
          400: '#C8901E',
          500: '#A16207',
          600: '#7E4D08',
          700: '#5C390A',
        },
        // Kept for any remaining teal references; no longer the primary accent
        teal: {
          50: '#E1F5EE',
          100: '#9FE1CB',
          200: '#5DCAA5',
          300: '#3DBC92',
          400: '#1D9E75',
          500: '#1D9E75',
          600: '#0F6E56',
          700: '#085041',
          800: '#063D32',
          900: '#04342C',
        },
        blue: {
          50: '#EAF3FC',
          100: '#C2DDF6',
          400: '#5A9EE5',
          500: '#378ADD',
          600: '#2A6CB0',
          700: '#1F5085',
        },
        amber: {
          50: '#FCF1E3',
          100: '#F2D5A7',
          400: '#D08D2C',
          500: '#BA7517',
          600: '#945E12',
          700: '#6E460D',
        },
        ink: {
          50: '#F7F7F6',
          100: '#E8E8E6',
          400: '#6B6B68',
          600: '#46453F',
          700: '#2C2C2A',
          900: '#1A1A18',
        },
        primary: {
          50: '#FDF1F6',
          400: '#F25B9C',
          500: '#DB2777',
          600: '#BE185D',
          900: '#5C0F32',
        },
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
      },
      fontSize: {
        h1: ['44px', { lineHeight: '1.15', fontWeight: '700', letterSpacing: '-0.02em' }],
        h2: ['32px', { lineHeight: '1.25', fontWeight: '600', letterSpacing: '-0.01em' }],
        h3: ['24px', { lineHeight: '1.35', fontWeight: '600' }],
        body: ['16px', { lineHeight: '1.65', fontWeight: '400' }],
        sm: ['14px', { lineHeight: '1.5', fontWeight: '400' }],
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '32px',
        '3xl': '48px',
      },
      keyframes: {
        'fade-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-in-right': {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-left': 'fade-in-left 0.7s ease-out forwards',
        'fade-in-right': 'fade-in-right 0.7s ease-out 0.15s forwards',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
} satisfies Config
