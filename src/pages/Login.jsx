import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import { loginUser } from "../api/breakaway";

function Login({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the form from reloading the page

    try {
      const userData = { username, password };
      const response = await loginUser(userData);

      if (response?.data?.token) {
        localStorage.setItem("adminToken", response.data.token);
        setIsAuthenticated(true); 
        // navigate("/admin-panel"); 
        window.location.href = "/admin-panel"; 
      } else {
        setError("Login failed: Invalid username or password");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("An error occurred during login");
    }
  };

  return (
    <div className="login-wrap">
      <div className="login-content-wrap">
        <h1>Admin User Login</h1>
        {error && <div>{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="input-wrap">
            <input
              type="text"
              value={username}
              placeholder="Enter UserName"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <input
              type="password"
              value={password}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn-login" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
