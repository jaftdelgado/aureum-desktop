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
<<<<<<< HEAD
import { SpeedInsights } from "@vercel/speed-insights/react";
=======
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d

const App: React.FC = () => {
  return (
    <AuthProvider>
      <QueryProvider>
        <SelectedTeamProvider>
          <AppRouter />
          <Toaster position="top-right" />
<<<<<<< HEAD
          <SpeedInsights />
=======
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
        </SelectedTeamProvider>
      </QueryProvider>
    </AuthProvider>
  );
};

export default App;
