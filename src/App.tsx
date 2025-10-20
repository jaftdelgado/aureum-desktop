import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "@layouts/Dashboard";
import { Principal } from "@pages/principal/Principal";
import { Teams } from "@pages/teams/Teams";
import AuthLayout from "@layouts/AuthLayout";

export const App: React.FC = () => {
  return (
    <Routes>
      {/* Redirige "/" a "/auth" */}
      <Route path="/" element={<Navigate to="/auth" replace />} />

      {/* Layout de autenticación */}
      <Route path="/auth" element={<AuthLayout />} />

      {/* Dashboard */}
      <Route path="/dashboard/*" element={<DashboardLayout />}>
        <Route index element={<Principal />} /> {/* /dashboard */}
        <Route path="teams" element={<Teams />} /> {/* /dashboard/teams */}
      </Route>
    </Routes>
  );
};

export default App;
