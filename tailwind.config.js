/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary-red": "#BC0100",
        "crimson-glitch": "#BC0100",
        "stark-white": "#FFFFFF",
        "void-black": "#000000",
        "deep-black": "#060606",
        "carbon-gray": "#1A1A1A",
        "surface-dark": "#131313",
        "surface-warm": "#F6F5F2",
        "concrete-smoke": "#333333",
        "outline-gray": "rgba(255,255,255,0.12)",
      },
      fontFamily: {
        anton: ["Anton", "sans-serif"],
        jetbrains: ["'JetBrains Mono'", "monospace"],
        ibm: ["'IBM Plex Mono'", "monospace"],
        archivo: ["Archivo", "sans-serif"],
        space: ["'Space Mono'", "monospace"],
      },
      maxWidth: {
        "container-max": "1440px",
      },
      padding: {
        "margin-mobile": "20px",
        "margin-desktop": "64px",
        "section-gap": "100px",
      },
      animation: {
        marquee: "marquee 22s linear infinite",
        "pulse-slow": "loading-pulse 1.8s ease-in-out infinite",
        glitch: "zgA 2s steps(2) infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "loading-pulse": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.3", transform: "scale(0.85)" },
        },
      },
    },
  },
  plugins: [],
}
