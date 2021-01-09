import React from "react";
import "nes.css/css/nes.min.css";
import "../styles/index.css";

const Layout = ({ children, rootClassName }) => {
  return (
    <div className="background">
      <div className={`screenContainer ${rootClassName}`}>{children}</div>
    </div>
  );
};

export default Layout;
