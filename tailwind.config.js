/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-bg": "#202123",
        "secondary-bg": "#343541",
        "accent-bg": "#444653",
        "primary-text": "#ececf1",
        "secondary-text": "#7f8187",
        "accent": "#39a37e"
      }
    }
  },
  plugins: []
};
