import "./nav-main.scss";
import { Link } from 'react-router-dom';
import logo from "../../assets/spk-logo-white.svg"
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { GoVersions } from "react-icons/go";
import { SiCompilerexplorer } from "react-icons/si";
import { CgCommunity } from "react-icons/cg";
import { PiSlideshowBold } from "react-icons/pi";


export default function Navmain({nav, setNav}) {
  const handleNav = () =>{
    setNav(!nav)
}

  return (
    <div className="navmain-wrap">
      <img className="logo" src={logo} alt="" />
      <h3>Dashboard</h3>
      <div className="wrap-left">
        {/* <div className="icon-wrap">
         <Link to="/" className="log-out-wrap" ><BiLogOut size={22} color="white" onClick={() => dispatch(logoutAndClear())} /> <h3>Log out</h3></Link>
        </div> */}
        
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
      </div>
    </div>

      </div>
        

    </div>
  )
}
