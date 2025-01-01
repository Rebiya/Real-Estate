/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f5f6f7",
        secondary: "#828C43",
        tertiary: "#222222",
        secondaryRed: "#F5423F",
        secondaryYellow: "#f4cc62",
        secondaryGreen: "#adc66c",
        secondaryBlue: "#123764",
        secondaryWhite: "#eeeeee",
        gray: {
          10: "#EEEEEE",
          20: "#A2A2A2",
          30: "#E0E0E0", // Added your custom gray.30
          50: "#787878",
          90: "#141414"
        }
      },
      screens: {
        xs: "400px",
        "2xl": "1680px",
        "3xl": "2000px"
      },
      backgroundImage: {
        hero: "url(/src/assets/bg.png)"
      }
    }
  },
  plugins: []
};
