import React from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "@components/SidebarApp";
import { Breadcrumb } from "@components/ui/breadcrumb/Breadcrumb";
import "@layouts/dashboard.scss";

export const DashboardLayout: React.FC = () => {
  return (
    <div className="principal-page">
      <div className="app-layout"> {/* ✅ este wrapper es necesario para flex correcto */}
        <AppSidebar />

        <div className="layout-content">
          <div className="breadcrumb-container">
            <Breadcrumb />
          </div>

          <div className="page-content">
            <Outlet /> {/* Renderiza Principal o Courses */}
          </div>
        </div>
      </div>
    </div>
  );
};
