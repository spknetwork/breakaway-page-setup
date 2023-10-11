import { BrowserRouter, Route, Routes } from "react-router-dom"
import Setup from "./pages/Setup";
import Navbar from "./components/navbar/Navbar";
import CreateCommunity from "./pages/CreateCommunity";
import Login from "./pages/Login";
import Communities from "./pages/Communities";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
      <div className="app-container">
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/communities" element={<Communities/>} />
        <Route path="/community-setup" element={<Setup/>} />
        <Route path="/community-create" element={<CreateCommunity/>} />
      </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
