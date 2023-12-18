/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'modal-up': {
          '0%': { transform: 'translateY(500px)' },
          '100%': { transform: 'translateY(0)' },
        },
        'modal-down': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(500px)' },
        },
      },
    },
  },
  plugins: [],
};
