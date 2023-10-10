import React from "react";
import "./navbar.scss";
import spkLogo from "../../assets/spkLogo.svg";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-wrapper">
        <div className="logo">
          <img src={spkLogo} alt="SPK Logo" />
        </div>
        <div className="nav-links">
          <a href="#get-started">Get Started</a>
          <a href="#community">Explore communities</a>
          <a href="#community">Create community</a>
          <a href="#community">Login</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
