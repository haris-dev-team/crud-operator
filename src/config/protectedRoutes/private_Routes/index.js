import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const userid = localStorage.getItem("uid");
  return userid ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoutes;
