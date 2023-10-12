import React, { useState } from "react";
import { Link } from "react-router-dom";
import keychainLogo from "../assets/keychain.png";
import "./login.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const keychainLogin = async () => {
    await authenticate();
  };

  const authenticate = async (user) =>
    new Promise((resolve, reject) => {
      if (!window.hive_keychain) {
        return reject("Keychain not found");
      }

      window.hive_keychain.requestSignBuffer(
        username,
        `${username}${Date.now()}`,
        "Active",
        async function (result) {
          if (result.error) {
            return reject(result.error);
          }
          return resolve(result);
        }
      );
    });

  return (
    <div className="login">
      <div className="login-container">
        <div className="header">
          <h2>Login</h2>
        </div>
        {error && <span className="error-message">{error}</span>}
        {message && <span className="success-message">{message}</span>}
        <>
          <div className="step-info">
            <p className="info">Fill in the required fields to proceed.</p>
          </div>
          <div className="form-wrapper">
            <>
              <input
                type="text"
                placeholder="@username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="text"
                placeholder="Your active key"
                onChange={(e) => setPrivateKey(e.target.value)}
              />
            </>
            <>
              <button>Login</button>
              <h3>Sign in with</h3>
              <img
                className="keychain-img"
                src={keychainLogo}
                alt=""
                onClick={() => keychainLogin()}
              />
              <span className="">
                Don't have an account? <a href="">click to signup</a>
              </span>
            </>
          </div>
        </>
      </div>
    </div>
  );
};

export default Login;
