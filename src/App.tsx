import React from "react";
import "./i18n";
import { useRoutes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "@components/AuthProvider";

import { appRoutes } from "./Routes";
import "@styles/theme.css";
import "@styles/text-sizes.css";

const clientId =
  "429589404591-g9br5uc0ptnmcrrtqrvt87on50ogaeup.apps.googleusercontent.com";

export const App: React.FC = () => {
  const routes = useRoutes(appRoutes);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>{routes}</AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
