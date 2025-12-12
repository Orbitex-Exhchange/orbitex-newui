import type { Config } from "tailwindcss";
import { heroui } from "@heroui/theme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark theme background colors
        background: "#0D0D0D",
        surface: "#1A1A1A",
        "surface-light": "#262626",
        "surface-hover": "#2D2D2D",
        border: "#333333",
        "border-light": "#404040",

        // Text colors
        "text-primary": "#FFFFFF",
        "text-secondary": "#A0A0A0",
        "text-muted": "#6B6B6B",

        // Accent colors
        accent: "#F97316",
        "accent-hover": "#EA580C",
        "accent-light": "#FB923C",

        // Status colors
        success: "#22C55E",
        "success-light": "#4ADE80",
        danger: "#EF4444",
        "danger-light": "#F87171",
        warning: "#F59E0B",

        // Chain colors
        ethereum: "#627EEA",
        solana: "#9945FF",
        base: "#0052FF",
        arbitrum: "#28A0F0",
        optimism: "#FF0420",
        polygon: "#8247E5",
        bnb: "#F0B90B",
        avalanche: "#E84142",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
        shimmer: "shimmer 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};

export default config;
