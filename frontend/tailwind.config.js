import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1),
                0px 1px 0px 0px rgba(25,28,33,0.02),
                0px 0px 0px 1px rgba(25,28,33,0.08)`,
      },
      keyframes: {
        "cell-ripple": {
          "0%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
          "100%": { opacity: "0.4" },
        },
      },
      animation: {
        "cell-ripple": "cell-ripple var(--duration, 200ms) ease-out infinite",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark", "retro"],
  },
};
