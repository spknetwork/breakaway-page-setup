import React, { useState, useEffect } from "react";
import axios from "axios";
import "./setup.scss";

const Setup = () => {
  const [hiveId, setHiveId] = useState("");
  const [theme, setTheme] = useState("");
  const [tags, setTags] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    axios.get("http://localhost:4000/check-directory")
      .then(response => {
        if (response.status === 200 && response.data.directoryExists) {
          setStep(2);
          setSuccess(true)
        }
      })
      .catch(error => {
        console.error("Error checking directory:", error);
      });

    axios.get("http://localhost:4000/check-env-file")
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
    setMessage("");
    
    axios.post("http://localhost:4000/clone-repo")
      .then(response => {
        console.log("Response from /clone-repo:", response);

        if (response.status === 200) {
          if (response.data.success) {
            setMessage(response.data.message);
            setSuccess(true)
            setStep(2);
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

        setTimeout(() => {
          setError(false);
        }, 3000);
      });
  };

  const createEnvVariables = () => {
    setMessage("");
    
    if (!hiveId || !theme || !tags) {
      setError("Please fill in all required fields.");
      
      setTimeout(() => {
        setError(false);
      }, 3000);
    } else {
      setError(false);
      axios.post("http://localhost:4000/create-variables", { hive_id: hiveId, theme, tags })
        .then(response => {
          console.log("Response from /create-variables:", response);

          if (response.status === 200) {
            if (response.data.success) {
              setMessage(response.data.message);
              setSuccess(true)
              setStep(3);
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

          setTimeout(() => {
            setError(false);
          }, 3000);
        });
    }
  };

  const runDocker = () => {
    setMessage("");
    
    axios.post("http://localhost:4000/run-docker")
      .then(response => {
        console.log("Response from /run-docker:", response);

        if (response.status === 200) {
          if (response.data.success) {
            setMessage(response.data.message);
            setSuccess(true)
            setStep(4);
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
        

        setTimeout(() => {
          setError(false);
        }, 3000);
      });
  };

  return (
    <div className="setup">
      <div className="setup-container">
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
            <span className="">Don"t have a community? <a href="">click to create</a></span>
          </>}
          {step === 2 && <button onClick={createEnvVariables}>Set Up Variables</button>}
          {step === 3 && <button onClick={runDocker}>Run Docker</button>}
        </div>
      </div>
    </div>
  );
};

export default Setup;
