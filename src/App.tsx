// src/App.tsx
import React from "react";
import { AppRouter } from "@app/navigation/AppRouter";
import { AuthProvider } from "@app/context/AuthProvider";
import { QueryProvider } from "@app/providers/QueryProvider";
import { SelectedTeamProvider } from "@app/providers/SelectedTeamProvider";
import "@core/design/theme.css";
import "@core/design/text-sizes.css";
import "@core/design/design-tokens.css";
import { Toaster } from "@core/ui/Toaster";
import { SpeedInsights } from "@vercel/speed-insights/react";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <QueryProvider>
        <SelectedTeamProvider>
          <AppRouter />
          <Toaster position="top-right" />
          <SpeedInsights />
        </SelectedTeamProvider>
      </QueryProvider>
    </AuthProvider>
  );
};

export default App;
