// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}', // cukup satu baris ini, sudah mencakup semua
  ],
  theme: {
    extend: {},
  },
  plugins: {
    typography: {}, // cara baru di Tailwind 4
  },
};