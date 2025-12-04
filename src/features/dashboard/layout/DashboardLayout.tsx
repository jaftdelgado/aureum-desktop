import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { AppSidebar } from "@features/dashboard/components/AppSidebar";
import { useIsMobile } from "@app/hooks/useIsMobile";
import { useAuth } from "@app/hooks/useAuth";
import TopBar from "@app/components/TopBar";

export const DashboardLayout: React.FC = () => {
  const isMobile = useIsMobile();
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <span>Cargando...</span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return (
    <div className="flex h-screen w-full bg-bg overflow-hidden">
      {/* Sidebar */}
      {!isMobile && <AppSidebar />}

      {/* Main column */}
      <div className="flex flex-col flex-1 h-full w-full overflow-x-hidden">
        {/* 🔥 Barra superior fija */}
        {!isMobile && <TopBar />}

        {/* 🔥 Scroll SOLO aquí */}
        <div className="flex-1 w-full box-border overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
