// src/App.tsx
import React from "react";
import { AppRouter } from "@app/navigation/AppRouter";
import { AuthProvider } from "@app/context/AuthProvider"; // <-- importamos el provider
import "@core/design/theme.css";
import "@core/design/text-sizes.css";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};

export default App;
