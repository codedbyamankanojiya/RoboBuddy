import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        /* Token-based palette */
        primary: {
          DEFAULT: "rgb(var(--color-primary) / <alpha-value>)",
          dark: "rgb(var(--color-primary-dark) / <alpha-value>)",
        },
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        status: {
          success: "rgb(var(--color-success) / <alpha-value>)",
          warning: "rgb(var(--color-warning) / <alpha-value>)",
          error: "rgb(var(--color-error) / <alpha-value>)",
        },
        neural: "rgb(var(--color-neural) / <alpha-value>)",
        robotic: "rgb(var(--color-robotic) / <alpha-value>)",
        energy: "rgb(var(--color-energy) / <alpha-value>)",
        surface: {
          DEFAULT: "rgb(var(--color-surface) / <alpha-value>)",
          elevated: "rgb(var(--color-surface-elevated) / <alpha-value>)",
        },
        border: {
          DEFAULT: "rgb(var(--color-border) / <alpha-value>)",
          strong: "rgb(var(--color-border-strong) / <alpha-value>)",
        },
      },
      animation: {
        "fade-in": "fadeIn var(--motion-duration-normal) var(--motion-ease) forwards",
        "fade-in-up": "fadeInUp var(--motion-duration-slow) var(--motion-ease) forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      transitionDuration: {
        fast: "var(--motion-duration-fast)",
        normal: "var(--motion-duration-normal)",
        slow: "var(--motion-duration-slow)",
        slower: "var(--motion-duration-slower)",
      },
      transitionTimingFunction: {
        smooth: "var(--motion-ease)",
        spring: "var(--motion-ease-spring)",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(to right, rgb(var(--color-primary)), rgb(var(--color-accent)))",
        "gradient-primary-br": "linear-gradient(to bottom right, rgb(var(--color-primary)), rgb(var(--color-accent)))",
        "gradient-fog": "radial-gradient(ellipse 80% 50% at 50% 0%, rgb(var(--color-violet-100) / 0.4), transparent 70%)",
      },
      boxShadow: {
        glow: "0 0 24px var(--glow-primary)",
        "glow-sm": "0 0 12px var(--glow-primary)",
        "inner-glow": "inset 0 0 20px rgb(var(--color-primary) / 0.08)",
        "glow-neural": "0 0 18px var(--glow-neural)",
        "glow-energy": "0 0 20px var(--glow-energy)",
      },
    },
  },
  plugins: [],
} satisfies Config;
