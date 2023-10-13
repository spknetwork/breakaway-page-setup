import React, { useState } from "react"
import { Link } from "react-router-dom";
import keychainLogo from "../assets/keychain.png"
import "./login.scss"
import axios from "axios"
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [username, setUsername] = useState("");
    const [privateKey, setPrivateKey] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);

    const navigate = useNavigate()

  const loginKc = async () => {
    console.log(username)
    try {
        if (!username) {
          setError("some parameters missing")
          setTimeout(() => {
            setMessage("");
            setError("");
          }, 3000);
        return;
        }
        if (!window.hive_keychain) {
          setError("You need to install keychain extension")
        return;
        };
        const ts = Date.now();
  
        window.hive_keychain.requestSignBuffer(
        username,
        `${username}${ts}`,
        'Posting',
        async (r) => {
            if (r.success) {
              const sig = r.result;
              await (processLogin(username, ts, sig, "spk-network"));
              setMessage("loging successfull");
            console.log('Login Successfull', 'success');

            navigate("/community-setup")
            } else {
            console.log('Login Failed, try again', 'error');
            }
        }
        );
    } catch (err) {
        console.error(err.message);
    }
  };
      
  const processLogin = async (username, ts, sig, community) => {
  
    try {
        const data = await axios.get('http://localhost:4000/auth/login', {
        params: { username, ts, sig, community },
        });
        console.log("sig", sig)
        console.log("ts", ts)
        console.log("data", data)
    } catch (err) {
        console.error(err.message);
    }
  };

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
                    <img className="keychain-img" src={keychainLogo} alt="" onClick={()=> loginKc()}/>
                    <span className="">Don't have an account? <a href="">click to signup</a></span>
                </>
            </div>
        </>
      </div>
    </div>
  )
}

export default Login;