import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Setup from './pages/Setup';
import Navbar from './components/navbar/Navbar';
import SideBar from './components/side-bar/SideBar';
import CreateCommunity from './pages/CreateCommunity';
import Login from './pages/Login';
import Communities from './pages/Communities';
import Community from './pages/Community';
import PrivateRoute from './private-routes/PrivateRoutes';
import { useSelector } from 'react-redux';
import "./App.scss"

function App() {
  const { userData } = useSelector(state => state.user);
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <div className="app-container">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/communities"
                element={
                  <PrivateRoute>
                    <Communities />
                  </PrivateRoute>
                }
              />
              <Route
                path="/community/:id"
                element={
                  <PrivateRoute>
                    <Community />
                  </PrivateRoute>
                }
              />
              <Route
                path="/community-setup"
                element={
                  <PrivateRoute>
                    <Setup />
                  </PrivateRoute>
                }
              />
              <Route
                path="/community-create"
                element={
                  <PrivateRoute>
                    <CreateCommunity />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
           {userData && <div className="sidebar-container">
            <SideBar/>
          </div>}
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
