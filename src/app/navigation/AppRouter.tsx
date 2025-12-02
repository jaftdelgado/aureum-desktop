// src/app/navigation/AppRouter.tsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "@features/auth/pages/AuthPage";
import { DashboardLayout } from "@app/dashboard/layout/DashboardLayout";
import { HomePage } from "@features/home/pages/HomePage";
import { TeamsPage } from "@features/teams/pages/TeamsPage";
import { LessonsPage } from "@features/lessons/pages/LessonsPage";
import { AssetsPage } from "@features/assets/pages/AssetsPage";
import { MarketPage } from "@features/market/pages/MarketPage";
import { TeamSettingsPage } from "@features/team-settings/pages/TeamSettingsPage";
import { PortfolioPage } from "@features/portfolio/pages/PortfolioPage";

import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";

export const AppRouter: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/auth"
        element={
          <PublicRoute>
            <AuthPage />
          </PublicRoute>
        }
      />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="home" element={<HomePage />} />
        <Route path="teams" element={<TeamsPage />} />
        <Route path="lessons" element={<LessonsPage />} />
        <Route path="teams/:teamId/assets" element={<AssetsPage />} />
        <Route path="teams/:teamId/market" element={<MarketPage />} />
        <Route path="teams/:teamId/settings" element={<TeamSettingsPage />} />
        <Route path="teams/:teamId/portfolio" element={<PortfolioPage />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  </BrowserRouter>
);
