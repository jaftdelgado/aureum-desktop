// src/App.tsx
import React from "react";
import "./i18n";
import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "@layouts/Dashboard";
import { Principal } from "@pages/principal/Principal";
import { Teams } from "@pages/teams/Teams";
import { AssetPage } from "@pages/assets-module/AssetPage";
import { RegisterAsset } from "@pages/assets-module/RegisterAsset";
import AuthLayout from "@layouts/AuthLayout";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "@components/AuthProvider";
import { useAuthContext } from "@hooks/useAuthContext";
import "@styles/theme.css";

const clientId =
  "429589404591-g9br5uc0ptnmcrrtqrvt87on50ogaeup.apps.googleusercontent.com";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, loading } = useAuthContext();

  if (loading) return <div>Cargando...</div>;
  if (!user) return <Navigate to="/auth" replace />;

  return <>{children}</>;
};

const AuthRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuthContext();

  if (loading) return <div>Cargando...</div>;
  if (user) return <Navigate to="/dashboard" replace />;

  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" replace />} />

          <Route
            path="/auth"
            element={
              <AuthRoute>
                <AuthLayout />
              </AuthRoute>
            }
          />

          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Principal />} />
            <Route path="teams" element={<Teams />} />
            <Route path="assets" element={<AssetPage />} />
            <Route path="assets/register" element={<RegisterAsset />} />
          </Route>
        </Routes>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
