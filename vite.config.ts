/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "unplugin-dts/vite";
import svgr from "vite-plugin-svgr";
import { fileURLToPath } from "node:url";
import path from "node:path";
import process from "node:process";
import type { PluginOptions } from "unplugin-dts";
import type { UserConfig, BuildEnvironmentOptions } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dtsOptions = {
  exclude: [],
  tsconfigPath: "./tsconfig.app.json",
  outDirs: "./dist",
  bundleTypes: true,
} as PluginOptions;

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDemo = mode === "demo";
  const isDev = process.env.NODE_ENV === "development";
  const buildExamples = isDemo || isDev;
  const config: UserConfig = {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    plugins: [react(), svgr(), ...(isDemo ? [] : [dts(dtsOptions)])],
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
              entry: path.resolve(__dirname, "src/index.ts"),
              name: "react-context-modal",
              formats: ["es"],
              cssFileName: "index",
            },
            outDir: path.resolve(__dirname, "./dist"),
            rollupOptions: {
              external: ["react", "react-dom", "react/jsx-runtime", "simplebar-react"],
              output: {
                entryFileNames: "[name].js",
                chunkFileNames: "chunks/[name].[hash].js",
              },
            },
          },
    css: {
      modules: {
        generateScopedName: (name) => {
          return `context-modal-${name}`;
        },
      },
    },
  };

  return config;
});
