import React from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "@dashboard/components/SidebarApp";
import { ThemeToggleButton } from "@ui/ThemeToggle";
import { TopbarMenu } from "@components/ui/TopbarMenu";
import { useIsMobile } from "@core/hooks/useIsMobile";
import { LanguageCombobox } from "@components/LanguageCombobox";
import { AppBreadcrumb } from "@dashboard/components/AppBreadcrumb";

export const DashboardLayout: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="flex h-screen w-full bg-bg overflow-hidden">
      {!isMobile && <AppSidebar />}

      <div className="flex flex-col flex-1 h-full w-full overflow-y-auto overflow-x-hidden">
        {isMobile && <TopbarMenu />}

        {!isMobile && (
          <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-4 flex-shrink-0">
            <AppBreadcrumb />
            <div className="flex items-center gap-3">
              <LanguageCombobox />
              <ThemeToggleButton />
            </div>
          </div>
        )}

        <div className="flex-1 w-full box-border">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
