import React from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "@components/SidebarApp";
import { Breadcrumb } from "@ui/Breadcrumb";
import { ThemeToggleButton } from "@ui/ThemeToggle";
import { TopbarMenu } from "@components/ui/TopbarMenu";
import { useIsMobile } from "@hooks/useIsMobile";

export const DashboardLayout: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="flex h-screen w-full bg-bg overflow-hidden">
      {/* Sidebar solo en pantallas grandes */}
      {!isMobile && <AppSidebar />}

      <div className="flex flex-col flex-1 h-full w-full overflow-y-auto overflow-x-hidden">
        {/* Topbar solo en móviles */}
        {isMobile && <TopbarMenu />}

        {/* Breadcrumb y ThemeToggle en pantallas grandes */}
        {!isMobile && (
          <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-4 flex-shrink-0">
            <Breadcrumb />
            <ThemeToggleButton />
          </div>
        )}

        <div className="flex-1 w-full box-border">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
