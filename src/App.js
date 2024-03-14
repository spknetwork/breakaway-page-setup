import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Setup from "./pages/Setup";
import Navbar from "./components/navbar/Navbar";
import SideBar from "./components/side-bar/SideBar";
import CreateCommunity from "./pages/CreateCommunity";
import Login from "./pages/Login";
import Communities from "./pages/Communities";
import Community from "./pages/Community";
import DockerSetup from "./pages/DockerSetup";
import PrivateRoute from "./private-routes/PrivateRoutes";
import { useSelector } from "react-redux";
import { setUser } from "./redux/userSlice";
import { useDispatch } from "react-redux";
import { getAccount } from "./api/hive";
import "./App.scss";

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

  useEffect(() => {}, [isSidebarOpen, shouldRenderSideBar]);

  return (
    <div className="App">
      <Navbar
        toggleSidebar={toggleSidebar}
        shouldRenderSideBar={shouldRenderSideBar}
      />
      <div className="container">
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Communities />} />
            <Route path="/about" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/communities" element={<Communities />} />
            <Route
              path="/community/:id"
              element={
                <PrivateRoute>
                  <Community />
                </PrivateRoute>
              }
            />
            <Route path="/community-setup" element={<Setup />} />
            <Route path="/community-create" element={<CreateCommunity />} />
            <Route path="/docker-setup" element={<DockerSetup />} />
          </Routes>
        </div>
        {shouldRenderSideBar && isSidebarOpen && (
          <div className="sidebar-container">
            <SideBar />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
