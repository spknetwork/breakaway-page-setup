import { Link } from "react-router-dom";
import "./navbar.scss";
import spkLogo from "../../assets/white-nobackground_new.png";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";


const Navbar = ({ handleNav, nav , setNav }) => {
  

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
        {/* <Link className="lists-1" to="/about">
          <li>About</li>
        </Link> */}
      </ul>
      <Link className="lists-1" to="/docker-setup">
          <button className="host-btn">Launch Your Platform</button>
        </Link>

      <div className="toggle" onClick={handleNav}>
        {!nav ? <AiOutlineClose /> : <AiOutlineMenu size={20} />}
      </div>
      <div className={!nav ? "side-nav " : "side-nav-else"}>
        <img src={spkLogo} className="logo logo-android-nav" alt="" />
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
          {/* <Link className="lists" to="/about" onClick={() => setNav(!nav)}>
            <li>About</li>
          </Link> */}
          <Link className="lists" to="/docker-setup" onClick={() => setNav(!nav)}>
            <li>Launch Your Platform</li>
          </Link>
          
        </ul>
        
      </div>
    </nav>
  );
};

export default Navbar;
