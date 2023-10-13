import React, { useEffect, useState } from "react"
import { copyIcon } from "../icons/svg";
import { generatePassword, getPrivateKeys, genCommuninityName } from "../helpers/community";
import { createHiveCommunity, getCommunity } from "../api/hive";
import "./create-community.scss"

const CreateCommunity = () => {

    const [communityTitle, setCommunityTitle] = useState("");
    const [aboutCommunity, setAboutCommunity] = useState("");
    const [message, setMessage] = useState("");
    const [step, setStep] = useState(1);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [communityName, setCommunityName] = useState("")
    const [communityPassword, setCommunityPassword] = useState("");
    const [communityKeys, setCommunityKeys] = useState({});

    const namePattern = "^hive-[1]\\d{4,6}$";

    const minRows = 2;
    const maxRows = 8;

  useEffect(()=> {
    const usernamee = genCommuninityName();
    setCommunityName(usernamee)
    handleInfo();
  },[]);
  
  useEffect(()=> {
    if(step === 2) {
      checkCommunity()
    }
  },[step, communityName]);

  const handleInfo = () =>{
    generatePassword(32)
        .then(password => {
            setCommunityPassword(password);
            const keys = getPrivateKeys(communityName, password)
            setCommunityKeys(keys)
            console.log(keys)
        })
        .catch(error => {
            console.error(error);
    });
  };

  const handleCommuntiyInfo = () => {
    console.log(error)
    console.log(aboutCommunity)
    if(!aboutCommunity || !communityTitle) {
      setError("Please fill in the require fields")
      return;
    }

    setStep(2)
    setSuccess(true)
  }

  const handleAboutChange = (event) => {
    const textareaLineHeight = 24;
    const previousRows = event.target.rows;
    event.target.rows = minRows;
    console.log(event.target.rows)
  
    const currentRows = Math.floor(event.target.scrollHeight / textareaLineHeight);
  
    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }
  
    if (currentRows >= maxRows) {
      event.target.rows = maxRows;
      event.target.scrollTop = event.target.scrollHeight;
    }
  
    setAboutCommunity(event.target.value);
  };

  const createCommunity = async () => {
    if(error) {
      return;
    }
    await createHiveCommunity("adesojisouljay", communityName, communityKeys )
  }

  const checkCommunity = async () => {
    const communityNameRegex = new RegExp(namePattern);

    if (communityNameRegex.test(communityName)) {
      getCommunity(communityName).then((r) => {
        if (r) {
          setError("name not available");
          setMessage("")
        } else {
          setError("")
          setMessage("Available")
        }
      });
    } else {
          setError("name not valid");
          setMessage("")
    }
  }

  const copyToClipboard = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
  
    document.body.appendChild(textArea);
      textArea.select();
    document.execCommand('copy');
  
    document.body.removeChild(textArea);
  }

  return (
    <div className="create-community">
      <div className="create-community-container">
        <div className="header">
          <h2>Create Community - Step {step}</h2>
        </div>
        {error && <span className="error-message">{error}</span>}
        {message && <span className="success-message">{message}</span>}
        <div className="progress-bar">
          <div className={`progress-line ${success && step >= 1 ? "completed" : ""}`}></div>
          <div className={`progress-line ${success && step > 2 ? "completed" : ""}`}></div>
          <div className={`progress-line ${success && step > 3 ? "completed" : ""}`}></div>
          <div className={`progress-line ${success && step >= 4 ? "completed" : ""}`}></div>
        </div>
        {step === 1 && <>
            <div className="step-info">
                <span className="info">Fill in the required fields to proceed.</span>
            </div>
            <div className="form-wrapper">
                <>
                    <input type="text" placeholder="Community title" onChange={e => setCommunityTitle(e.target.value)} />
                    <textarea
                        rows={minRows}
                        scrollHeight
                        onChange={handleAboutChange}
                        placeholder="Write something about your community..." 
                        type="text" 
                    />
                </>
            <>
                <button
                  onClick={()=> handleCommuntiyInfo()}>Continue</button>
                <span className="">Already have a community? <a href="">click to login</a></span>
            </>
            </div>
        </>}
        {step === 2 && <>
            <div className="step-info">
                <p className="info">Confirm the informmation below</p>
            </div>
            <div className="operation-info">
                <span>Creator: @codetester</span>
                <span>Creation fee: 3 HIve</span>
            </div>
            <div className="form-wrapper">
                <>
                    <div className="community-input">
                      <div className="community-name">
                        <soan>Community name:</soan>
                      </div>
                        <input 
                        type="text" 
                        value={communityName}
                        onChange={(e)=> setCommunityName(e.target.value)}
                        />
                    </div>
                        <span className="warning">Make sure you copy and save you password securely before you proceed. </span>
                    <div className="password-input">
                      <div className="community-password">
                        <span>Password:</span>
                      </div>
                        <input 
                        type="text"
                        value={communityPassword}
                        readOnly
                        />
                        <span onClick={() => copyToClipboard(communityPassword)}>{copyIcon}</span>
                    </div>
                </>
            <>
                <button onClick={()=> createCommunity()}>Create community</button>
                {step === 1 && <span className="">Already have a community? <a href="">click to login</a></span>}
            </>
            </div>
        </>}
      </div>
    </div>
  )
}

export default CreateCommunity;