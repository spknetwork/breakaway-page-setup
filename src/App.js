import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/navbar/Navbar";
import CreateCommunity from "./pages/CreateCommunity";
import Communities from "./pages/Communities";
import DockerSetup from "./pages/DockerSetup";
import "./App.scss";
import NotFound from "./components/not-found/NotFound";
import { SingleCommunity } from "./pages/SingleCommunity";

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
          <Route path="/community/:1d" element={<SingleCommunity />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
