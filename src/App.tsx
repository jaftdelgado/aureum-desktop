// src/App.tsx
import React, { useEffect } from "react";
import { AppRouter } from "@app/navigation/AppRouter";
import { AuthProvider } from "@app/context/AuthProvider";
import { QueryProvider } from "@app/providers/QueryProvider";
import { SelectedTeamProvider } from "@app/providers/SelectedTeamProvider"; // <-- importamos nuestro provider
import { supabase } from "@infra/external/http/supabase";
import "@core/design/theme.css";
import "@core/design/text-sizes.css";
import "@core/design/design-tokens.css";
import { Toaster } from "@core/ui/Toaster";

const App: React.FC = () => {
  useEffect(() => {
    const printToken = async () => {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      console.log("Access token:", token);
    };

    printToken();
  }, []);

  return (
    <AuthProvider>
      <QueryProvider>
        <SelectedTeamProvider>
          <AppRouter />
          <Toaster position="bottom-right" />
        </SelectedTeamProvider>
      </QueryProvider>
    </AuthProvider>
  );
};

export default App;
