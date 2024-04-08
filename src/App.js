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
import Profilepage from "./pages/Profilepage";

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
      {!shouldRenderSideBar && (
        <Navbar
          toggleSidebar={toggleSidebar}
          shouldRenderSideBar={shouldRenderSideBar}
        />
      )}
      <div className="container">
        {shouldRenderSideBar && (
          <div className="side-nav-wrap">
            {" "}
            <Sidenav />
          </div>
        )}
        <div className="main-container">
          {shouldRenderSideBar && (
            <div className="top-wrap">
              <Navmain />
            </div>
          )}
          <div className="main-box-wrap">
            <div className="app-container">
              <Routes>
                <Route path="/" element={<Communities />} />
                <Route path="/about" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/communities" element={<Communities />} />
                <Route path="/community-setup" element={<Setup />} />
                <Route path="/community-create" element={<CreateCommunity />} />
                <Route path="/docker-setup" element={<DockerSetup />} />
                <Route path="/profle-page" element={<Profilepage />} />
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
// *{
//   list-style: circle !important;
// }
// @import "../mixins.scss";
// .docker-main-wrap{
//   padding: 10px 30px;
//   @include respond(phone) {
//       padding: 0%;
//   }
// }
// .hero-text-wrap{
//   display: flex;
//   justify-content: center;
//   flex-direction: column;
//   text-align: center;
//   h1{
//       margin-bottom: 10px;
//   }
//   p{
//       color: grey;
//       margin-bottom: 30px;

//   }

// }
// .header{
//   text-align: center;
//   font-size: 18px;
//   color: rgb(94, 94, 195);
//   margin-bottom: 20px;
// }
// .success-message{
//   text-align: center;
//   color: green;
// }
// .docker-wrap{
//   display: flex;
//   gap: 15px;
//   margin-bottom: 20px;
//   @include respond(phone) {
//       display: flex;
//       flex-direction: column;

//     }
// }
// .forms-wrapper{
//   width: 50%;
//   @include respond(phone) {
//       width: 100%;
//   }
// }

// .instruction-Wrap{
//   display: flex;
//   gap: 10px;
//   margin-bottom: 15px;
//   @include respond(phone) {
//       display: flex;
//       flex-direction: column;

//     }
// }
// .input-with-tooltip{
//   margin-bottom: 10px;
//   input{
//     padding: 10px 20px;
//     border-radius: 7px;
//     width: 100% ;
//     outline: none;
//   }
// }
// .top-text-wrap{
//   display: flex;
//   gap: 4px;
//   margin-bottom:10px;
//   font-size: 16px;
//   color: grey;
//   .tooltiptext{
//       font-size: 4px;
//       color: grey;
//   }
// }
// .add-btn {
//   padding: 10px 20px;
//       cursor: pointer;
//       color: #007bff;
//       border: none;
//       background-color: #007bff;
//       color: white;
//       border-radius: 5px;
//       font-weight: bold;
//       font-size: 16px;
//       transition: background-color 0.3s ease;

//       &:hover {
//         background-color: rgba(0, 123, 255, 0.8);
//       }
// }

// .doc-box{
//   width: 50%;
//   @include respond(phone) {
//       width: 100%;
//   }
// }
// .download-wrap{
//   margin: 10px 0px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }
// .step-info{
//   display: flex;
//   justify-content: space-between;
// }
// .copy-button, .download-button {
//       padding: 10px 20px;
//       cursor: pointer;
//       color: #007bff;
//       border: none;
//       background-color: #007bff;
//       color: white;
//       border-radius: 5px;
//       font-weight: bold;
//       font-size: 16px;
//       transition: background-color 0.3s ease;

//       &:hover {
//         background-color: rgba(0, 123, 255, 0.8);
//       }

// }
// .docker-compose-config {
//   margin-top: 20px;
//   border: 5px solid #ccc;
//   padding: 10px;
//   background-color: #f9f9f9;
//   border-radius: 5px;

//   pre {
//     font-size: 14px;
//     white-space: pre-wrap;
//     word-wrap: break-word;
//     max-height: 300px;
//     overflow-y: auto;
//     border: none;
//     border-radius: 5px;
//   }
// }

// .instruction-Wrap{
//   padding: 20px 10px;
//   border: 1px solid grey;
//   border-radius: 10px;
// }
// .instruct{
//   h2{
//       margin-bottom: 3px;
//   }
//   p{
//       margin-bottom: 3px;
//   }
//   ul{

//       color: grey;
//       li{
//           margin-bottom: 3px;

//       }
//   }
//   h4{
//       color: #fff;
//       margin-bottom: 4px;
//   }
// }
// .doc-compose{
//   width: 50%;
//   @include respond(phone) {
//       width: 100%;
//   }
// }
