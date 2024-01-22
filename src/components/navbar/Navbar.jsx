import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import { useSelector } from "react-redux";
import spkLogo from "../../assets/spkLogo.svg";
import { FaBars } from "react-icons/fa";

const Navbar = ({ toggleSidebar }) => {
  const { auth } = useSelector((state) => state);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    // Initial check on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={spkLogo} alt="SPK Logo" />
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/communities">
          {isSmallScreen ? "Explore" : "Explore Communities"}
        </Link>
        <Link to="/community-create">
          {" "}
          {isSmallScreen ? "Create" : "Create Community"}
        </Link>
        <Link to="/docker-setup">Breakaway</Link>
        <Link to="/about">About</Link>

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
