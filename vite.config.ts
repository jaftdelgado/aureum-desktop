import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: "/",
    plugins: [
      react({
        babel: {
          plugins: [["babel-plugin-react-compiler"]],
        },
      }),
    ],
    resolve: {
      alias: {
        "@api": path.resolve(__dirname, "src/api"),
        "@assets": path.resolve(__dirname, "src/assets"),
        "@context": path.resolve(__dirname, "src/context"),
        "@layouts": path.resolve(__dirname, "src/layouts"),
        "@lib": path.resolve(__dirname, "src/lib"),
        "@hooks": path.resolve(__dirname, "src/hooks"),
        "@pages": path.resolve(__dirname, "src/pages"),
        "@ui": path.resolve(__dirname, "src/components/ui"),
        "@components": path.resolve(__dirname, "src/components"),
        "@styles": path.resolve(__dirname, "src/styles"),
        "@schemas": path.resolve(__dirname, "src/schemas"),
        "@types": path.resolve(__dirname, "src/types"),
        "@scss": path.resolve(__dirname, "src/scss"),
      },
    },
    server: {
      proxy: {
        "/assets": {
          target: env.VITE_ASSET_API_URL || "http://localhost:8002",
          changeOrigin: true,
          secure: false,
          rewrite: (p) => p.replace(/^\/assets/, "/assets"),
        },
      },
    },
  };
});
