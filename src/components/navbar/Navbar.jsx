import React from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import spkLogo from "../../assets/spkLogo.svg";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={spkLogo} alt="SPK Logo" />
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/community-setup">Get Started</Link>
        <Link to="/communities">Explore communities</Link>
        <Link to="/community-create">Create community</Link>
        <Link to="/docker-setup">Docker Setup</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Navbar;
