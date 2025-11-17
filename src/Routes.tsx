import { Navigate } from "react-router-dom";
import { DashboardLayout } from "@dashboard/layouts/DashboardLayout";
import { ExplorePage } from "@explore/pages/ExplorePage";
import { TeamsPage } from "@teams/pages/TeamsPage";
import { AssetsPage } from "@assets/pages/AssetsPage";
import { RegisterAsset } from "@assets/pages/RegisterAsset";
import { MarketPage } from "@market/pages/MarketPage";
import { SettingsPage } from "@settings/pages/SettingsPage";
import { SimulatorSettings } from "@settings/pages/SimulatorSettings";
import AuthPage from "@auth/pages/AuthPage";

export const appRoutes = [
  {
    path: "/",
    element: <Navigate to="/auth" replace />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <ExplorePage /> },
      { path: "teams", element: <TeamsPage /> },
      { path: "assets", element: <AssetsPage /> },
      { path: "assets/register", element: <RegisterAsset /> },
      { path: "market", element: <MarketPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "settings/simulator", element: <SimulatorSettings /> },
    ],
  },
];
