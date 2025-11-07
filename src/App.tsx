// App.tsx
import React from "react";
import "./i18n";
import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "@layouts/Dashboard";
import { Principal } from "@pages/principal/Principal";
import { Teams } from "@pages/teams/Teams";
import { AssetPage } from "@pages/assets/AssetPage";
import AuthLayout from "@layouts/AuthLayout";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId =
  "429589404591-g9br5uc0ptnmcrrtqrvt87on50ogaeup.apps.googleusercontent.com";

export const App: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<AuthLayout />} />
        <Route path="/dashboard/*" element={<DashboardLayout />}>
          <Route index element={<Principal />} />
          <Route path="teams" element={<Teams />} />
          <Route path="assets" element={<AssetPage />} />
        </Route>
      </Routes>
    </GoogleOAuthProvider>
  );
};

export default App;
