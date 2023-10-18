import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../api/axioisInstance";
import Loader from "../components/loader/Loader";
import "./setup.scss";

const Setup = () => {
  const [hiveId, setHiveId] = useState("");
  const [theme, setTheme] = useState("");
  const [tags, setTags] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  

  const user = useSelector(state => state)
  
  useEffect(() => {
    api.get("/check-directory")
      .then(response => {
        if (response.status === 200 && response.data.directoryExists) {
          setStep(2);
          setSuccess(true)
        }
      })
      .catch(error => {
        console.error("Error checking directory:", error);
      });

    api.get("/check-env-file")
      .then(response => {
        if (response.status === 200 && response.data.envFileExists) {
          setStep(3);
          setSuccess(true)
        }
      })
      .catch(error => {
        console.error("Error checking .env.local file:", error);
      });
  }, []);

  const cloneReposiory = () => {
    setIsLoading(true)
    setMessage("");
    
    api.post("/clone-repo")
      .then(response => {

        if (response.status === 200) {
          if (response.data.success) {
            setMessage(response.data.message);
            setSuccess(true)
            setStep(2);
            setIsLoading(false)
          } else {
            setError("Error: " + response.data.message);
          }
        } else {
          
          setError("Error: Unexpected status code " + response.status);
        }

        setTimeout(() => {
          setMessage("");
          setError(false);
        }, 3000);
      })
      .catch(error => {
        console.error("Error in /clone-repo request:", error);
        setError("Error: " + error.message);
        setIsLoading(false)

        setTimeout(() => {
          setError(false);
        }, 3000);
      });
  };

  const createEnvVariables = () => {
    setMessage("");
    setIsLoading(true)
    
    if (!hiveId || !theme || !tags) {
      setError("Please fill in all required fields.");
      
      setTimeout(() => {
        setError(false);
      }, 3000);
    } else {
      setError(false);
      setIsLoading(true)
      api.post("/create-variables", { hive_id: hiveId, theme, tags })
        .then(response => {

          if (response.status === 200) {
            if (response.data.success) {
              setMessage(response.data.message);
              setSuccess(true)
              setStep(3);
              setIsLoading(false)
            } else {
              setError("Error: " + response.data.message);
            }
          } else {
            
            setError("Error: Unexpected status code " + response.status);
          }

          setTimeout(() => {
            setMessage("");
          }, 3000);
        })
        .catch(error => {
          console.error("Error in /create-variables request:", error);
          setError(false);
          setError("Error: " + error?.response?.data.message);
          setIsLoading(false)
          setTimeout(() => {
            setError(false);
          }, 3000);
        });
    }
  };

  const runDocker = () => {
    setMessage("");
    setIsLoading(true)
    
    api.post("/run-docker")
      .then(response => {
        if (response.status === 200) {
          if (response.data.success) {
            setMessage(response.data.message);
            setSuccess(true)
            setStep(4);
            setIsLoading(false)
          } else {
            setError("Error: " + response.data.message);
          }
        } else {
          setError("Error: Unexpected status code " + response.status);
        }

        setTimeout(() => {
          setMessage("");
          setError(false);
        }, 3000);
      })
      .catch(error => {
        console.error("Error in /run-docker request:", error);
        setError("Error: " + error.message);
        setIsLoading(false)

        setTimeout(() => {
          setError(false);
        }, 3000);
      });
  };

  return (
    <div className="setup">
      <div className="setup-container">
        {isLoading && <Loader/>}
        <div className="header">
          <h1>Project Setup - Step {step}</h1>
        </div>
        {error && <span className="error-message">{error}</span>}
        {message && <span className="success-message">{message}</span>}
        <div className="progress-bar">
          <div className={`progress-line ${success && step >= 1 ? "completed" : ""}`}></div>
          <div className={`progress-line ${success && step > 2 ? "completed" : ""}`}></div>
          <div className={`progress-line ${success && step > 3 ? "completed" : ""}`}></div>
          <div className={`progress-line ${success && step >= 4 ? "completed" : ""}`}></div>
        </div>
        <div className="step-info">
          {step === 1 && <p className="info">Click "Clone repository" to clone the GitHub repository.</p>}
          {step === 2 && <p className="info">Fill in the required fields and click "Set up variables" to proceed.</p>}
          {step === 3 && <>
            <p className="info">Click on "Run Docker" to run Docker command, This may take a moment.</p>
            {<p>Running Docker, Please wait... </p>}
          </>
          }
        </div>
        <div className="form-wrapper">
          {step === 2 && (
            <>
              <input type="text" placeholder="Hive Community ID" onChange={e => setHiveId(e.target.value)} />
              <input type="text" placeholder="Theme (day or night)" onChange={e => setTheme(e.target.value)} />
              <input type="text" placeholder="Tags" onChange={e => setTags(e.target.value)} />
            </>
          )}
          {step === 1 && <>
            <button onClick={cloneReposiory}>Clone Repository</button>
            <span className="">Don"t have a community? <Link to="/community-create">click to create</Link></span>
          </>}
          {step === 2 && <button onClick={createEnvVariables}>Set Up Variables</button>}
          {step === 3 && <button onClick={runDocker}>Run Docker</button>}
        </div>
      </div>
    </div>
  );
};

export default Setup;
