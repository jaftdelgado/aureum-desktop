import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { AppSidebar } from "@features/dashboard/components/AppSidebar";
import { useIsMobile } from "@app/hooks/useIsMobile";
import { useAuth } from "@app/hooks/useAuth";
import TopBar from "@app/components/TitleBar";
<<<<<<< HEAD
import { DotPattern } from "@features/dashboard/components/DotPattern";
=======
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d

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
<<<<<<< HEAD
    <div className="flex h-screen w-full bg-bg overflow-hidden relative">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <DotPattern className="w-full h-full opacity-70" />
      </div>

      {!isMobile && <AppSidebar className="relative z-10" />}

      <div className="flex flex-col flex-1 h-full w-full overflow-x-hidden relative z-10">
        {!isMobile && <TopBar />}

        <div className="flex-1 w-full box-border overflow-y-auto relative z-10">
=======
    <div className="flex h-screen w-full bg-bg overflow-hidden">
      {!isMobile && <AppSidebar />}

      <div className="flex flex-col flex-1 h-full w-full overflow-x-hidden">
        {!isMobile && <TopBar />}

        <div className="flex-1 w-full box-border overflow-y-auto">
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
          <Outlet />
        </div>
      </div>
    </div>
  );
};
