import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import { useSelector } from "react-redux";
import spkLogo from "../../assets/spk-logo-white.svg";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { TiHomeOutline } from "react-icons/ti";
import { SiCompilerexplorer } from "react-icons/si";
import { CgCommunity } from "react-icons/cg";
import { FaAccessibleIcon, FaTelegramPlane } from "react-icons/fa";
import { BsDiscord } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import { MdOutlineWidgets } from "react-icons/md";
import { TbMilitaryRank } from "react-icons/tb";
import { IoPeopleCircleSharp } from "react-icons/io5";


const Navbar = ({ toggleSidebar }) => {
  const [nav, setNav] = useState(true)
  const handleNav = () =>{
      setNav(!nav)
  }



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
  }, []);<div className="toggle" onClick={handleNav}>
  {!nav ? <AiOutlineClose /> : <AiOutlineMenu  size={20} /> }
  
</div>

  return (
    <nav className="navbar">
       <img src={spkLogo} className="logos" alt="" />
        <ul className="links">
            <Link className="lists-1"  to="/"><li className="">Home</li></Link>
            <Link className="lists-1" to="/communities"><li className="">Explore </li></Link>
            <Link className="lists-1" to="/community-create"><li className="">Create Community</li></Link>
            <Link className="lists-1" to="/about"><li>About</li></Link>
            
        </ul>
        <div className="btn-search-wrap">
         
         {!auth.isAuthenticated ? (<Link to="/login" onClick={()=> setNav(!nav)}><button className="btn-login bg-btn">Login</button></Link>) : ""} 

        </div>

  

        <div className="toggle" onClick={handleNav}>
            {!nav ? <AiOutlineClose /> : <AiOutlineMenu  size={20} /> }
            
        </div>
        <div className={!nav ? "side-nav bg-light" : "side-nav-else"}>
           <img src={spkLogo} className="logo" alt="" />
            <ul className=" ">
            <Link className="lists" to="/" onClick={()=> setNav(!nav)}><span><TiHomeOutline size={20} /></span><li className="">Home</li></Link>
            <Link className="lists" to="/communities" onClick={()=> setNav(!nav)}><span><SiCompilerexplorer size={20} /></span><li className="">Explore </li></Link>
            <Link className="lists" to="/community-create" onClick={()=> setNav(!nav)}><span><CgCommunity size={20} /></span><li className="">Create Community</li></Link>
            <Link className="lists" to="/about" onClick={()=> setNav(!nav)}><span><FaAccessibleIcon size={20} /></span><li>About</li></Link>
            <hr />
            </ul>
            <h1 className="break list">Breakaway communities</h1>
            <div className="breakaway-wrap">
            <div className="break-wrap list " ><span><TbMilitaryRank size={20} /></span><li>Ranking</li></div>
            <div className="break-wrap"><span><MdOutlineWidgets size={20} /></span><li>New</li></div>
            <div className="break-wrap"><span><IoPeopleCircleSharp size={20} /></span><li>Members</li></div>
             {!auth.isAuthenticated ? (<Link to="/login" onClick={()=> setNav(!nav)}><button className="btn-side">Login</button></Link>) : ""}
             <div className="social-icons">
             <BsDiscord size={20} /> <FaTelegramPlane size={20}  />
            </div>
            </div>

            
             
        </div>

    </nav>
  );
};

export default Navbar;

