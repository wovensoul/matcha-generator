/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}", // adjust to your source folders
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "green-light": "var(--green-light)",
        "green-medium": "var(--green-medium)",
        "green-dark": "var(--green-dark)",
        "green-primary": "var(--green-primary)",
        "green-primary-hover": "var(--green-primary-hover)",
        "green-border": "var(--green-border)",
        "green-text": "var(--green-text)",
        "red-error": "var(--red-error)",
      },
    },
  },
  plugins: [],
};