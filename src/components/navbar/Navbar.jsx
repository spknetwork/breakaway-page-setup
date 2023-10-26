import React from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import { useSelector, useDispatch } from "react-redux";
import spkLogo from "../../assets/spkLogo.svg";
import { logout } from "../../redux/authSlice";
import { clearUser } from "../../redux/userSlice";

const Navbar = () => {
  const { user , auth } = useSelector(state => state);
  const dispatch = useDispatch();

  const logoutAndClear = () => (dispatch) => {
    dispatch(logout());
    dispatch(clearUser());
  };
  
  return (
    <div className="navbar">
        <div className="logo">
            <Link to="/">
                <img src={spkLogo} alt="SPK Logo" />
            </Link>
        </div>
        <div className="nav-links">
          {/* <Link to="/community-setup">Get Started</Link> */}
          <Link to="/communities">Explore communities</Link>
          <Link to="/community-create">Create community</Link>
          <Link to="/docker-setup">Docker Setup</Link>
          {!auth.isAuthenticated ? <Link to="/login">Login</Link> : 
          <span onClick={() =>  dispatch(logoutAndClear())}>
            <Link to="/">Logout</Link>
          </span>}
        </div>
    </div>
  );
};

export default Navbar;
