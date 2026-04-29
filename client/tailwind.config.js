/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#DC2626',
        secondary: '#EF4444',
        cta: '#FBBF24',
        bgLight: '#FEF2F2',
        textDark: '#7F1D1D',
        glass: 'rgba(255, 255, 255, 0.7)',
        glassDark: 'rgba(0, 0, 0, 0.5)',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Archivo', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      backgroundImage: {
        'dot-matrix': 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
        'dot-matrix-dark': 'radial-gradient(circle, #334155 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
