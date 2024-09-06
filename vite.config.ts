/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { peerDependencies } from "./package.json";
import { libInjectCss } from "vite-plugin-lib-inject-css";

export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({
      tsconfigPath: "./tsconfig.app.json",
      exclude: ["**/*.stories.tsx"],
    }),
  ],
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "AutoComplete",
      fileName: (format) => `AutoComplete.${format}.js`,
      formats: ["es"],
    },
    rollupOptions: {
      external: Object.keys(peerDependencies),
      output: {
        entryFileNames: "[name].js",
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
});
