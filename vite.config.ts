import { defineConfig } from "vite";
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
      '@auth': path.resolve(__dirname, './src/features/auth'),
      '@ui': path.resolve(__dirname, './src/core/ui'),
    },
  },
});
