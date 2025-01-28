import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "var(--accent)",
        "accent-dark": "var(--accent-dark)",
        background: "var(--background)",
      },
      screens: {
        "3xl": "1920px",
        "4xl": "2560px",
        touch: { raw: "(pointer: coarse)" },
        mouse: { raw: "(hover: hover)" },
      },
    },
  },
  plugins: [],
} satisfies Config;
