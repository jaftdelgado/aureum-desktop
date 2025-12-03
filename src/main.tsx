import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import initI18n from "@app/i18n/i18n";
import "./index.css";

const renderApp = () => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
};

initI18n()
  .then(() => {
    console.log("i18n inicializado correctamente");
    renderApp();
  })
  .catch((err) => {
    console.error("Error al inicializar i18n:", err);
    renderApp();
  });