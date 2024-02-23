import "./nav-main.scss";
import React, { useEffect, useState } from 'react'
import {  useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import { clearUser } from "../../redux/userSlice";
import { IoSearch } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import { TbWorld } from "react-icons/tb";
import { BiLogOut } from "react-icons/bi";
import { Link } from 'react-router-dom';
import logo from "../../assets/spk-logo-white.svg"
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { GoVersions } from "react-icons/go";
import { SiCompilerexplorer } from "react-icons/si";
import { CgCommunity, CgProfile } from "react-icons/cg";
import { PiSlideshowBold } from "react-icons/pi";
import { FaWallet } from "react-icons/fa";
import { TiPointOfInterest } from "react-icons/ti";
import { MdDarkMode, MdLightMode, MdOutlineSupportAgent } from "react-icons/md";




export default function Navmain() {
  const [userProfile, setUserProfile] = useState({});
  const [nav, setNav] = useState(true)
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const logoutAndClear = () => (dispatch) => {
    dispatch(logout());
    dispatch(clearUser());
  };
  useEffect(() => {
    if (userData) {
      handleJsonMetaData();
    }
  }, [userData]);

  const handleJsonMetaData = () => {
    try {
      const jsn = JSON.parse(userData.posting_json_metadata);
      setUserProfile(jsn);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  };
  const handleNav = () =>{
    setNav(!nav)
}

  function truncateUserName(userName) {
    if (userName.length > 4) {
      return userName.substring(0, 4) + '...';
    } else {
      return userName;
    }
  }
  const userNames = userData?.name
  



  return (
    <div className="navmain-wrap">
      <img className="logo" src={logo} alt="" />
      <h3>Dashboard</h3>
      <div className="wrap-left">
        <div className="search-wrap">
          <input className="input"
          placeholder="search" />
          <IoSearch />
        </div>
        <div className="nav-profile-wrap " >
         <img src={`https://images.hive.blog/u/${userData?.name}/avatar`} alt="" />
         <h3>{truncateUserName(userNames)}</h3>
        </div >
        <div className="icon-wrap">
         <IoNotifications size={25} />
         <TbWorld size={25} />
         <Link to="/" ><BiLogOut size={25} onClick={() => dispatch(logoutAndClear())} /></Link>
        </div>
        
      </div>
      <div className="toggle" onClick={handleNav} >
        {!nav ? <AiOutlineClose /> : <AiOutlineMenu  size={20} /> }
            
      </div>

      <div className={!nav ? "side-nav bg-light" : "side-nav-else"}>
      <div>
      <div className="logo-wrap">
        <img className="" src={logo} alt="" />
      </div>
      <div className="list-wrap">
        <div className="first-wrap ">
            <h4>Dashboard</h4>
          <ul>
          <Link to="/" className="link" onClick={()=> setNav(!nav)}><div className="li-wrap"><span><GoVersions  size={20}/></span> <li >Overview</li></div></Link>
          <Link to="/" className="link" onClick={()=> setNav(!nav)}><div className="li-wrap"><span><SiCompilerexplorer size={20} /></span><li>explore</li></div></Link>
          <Link to="/community-create" className="link" onClick={()=> setNav(!nav)}><div className="li-wrap"><span><CgCommunity size={20} /></span><li>Create Community</li></div></Link>
          <Link to="/docker-setup" className="link" onClick={()=> setNav(!nav)}><div className="li-wrap"><span><PiSlideshowBold size={20}/></span><li>Breakaway</li></div></Link>
          
            
          </ul>
        </div>
        <div className=" account-wrap">
            <h4>Account</h4>
            <ul>
            <Link to="/profle-page" className="link" onClick={()=> setNav(!nav)}><div className="li-wrap"><span><CgProfile size={20} /></span><li>Profile</li></div></Link>
            <div className="li-wrap"><span><FaWallet /></span> <li>wallet</li></div>
            <div className="li-wrap"><span><TiPointOfInterest /></span><li>Breakaway Point</li></div>
            <div className="li-wrap"><span><MdOutlineSupportAgent size={20} /></span><li>Help&Support</li></div>
            <Link to="/" className="li-wraps" onClick={() => dispatch(logoutAndClear())} ><BiLogOut size={20}  /><span>Logout</span></Link>
            </ul>
        </div>
        <div className="dark-mode-wrap">
            <div className="light"><span><MdLightMode /></span>light</div>
            <div className="dark"><span><MdDarkMode /></span>Dark</div>
        </div>
      </div>
    </div>

      </div>
        

    </div>
  )
}
