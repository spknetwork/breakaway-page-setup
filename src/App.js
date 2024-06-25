import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Setup from "./pages/Setup";
import Navbar from "./components/navbar/Navbar";
import SideBar from "./components/side-bar/SideBar";
import CreateCommunity from "./pages/CreateCommunity";
import Login from "./pages/Login";
import Communities from "./pages/Communities";
import DockerSetup from "./pages/DockerSetup";
import PrivateRoute from "./private-routes/PrivateRoutes";
import { useSelector } from "react-redux";
import { setUser } from "./redux/userSlice";
import { useDispatch } from "react-redux";
import { getAccount } from "./api/hive";
import "./App.scss";
import Aos from 'aos'
import "aos/dist/aos.css"
import Sidenav from "./components/dashboard-files/Sidenav";
import Navmain from "./components/dashboard-files/Navmain";
import Update from "./components/dashboard-files/Update";
import Profilepage from "./pages/Profilepage";
import LoaderSK from "./pages/LoaderSK";

function App() {
  const { userData } = useSelector((state) => state.user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [nav, setNav] = useState(true)


  const handleMainBoxClick = () => {
    console.log("div is clicked");
    setNav(true);
  };
  // useEffect(() => {
    // const mainBoxWrap = document.querySelector(".main-box-wrap");

    

    // if (mainBoxWrap) {
    //   mainBoxWrap.addEventListener("click", handleMainBoxClick);
    // }

    // // Cleanup event listener on component unmount or dependency change
    // return () => {
    //   if (mainBoxWrap) {
    //     mainBoxWrap.removeEventListener("click", handleMainBoxClick);
    //   }
    // };
  // }, [nav]);



  const dispatch = useDispatch();

  useEffect(()=>{
    Aos.init( {duration:1000});
  },[])

  useEffect(() => {
    getUserAccount();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const getUserAccount = async () => {
    try {
      const accountInfo = await getAccount(userData?.name);
      dispatch(setUser(accountInfo));
    } catch (error) {
      console.log(error);
    }
  };

  const shouldRenderSideBar = userData;

  useEffect(() => {}, [isSidebarOpen, shouldRenderSideBar]);

  

  return (
    <div className="App">
      {!shouldRenderSideBar && (
        <Navbar
          toggleSidebar={toggleSidebar}
          shouldRenderSideBar={shouldRenderSideBar}
        />
      )}
      <div className="container">
        {shouldRenderSideBar && (
          <div className="side-nav-wrap">
            <Sidenav />
          </div>
        )}
        <div className="main-container" >
          {shouldRenderSideBar && (
            <div className="top-wrap">
              <Navmain nav={nav} setNav={setNav}/>
            </div>
          )}
          <div className="main-box-wrap" onClick={()=>{console.log(nav); handleMainBoxClick() } }>
            <div className="app-container" >
              <Routes>
                <Route path="/" element={<Communities />} />
                <Route path="/about" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/communities" element={<Communities />} />
                <Route path="/community-setup" element={<Setup />} />
                <Route path="/community-create" element={<CreateCommunity />} />
                <Route path="/docker-setup" element={<DockerSetup />} />
                <Route path="/profle-page" element={<Profilepage />} />
                <Route path="/loader" element={<LoaderSK />} />
              </Routes>
            </div>
            {shouldRenderSideBar && (
              <div className="update-wrap">
                <Update />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
 