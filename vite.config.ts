import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "./",
  plugins: [react()],
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "src/app"),
      "@core": path.resolve(__dirname, "src/core"),
      "@domain": path.resolve(__dirname, "src/domain"),
      "@features": path.resolve(__dirname, "src/features"),
      "@infra": path.resolve(__dirname, "src/infra"),
      "@resources": path.resolve(__dirname, "src/resources"),
      "@auth": path.resolve(__dirname, "./src/features/auth"),
      "@ui": path.resolve(__dirname, "./src/core/ui"),
    },
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          router: ["react-router", "react-router-dom"],
          query: ["@tanstack/react-query"],
          charts: [
            "recharts",
            "d3-interpolate",
            "d3-scale",
            "d3-shape",
            "d3-time",
            "d3-time-format",
          ],
        },
      },
    },
  },
  test: {
    globals: true,
    environment: "node",  
  },
});
