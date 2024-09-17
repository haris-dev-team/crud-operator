import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  const uid = localStorage.getItem("uid");
  return !uid ? <Outlet /> : <Navigate to={"/dashboard"} />;
};

export default PublicRoutes;
