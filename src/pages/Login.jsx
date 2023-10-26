import React, { useState } from "react"
import { Link } from "react-router-dom";
import keychainLogo from "../assets/keychain.png"
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { setUser } from '../redux/userSlice';
import "./login.scss"
import { useNavigate } from "react-router-dom";
import { getAccount } from "../api/hive";
import api from "../api/axioisInstance";
import Loader from "../components/loader/Loader";

const Login = () => {

    const [username, setUsername] = useState("");
    const [privateKey, setPrivateKey] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate();
    const dispatch = useDispatch();

  const loginKc = async () => {
    setIsLoading(true)
    try {
        if (!username) {
          setError("some parameters missing")
          setTimeout(() => {
            setMessage("");
            setError("");
          }, 3000);
          setIsLoading(false)
        return;
        }
        if (!window.hive_keychain) {
          setError("You need to install keychain extension")
          setIsLoading(false)
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
            setIsLoading(false)
            navigate("/")
            } else {
            console.log('Login Failed, try again', 'error');
            setIsLoading(false)
            }
        }
        );
    } catch (err) {
        console.error(err.message);
        setIsLoading(false)
    }
  };
      
  const processLogin = async (username, ts, sig, community) => {
    try {
      const response = await api.get('/auth/login', {
        params: { username, ts, sig, community },
      });

      const { token, ...user } = response.data.response;

      const accountInfo = await getAccount(username);

      dispatch(login({ accessToken: token }));
      dispatch(setUser(accountInfo));

      setMessage("Login successful");
      console.log('Login Successful', 'success');

      navigate("/");
    } catch (error) {
      console.error('Login Failed: ', error);
      setError("Login Failed, please try again");
    }
  };

  const loginKey = async () => {
    try {
      const response = await api.post('/auth/login-key', { username, key: privateKey, community: "3speak" });
  
      const { token, ...user } = response.data.response;
  
      const accountInfo = await getAccount(username);
  
      dispatch(login({ accessToken: token }));
      dispatch(setUser(accountInfo));
  
      setMessage("Login successful");
      console.log('Login Successful', 'success');
  
      navigate("/community-setup");
    } catch (error) {
      console.error('Login Failed: ', error);
      setError("Login Failed, please try again");
    }
  }

  return (
    <div className="login">
      <div className="login-container">
        {isLoading && <Loader/>}
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
                    <button onClick={() => loginKey(username, privateKey)}>Login</button>
                    <h3>Sign in with</h3>
                    <img className="keychain-img" src={keychainLogo} alt="" onClick={()=> loginKc()}/>
                    <span className="">Don't have an account? <Link to="/">click to signup</Link></span>
                </>
            </div>
        </>
      </div>
    </div>
  )
}

export default Login;