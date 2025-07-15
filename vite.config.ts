/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "unplugin-dts/vite";
import svgr from "vite-plugin-svgr";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { PluginOptions } from "unplugin-dts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isLibBuild = process.env.NODE_ENV === "production";

const dtsOptions = {
  exclude: ["**/*.stories.tsx"],
  tsconfigPath: "./tsconfig.app.json",
  bundleTypes: true,
} as PluginOptions;

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./lib"),
    },
  },
  plugins: [react(), svgr(), libInjectCss(), dts(dtsOptions)],
  root: isLibBuild ? "." : "examples",
  build: isLibBuild
    ? {
        lib: {
          entry: path.resolve(__dirname, "lib/index.ts"),
          name: "react-context-modal",
          formats: ["es"],
        },
        rollupOptions: {
          external: [
            "react",
            "react-dom",
            "react/jsx-runtime",
            "react-responsive",
            "simplebar-react",
          ],
        },
      }
    : undefined,
});
