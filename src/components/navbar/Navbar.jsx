import React from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import { useSelector } from "react-redux";
import spkLogo from "../../assets/spkLogo.svg";
import { FaBars } from "react-icons/fa";

const Navbar = ({ toggleSidebar }) => {
  const { auth } = useSelector((state) => state);

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={spkLogo} alt="SPK Logo" />
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/communities">Explore communities</Link>
        <Link to="/community-create">Create community</Link>
        <Link to="/docker-setup">Docker Setup</Link>
        {!auth.isAuthenticated ? (
          <Link to="/login">Login</Link>
        ) : (
          <button onClick={toggleSidebar} className="nav-links button">
            <FaBars />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
