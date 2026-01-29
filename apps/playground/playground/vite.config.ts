import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Используем source напрямую для HMR и простоты отладки
      "react-form-constructor": path.resolve(
        __dirname,
        "../../../packages/react-form-constructor/src/index.ts",
      ),
    },
    dedupe: ["react", "react-dom"],
  },
  server: {
    port: 3001,
    host: true,
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-hook-form", "react-number-format"],
  },
});
