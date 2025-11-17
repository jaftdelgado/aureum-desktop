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
        "@resources": path.resolve(__dirname, "src/resources"),
        "@context": path.resolve(__dirname, "src/context"),
        "@lib": path.resolve(__dirname, "src/lib"),
        "@hooks": path.resolve(__dirname, "src/hooks"),
        "@ui": path.resolve(__dirname, "src/components/ui"),
        "@components": path.resolve(__dirname, "src/components"),
        "@styles": path.resolve(__dirname, "src/styles"),
        "@core": path.resolve(__dirname, "src/modules/core"),
        "@auth": path.resolve(__dirname, "src/modules/auth"),
        "@dashboard": path.resolve(__dirname, "src/modules/dashboard"),
        "@explore": path.resolve(__dirname, "src/modules/explore"),
        "@teams": path.resolve(__dirname, "src/modules/teams"),
        "@assets": path.resolve(__dirname, "src/modules/assets"),
        "@market": path.resolve(__dirname, "src/modules/market"),
        "@settings": path.resolve(__dirname, "src/modules/settings"),
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
