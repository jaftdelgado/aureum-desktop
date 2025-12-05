import React, { Suspense, lazy } from "react";
import { HashRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { DashboardLayout } from "@features/dashboard/layout/DashboardLayout";
import { RequireProfile } from "./RequireProfile";

const AuthPage = lazy(() => import("@features/auth/pages/AuthPage"));
const HomePage = lazy(() => import("@features/home/pages/HomePage"));
const TeamsPage = lazy(() => import("@features/teams/pages/TeamsPage"));
const LessonsPage = lazy(() => import("@features/lessons/pages/pages/LessonsPage"));
const PortfolioPage = lazy(
  () => import("@features/portfolio/pages/PortfolioPage")
);
const AssetsPage = lazy(() => import("@features/assets/pages/AssetsPage"));
const MarketPage = lazy(() => import("@features/market/pages/MarketPage"));
const TeamSettingsPage = lazy(
  () => import("@features/team-settings/pages/TeamSettingsPage")
);
const TeamMembersPage = lazy(
  () => import("@features/team-settings/pages/MembersSettingsPage")
);
const SimulatorSettings = lazy(
  () => import("@features/team-settings/pages/SimulatorSettings")
);

const TeamLayout: React.FC = () => <Outlet />;

interface AppRoute {
  path: string;
  element?: React.ReactNode;
  type?: "public" | "private";
  children?: AppRoute[];
}

const routes: AppRoute[] = [
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    type: "private",
    path: "/",
    element: (
      <RequireProfile>
        <DashboardLayout />
      </RequireProfile>
    ),
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
          { path: "settings/members", element: <TeamMembersPage /> },
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
    <HashRouter>
      <Suspense
        fallback={
          <div className="h-screen w-full flex items-center justify-center">
            Cargando aplicación...
          </div>
        }
      >
        <Routes>{renderRoutes(routes)}</Routes>
      </Suspense>
    </HashRouter>
  );
};
