import React, { Suspense, lazy } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { DashboardLayout } from "@app/dashboard/layout/DashboardLayout";

const AuthPage = lazy(() => import("@features/auth/pages/AuthPage"));
const HomePage = lazy(() => import("@features/home/pages/HomePage"));
const TeamsPage = lazy(() => import("@features/teams/pages/TeamsPage"));
const LessonsPage = lazy(() => import("@features/lessons/pages/LessonsPage"));
const PortfolioPage = lazy(
  () => import("@features/portfolio/pages/PortfolioPage")
);
const AssetsPage = lazy(() => import("@features/assets/pages/AssetsPage"));
const MarketPage = lazy(() => import("@features/market/pages/MarketPage"));
const TeamSettingsPage = lazy(
  () => import("@features/team-settings/pages/TeamSettingsPage")
);
const SimulatorSettings = lazy(
  () => import("@features/team-settings/pages/SimulatorSettings")
);

// Layout para un equipo específico
const TeamLayout: React.FC = () => <Outlet />;

interface AppRoute {
  path: string;
  element?: React.ReactNode;
  type?: "public" | "private";
  children?: AppRoute[];
}

const routes: AppRoute[] = [
  {
    type: "public",
    path: "/auth",
    element: <AuthPage />,
  },
  {
    type: "private",
    path: "/",
    element: <DashboardLayout />,
    children: [
      { path: "", element: <Navigate to="/home" replace /> },
      { path: "home", element: <HomePage /> },
      { path: "teams", element: <TeamsPage /> }, // lista de equipos
      { path: "lessons", element: <LessonsPage /> },
      {
        path: "teams/:teamId", // layout de equipo
        element: <TeamLayout />,
        children: [
          { path: "assets", element: <AssetsPage /> },
          { path: "market", element: <MarketPage /> },
          { path: "settings", element: <TeamSettingsPage /> },
          { path: "settings/simulator", element: <SimulatorSettings /> },
          { path: "portfolio", element: <PortfolioPage /> },
        ],
      },
    ],
  },
];

export const AppRouter: React.FC = () => {
  const renderRoutes = (routes: AppRoute[]) =>
    routes.map((r) => {
      const ElementWrapper =
        r.type === "public"
          ? PublicRoute
          : r.type === "private"
          ? PrivateRoute
          : React.Fragment;

      return (
        <Route
          key={r.path}
          path={r.path}
          element={<ElementWrapper>{r.element}</ElementWrapper>}
        >
          {r.children && renderRoutes(r.children)}
        </Route>
      );
    });

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>{renderRoutes(routes)}</Routes>
      </Suspense>
    </BrowserRouter>
  );
};
