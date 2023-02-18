import React from "react";
import logo from "../assets/ranch-digital-logo-1.png";

const AppNavbar = (props) => {
  // set modal display state

  return (
    <>
     <nav className="navbar">
      <div className="nav-wrapper">
        <ul className="right hide-on-med-and-down navbar-nav sidenav-trigger"> {props.children}</ul>
      </div>
     </nav>
    </>
  );
};

export default AppNavbar;
