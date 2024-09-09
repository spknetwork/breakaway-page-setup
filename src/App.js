import { useState } from "react";
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

function App() {
  const [nav, setNav] = useState(true);
  const handleNav = () => {
    setNav((prevNav) => !prevNav);
  };
  const bodyToggle = () => {
    setNav(true)
  };
  return (
    <div className="App">
      {<Navbar  nav={nav} setNav={setNav} handleNav={handleNav} />}
      <div className="container"  onClick={()=>{ bodyToggle() }}>
        <Routes>
          <Route path="/" element={<Communities />} />
          <Route path="/about" element={<LandingPage />} />
          <Route path="/communities" element={<Communities />} />
          <Route path="/community-create" element={<CreateCommunity />} />
          <Route path="/docker-setup" element={<DockerSetup />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
