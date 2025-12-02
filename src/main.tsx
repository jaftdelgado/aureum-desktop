import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import initI18n from "@app/i18n/i18n";
import "./index.css";

(async () => {
  await initI18n();

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
})();
