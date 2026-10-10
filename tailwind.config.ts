import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: { DEFAULT: "#FAF8F5", deep: "#F5F2EB" },
        ink: { DEFAULT: "#18181B", muted: "#71717A" },
        obsidian: { DEFAULT: "#121316", soft: "#1E1F24" },
        olive: "#7A7F4E",
        amber2: "#D9A441",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
