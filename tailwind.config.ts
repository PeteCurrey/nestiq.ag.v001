import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        forest: "var(--color-forest)",
        emerald: "var(--color-emerald)",
        obsidian: "var(--color-obsidian)",
        pearl: "var(--color-pearl)",
        warm: "var(--color-warm)",
        border: "var(--color-border)",
        muted: "var(--color-muted)",
        subtle: "var(--color-subtle)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error: "var(--color-error)",
        info: "var(--color-info)",
        "for-sale": "var(--color-for-sale)",
        "to-rent": "var(--color-to-rent)",
        sold: "var(--color-sold)",
        let: "var(--color-let)",
        "new-build": "var(--color-new-build)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-display)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular"],
      },
      fontSize: {
        'display-2xl': ['4.5rem',   { lineHeight: '1.1',  letterSpacing: '-0.03em' }],
        'display-xl':  ['3.75rem',  { lineHeight: '1.1',  letterSpacing: '-0.025em' }],
        'display-lg':  ['3rem',     { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-md':  ['2.25rem',  { lineHeight: '1.2',  letterSpacing: '-0.015em' }],
        'display-sm':  ['1.875rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'body-xl':     ['1.25rem',  { lineHeight: '1.75' }],
        'body-lg':     ['1.125rem', { lineHeight: '1.75' }],
        'body-md':     ['1rem',     { lineHeight: '1.7' }],
        'body-sm':     ['0.875rem', { lineHeight: '1.6' }],
        'label':       ['0.8125rem',{ lineHeight: '1.5',  letterSpacing: '0.05em' }],
      },
      spacing: {
        'px': '1px', '0': '0', '0.5': '2px',
        '1': '4px', '1.5': '6px', '2': '8px', '2.5': '10px',
        '3': '12px', '4': '16px', '5': '20px', '6': '24px',
        '8': '32px', '10': '40px', '12': '48px', '16': '64px',
        '20': '80px', '24': '96px', '32': '128px',
      },
      borderRadius: {
        'none': '0', 'sm': '4px', 'DEFAULT': '6px', 'md': '8px',
        'lg': '12px', 'xl': '16px', '2xl': '24px', 'full': '9999px',
      },
      boxShadow: {
        'xs':         '0 1px 2px rgba(0,0,0,0.05)',
        'sm':         '0 2px 4px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'md':         '0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
        'lg':         '0 8px 24px rgba(0,0,0,0.10), 0 4px 8px rgba(0,0,0,0.06)',
        'xl':         '0 16px 40px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.06)',
        'card':       '0 2px 8px rgba(26,107,74,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 8px 24px rgba(26,107,74,0.12), 0 4px 8px rgba(0,0,0,0.06)',
        'none':       'none',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      }
    },
  },
  plugins: [],
};
export default config;
