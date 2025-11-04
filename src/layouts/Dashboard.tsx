import React from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "@components/SidebarApp";
import { Breadcrumb } from "@ui/Breadcrumb";

export const DashboardLayout: React.FC = () => {
  return (
    <div className="flex h-screen w-full bg-bg overflow-hidden">
      <AppSidebar />

      <div className="flex flex-col flex-1 h-full w-full overflow-y-auto overflow-x-hidden">
        <div className="sticky top-0 z-10 flex items-center px-8 py-4 flex-shrink-0">
          <Breadcrumb />
        </div>
        <div className="flex-1 w-full box-border">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
