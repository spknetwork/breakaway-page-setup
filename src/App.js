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
import Sidenav from "./components/dashboard-files/Sidenav";
import Navmain from "./components/dashboard-files/Navmain";
import Update from "./components/dashboard-files/Update";

function App() {
  const { userData } = useSelector((state) => state.user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const dispatch = useDispatch();

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
  
  useEffect(() => {
  }, [isSidebarOpen, shouldRenderSideBar]);

  return (
    <div className="App">
       {!shouldRenderSideBar && (<Navbar
        toggleSidebar={toggleSidebar}
        shouldRenderSideBar={shouldRenderSideBar}
      />)}
      <div className="container">
      {shouldRenderSideBar && (<div className="side-nav-wrap"> <Sidenav /></div>)}
        <div className="main-container">
        {shouldRenderSideBar && (<div className="top-wrap"><Navmain /></div>)}
          <div className="main-box-wrap">
           <div className="app-container">
            <Routes>
            <Route path="/" element={<Communities />} />
            <Route path="/about" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/communities" element={<Communities />} />
            <Route path="/community-setup" element={<PrivateRoute><Setup /></PrivateRoute>} />
            <Route path="/community-create" element={<PrivateRoute><CreateCommunity /> </PrivateRoute> } />
            <Route path="/docker-setup" element={<DockerSetup />} />
            </Routes>
           </div>
           {shouldRenderSideBar && (<div className="update-wrap">
             <Update />
            </div>)}
          </div>
          

        </div>
        
      </div>
    </div>
  );
}

export default App;
