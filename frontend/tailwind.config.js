import daisyui from "daisyui";
import defaultTheme from "tailwindcss/defaultTheme.js";
import colors from "tailwindcss/colors.js";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette.js";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // all your files
  darkMode: "class", // needed for Aceternity/ShadCN forms
  theme: {
    extend: {
      // Aceternity/ShadCN style input shadow
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1),
                0px 1px 0px 0px rgba(25,28,33,0.02),
                0px 0px 0px 1px rgba(25,28,33,0.08)`,
      },
      // you can extend more here (colors, spacing, etc.)
    },
  },
  plugins: [daisyui], // keep DaisyUI for other pages
};
