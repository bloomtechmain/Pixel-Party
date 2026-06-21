import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf4ff',
          100: '#fae8ff',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
        },
        lime: '#B7CB45',
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
        sans: ['Poppins', 'Inter', 'sans-serif'],
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { opacity: '0.08' },
          '50%': { opacity: '0.22' },
        },
        borderPulse: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
        'border-pulse': 'borderPulse 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
