import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import { useSelector } from "react-redux";
import spkLogo from "../../assets/spk-logo-white.svg";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";


const Navbar = ({ toggleSidebar }) => {
  const [nav, setNav] = useState(true);
  const handleNav = () => {
    setNav(!nav);
  };

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
  <div className="toggle" onClick={handleNav}>
    {!nav ? <AiOutlineClose /> : <AiOutlineMenu size={20} />}
  </div>;

  return (
    <nav className="navbar">
      <img src={spkLogo} className="logos" alt="" />
      <ul className="links">
        <Link className="lists-1" to="/communities">
          <li className="">Explore </li>
        </Link>
        <Link className="lists-1" to="/community-create">
          <li className="">Create Community</li>
        </Link>
        <Link className="lists-1" to="/about">
          <li>About</li>
        </Link>
      </ul>
      <Link className="lists-1" to="/docker-setup">
          <button className="host-btn">Self Host</button>
        </Link>

      <div className="toggle" onClick={handleNav}>
        {!nav ? <AiOutlineClose /> : <AiOutlineMenu size={20} />}
      </div>
      <div className={!nav ? "side-nav bg-light" : "side-nav-else"}>
        <img src={spkLogo} className="logo" alt="" />
        <ul >
          <Link
            className="lists"
            to="/communities"
            onClick={() => setNav(!nav)}
          >
            <li className="">Explore </li>
          </Link>
          <Link
            className="lists"
            to="/community-create"
            onClick={() => setNav(!nav)}
          >
            <li className="">Create Community</li>
          </Link>
          <Link className="lists" to="/about" onClick={() => setNav(!nav)}>
            <li>About</li>
          </Link>
          <Link className="lists" to="/docker-setup" onClick={() => setNav(!nav)}>
            <li>Self Host</li>
          </Link>
          
        </ul>
        
      </div>
    </nav>
  );
};

export default Navbar;
