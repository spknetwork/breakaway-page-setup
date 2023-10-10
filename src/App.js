import Setup from "./pages/Setup";
import Navbar from "./components/navbar/Navbar";
import "./App.scss";

function App() {
  return (
    <div className="App">
        <Navbar/>
      <div className="app-container">
        <Setup/>
      </div>
    </div>
  );
}

export default App;
