import React from "react";
import "./style.scss";
import { Navbar } from "../../components";
import { Outlet } from "react-router-dom";
const Index = () => {
  return (
    <div className="dash__main">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Index;
