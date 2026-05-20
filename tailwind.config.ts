import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#0A0A0A",
        surface: "#111111",
        elevated: "#181818",
        light: "#F5F4F0",
        ink: "#FAFAFA",
        muted: "#8A8A85",
        dim: "#4A4A45",
        accent: "#C9A96E",
        "accent-soft": "#E8D5B0",
      },
      fontFamily: {
        sans: ["var(--font-geist)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      letterSpacing: {
        widest: "0.32em",
        ultrawide: "0.45em",
      },
      transitionTimingFunction: {
        ease: "cubic-bezier(0.22, 1, 0.36, 1)",
        "ease-out": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        logoBreathe: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.92" },
        },
        logoFocus: {
          "0%, 80%, 100%": { opacity: "0" },
          "10%, 70%": { opacity: "0.45" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        float: "float 4s ease-in-out infinite",
        logoBreathe: "logoBreathe 6s ease-in-out infinite",
        logoFocus: "logoFocus 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
