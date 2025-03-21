import type { Config } from "tailwindcss";
import { colors } from "./theme";

const config: Config = {
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.{vue,js,ts}",
    "./pages/**/*.{vue,js,ts}",
  ],
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [],
};

export default config;
