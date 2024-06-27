import {  useState } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Setup from "./pages/Setup";
import Navbar from "./components/navbar/Navbar";
import CreateCommunity from "./pages/CreateCommunity";
import Login from "./pages/Login";
import Communities from "./pages/Communities";
import DockerSetup from "./pages/DockerSetup";
import "./App.scss";
import "aos/dist/aos.css";
import Profilepage from "./pages/Profilepage";
import LoaderSK from "./pages/LoaderSK";

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
      <div className="container"  onClick={()=>{ bodyToggle() ; console.log(nav)}}>
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
    </div>
  );
}

export default App;
