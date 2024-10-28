import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/navbar/Navbar";
import CreateCommunity from "./pages/CreateCommunity";
import Communities from "./pages/Communities";
import DockerSetup from "./pages/DockerSetup";
import "./App.scss";
import NotFound from "./components/not-found/NotFound";
import AdminPanel from "./pages/AdminPanel";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import PrivateRoute from "./pages/PrivateRoute";
import { UpdateCommunity } from "./pages/UpdateCommunity";

function App() {
  const [nav, setNav] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const adminToken = localStorage.getItem('adminToken');
  useEffect(()=>{
    const adminToken = localStorage.getItem('adminToken');
    if(adminToken){
      setIsAuthenticated(true)
    }
  },[adminToken])

  const handleNav = () => {
    setNav((prevNav) => !prevNav);
  };
  const bodyToggle = () => {
    setNav(true)
  };
  return (
    <div className="App">
      <Navbar  nav={nav} setNav={setNav} handleNav={handleNav} />
      <div className="container"  onClick={()=>{ bodyToggle() }}>
        <Routes>
          <Route path="/" element={<Communities />} />
          <Route path="/about" element={<LandingPage />} />
          <Route path="/communities" element={<Communities />} />
          <Route path="/community-create" element={<CreateCommunity />} />
          <Route path="/docker-setup" element={<DockerSetup />} />
          <Route path="/Update-Community" element={<UpdateCommunity />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          {/* <Route path="/admin-panel" element={<PrivateRoute isAuthenticated={isAuthenticated} />}> */}
          {adminToken &&<Route path="/admin-panel" element={ <AdminPanel isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />}
        {/* </Route> */}
        </Routes>
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
