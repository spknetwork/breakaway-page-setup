import React, { useState } from "react"
import { Link } from "react-router-dom";
import keychainLogo from "../assets/keychain.png"
import "./login.scss"

const Login = () => {

    const [username, setUsername] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

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
                    <input type="text" placeholder="@username" onChange={e => setUsername(e.target.value)} />
                    <input type="text" placeholder="Your active key" onChange={e => setPrivateKey(e.target.value)} />
                </>
                <>
                    <button>Login</button>
                    <h3>Sign in with</h3>
                    <img className="keychain-img" src={keychainLogo} alt="" onClick={()=> console.log("keychain.. login")}/>
                    <span className="">Don't have an account? <a href="">click to signup</a></span>
                </>
            </div>
        </>
      </div>
    </div>
  )
}

export default Login;