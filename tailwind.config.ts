import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Tailwind 3 has no `invalid` key in its built-in aria variants, yet
      // shadcn's controls style invalid states via `aria-invalid:*`.
      aria: {
        invalid: 'invalid="true"',
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "rgb(var(--color-primary-rgb) / <alpha-value>)",
          deep: "rgb(var(--color-primary-deep-rgb) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground))",
        },
        gold: {
          DEFAULT: "rgb(var(--color-gold-rgb) / <alpha-value>)",
          ink: "rgb(var(--color-gold-ink-rgb) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        link: "rgb(var(--link-rgb) / <alpha-value>)",
        surface: {
          DEFAULT: "var(--surface)",
          muted: "var(--surface-muted)",
          raised: "var(--surface-raised)",
        },
        border: {
          DEFAULT: "hsl(var(--border))",
          muted: "var(--border-muted)",
        },
        ink: {
          DEFAULT: "var(--ink)",
          muted: "var(--ink-muted)",
          subtle: "var(--ink-subtle)",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      borderColor: {
        DEFAULT: "hsl(var(--border))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        card: "var(--card-shadow)",
      },
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1200px",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
