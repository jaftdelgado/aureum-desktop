import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "@layouts/Dashboard";
import { Principal } from "@pages/principal/Principal";
import { Courses } from "@pages/courses/Courses";

export const App: React.FC = () => {
  return (
    <Routes>
      {/* Redirige "/" a "/dashboard" */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Dashboard */}
      <Route path="/dashboard/*" element={<DashboardLayout />}>
        <Route index element={<Principal />} /> {/* /dashboard */}
        <Route path="courses" element={<Courses />} /> {/* /dashboard/courses */}
      </Route>
    </Routes>
  );
};

export default App;
