// src/app/navigation/PublicRoute.tsx
import React from "react";
import { Navigate} from "react-router-dom";
import { useAuth } from "@app/hooks/useAuth";

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        Cargando...
      </div>
    );
  }

  if (user) {
    return <Navigate to="/home"  replace />;
  }

  return <>{children}</>;
};
