import React from "react";
import logo from "../assets/ranch-digital-logo-1.png";

const AppNavbar = (props) => {
  const navFunction = () => {
    const x = document.getElementById("navigation-bar");
    if (x.className === "navbar") {
      x.className += " responsive";
    } else {
      x.className = "navbar"
    }
  }

  return (
    <>
     <nav className="navbar" id="navigation-bar">
      <div className="nav-wrapper">
        <ul className="right hide-on-med-and-down navbar-nav sidenav-trigger"> {props.children}
        </ul>
      </div>
     </nav>
    </>
  );
};

export default AppNavbar;
