import React from "react";
import "./style.scss";
const Index = ({ placeholder, type, classes, id, onchange, value,accept }) => {
  return (
    <div className="inp__main__container">
      <input
        placeholder={placeholder}
        type={type}
        className={`input__fields ${classes ? classes : ""}`}
        id={id}
        onChange={onchange}
        value={value}
        accept={accept}
      />
    </div>
  );
};

export default Index;
