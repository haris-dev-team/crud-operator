import React from "react";
import "./style.scss";
const Index = ({ text, children, type, classes, bgnone, onClick }) => {
  return (
    <div className="main__btn">
      <button
        type={type}
        onClick={onClick}
        className={`btn ${classes ? classes : ""} ${bgnone ? "bg__none" : ""}`}
      >
        {text ? text : children}
      </button>
    </div>
  );
};

export default Index;
