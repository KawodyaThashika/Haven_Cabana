/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Tropical Sri Lanka palette: lagoon teal, jungle green, sunset mango & coral
        lagoon: {
          50:  '#effcfb',
          100: '#d3f8f4',
          200: '#a9efe8',
          300: '#6fdfd8',
          400: '#35c6c4',
          500: '#14a3a8',
          600: '#0e8189',
          700: '#0f666d',
          800: '#11525a',
          900: '#0a3b42',
          950: '#04222a',
        },
        jungle: {
          50:  '#f0fbf2',
          100: '#dcf6e1',
          200: '#bbeac6',
          300: '#8bd7a0',
          400: '#55bd75',
          500: '#2fa058',
          600: '#1f8046',
          700: '#1a663a',
          800: '#175131',
          900: '#13432a',
          950: '#09251a',
        },
        sunset: {
          50:  '#fff8ec',
          100: '#ffeed0',
          200: '#ffd999',
          300: '#ffc061',
          400: '#ffa52e',
          500: '#fb8500',
          600: '#e06600',
          700: '#b94a02',
          800: '#963a08',
          900: '#7a310b',
        },
        coral: {
          400: '#ff7a6b',
          500: '#f4533f',
          600: '#d63a28',
        },
        haven: {
          foam:  '#f2fbf9',
          mist:  '#e1f4f0',
          lagoon:'#0e8189',
          mango: '#ffb703',
          coral: '#f4533f',
          deep:  '#04222a',
          jungle:'#1f8046',
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'kenburns': 'kenburns 28s ease-in-out infinite alternate',
        'drift': 'drift 14s ease-in-out infinite',
        'marquee': 'marquee 40s linear infinite',
        'gradient-x': 'gradientX 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        kenburns: {
          '0%':   { transform: 'scale(1.02) translate3d(0,0,0)' },
          '100%': { transform: 'scale(1.14) translate3d(-1.5%, -1%, 0)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%':      { transform: 'translate3d(30px,-24px,0) scale(1.08)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        }
      },
    },
  },
  plugins: [],
}
