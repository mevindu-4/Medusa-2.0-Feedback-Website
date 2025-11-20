/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        medusa: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        neon: {
          green: '#00ff88',
          cyan: '#00ffff',
        }
      },
      boxShadow: {
        'glow-green': '0 0 20px rgba(34, 197, 94, 0.5)',
        'glow-green-lg': '0 0 30px rgba(34, 197, 94, 0.7)',
        'glow-neon': '0 0 15px rgba(0, 255, 136, 0.8), 0 0 30px rgba(0, 255, 136, 0.4)',
      },
      backgroundImage: {
        'futuristic': 'linear-gradient(135deg, #0a1929 0%, #0d1b2a 25%, #1a2332 50%, #0d1b2a 75%, #0a1929 100%)',
        'medusa-gradient': 'linear-gradient(135deg, #052e16 0%, #14532d 50%, #22c55e 100%)',
      }
    },
  },
  plugins: [],
}

