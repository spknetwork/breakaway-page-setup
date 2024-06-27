import React from "react";
import "./sidenav.scss";
import Logo  from "../../assets/spk-logo-white.svg";
import { GoVersions } from "react-icons/go";
import { SiCompilerexplorer } from "react-icons/si";
import { CgCommunity } from "react-icons/cg";
import { PiSlideshowBold } from "react-icons/pi";
import { Link } from "react-router-dom";

export default function Sidenav() {
  return (
    <div className="sidenavmian-wrap">
      <div className="logo-wrap">
        <img className="" src={Logo} alt="" />
      </div>
      <div className="list-wrap">
        <div className="first-wrap ">
            {/* <h4>Dashboard</h4> */}
          <ul>
          <Link to="/" className="link"><div className="li-wrap"><span><GoVersions  size={20}/></span> <li >Overview</li></div></Link>
          <Link to="/" className="link"><div className="li-wrap"><span><SiCompilerexplorer size={20} /></span><li>explore</li></div></Link>
          <Link to="/community-create" className="link"><div className="li-wrap"><span><CgCommunity size={20} /></span><li>Self Host</li></div></Link>
          <Link to="/docker-setup" className="link"><div className="li-wrap"><span><PiSlideshowBold size={20}/></span><li>Breakaway</li></div></Link>
          
            
          </ul>
        </div>
        {/* <div className=" account-wrap">
            <h4>Account</h4>
            <ul>
            <Link to="/profle-page" className="link"><div className="li-wrap"><span><CgProfile size={20} /></span><li>Profile</li></div></Link>
            <div className="li-wrap"><span><FaWallet /></span> <li>wallet</li></div>
            <div className="li-wrap"><span><TiPointOfInterest /></span><li>Breakaway Point</li></div>
            <div className="li-wrap"><span><MdOutlineSupportAgent size={20} /></span><li>Help&Support</li></div>
            </ul>
        </div> */}
        {/* <div className="dark-mode-wrap">
            <div className="light"><span><MdLightMode /></span>light</div>
            <div className="dark"><span><MdDarkMode /></span>Dark</div>
        </div> */}
      </div>
    </div>
  );
}
