import React from "react";
import logo from "../assets/ranch-digital-logo-1.png";

const AppNavbar = (props) => {
  // set modal display state

  return (
    <>
     <nav className="navbar">
        <ul className="navbar-nav"> {props.children}</ul>
     </nav>
    </>
  );
};

export default AppNavbar;
