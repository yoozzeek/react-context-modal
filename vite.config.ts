/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "unplugin-dts/vite";
import svgr from "vite-plugin-svgr";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import { fileURLToPath } from "node:url";
import path from "node:path";
import type { PluginOptions } from "unplugin-dts";
import type { BuildEnvironmentOptions } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dtsOptions = {
  exclude: ["**/*.stories.tsx"],
  tsconfigPath: "./tsconfig.app.json",
  bundleTypes: true,
} as PluginOptions;

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDemo = mode === "demo";
  const isDev = process.env.NODE_ENV === "development";
  const buildExamples = isDemo || isDev;
  return {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./lib"),
      },
    },
    plugins: [react(), svgr(), ...(isDemo ? [] : [libInjectCss(), dts(dtsOptions)])],
    root: buildExamples ? "examples" : ".",
    base: isDemo ? "/react-context-modal/" : undefined,
    build: isDemo
      ? ({
          outDir: path.resolve(__dirname, "./dist"),
          emptyOutDir: true,
        } as BuildEnvironmentOptions)
      : isDev
        ? undefined // no need to build with vite dev server
        : {
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
          },
  };
});
