import React, { useEffect, useState } from "react"
import { copyIcon, downloadSvg, leftArrowSvg } from "../icons/svg";
import keychainLogo from "../assets/keychain.png"
import { generatePassword, getPrivateKeys, genCommuninityName } from "../helpers/community";
import { createHiveCommunity, getCommunity } from "../api/hive";
import { useSelector } from "react-redux";
import Loader from "../components/loader/Loader";
import { Link } from "react-router-dom";
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
    const [isDownloaded, setIsDownloaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const { userData } = useSelector(state => state.user)

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

  const createCommunityKc = async () => {
    setIsLoading(true)
    if(!isDownloaded) {
      setIsLoading(false)
      return;
    }

    try {
     const response = await createHiveCommunity(userData.name, communityName, communityKeys )
     console.log(response)
     if(response?.success == true) {
       setStep(4)
       setIsLoading(false)
      } else{
        setStep(4)
        setError("something went wrong")
        setIsLoading(false)
     }
    } catch (error) {
      console.log(error)
    }
  }

  const checkCommunity = async () => {
    setIsLoading(true)
    const communityNameRegex = new RegExp(namePattern);

    if (communityNameRegex.test(communityName)) {
      getCommunity(communityName).then((r) => {
        if (r) {
          setError("name not available");
          setMessage("")
        } else {
          setError("")
          setMessage("Available")
          //If community id changes, we should makle sure the new keys are downloaded
          setIsDownloaded(false)
        }
      });
    } else {
          setError("name not valid");
          setMessage("")
    }
    setIsLoading(false)
  }

  const copyToClipboard = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
  
    document.body.appendChild(textArea);
      textArea.select();
    document.execCommand('copy');
  
    document.body.removeChild(textArea);
  }

  const downloadKeys = async () => {
      setIsDownloaded(false);
      const element = document.createElement("a");
      const keysToFile = `
      Please handle your password & private keys with extra caution. 
      Your account will no longer be accessible if you loose your password. 
      We do not keep copy of it, it is confidential only you have access to it.
  
      We recomend that,
      1. You PRINT this file out and store it securly.
      2. You SHOULD NEVER use your password/owner key unless it's required.
      3. Save all your keys within a password manager, as you will need them frequently.
      4. Don't keep this file within the reach of a third party.
      
      Your Hive Account Information;
          Username: ${communityName}

          Password: ${communityPassword}

          Owner private key: ${communityKeys.owner}
  
          Active private key: ${communityKeys.active}
  
          Posting-private key: ${communityKeys.posting}
  
          Memo private key: ${communityKeys.memo}
  
  
          What your keys can be used for;
          Owner key: Change Password, Change Keys, Recover Account  
          Active key: Transfer Funds, Power up/down, Voting Witnesses/Proposals  
          Posting key: Post, Comment, Vote, Reblog, Follow, Profile 
          Memo key: Send/View encrypted messages on transfers`

      const file = new Blob([keysToFile.replace(/\n/g, "\r\n")], {
        type: "text/plain"
      });
      element.href = URL.createObjectURL(file);
      element.download = `${communityName}_hive_keys.txt`;
      document.body.appendChild(element);
      element.click();
      setIsDownloaded(true);
  };

  return (
    <div className="create-community">
      <div className="create-community-container">
        {isLoading && <Loader/>}
        <div className="header">
          <h2>Create Community - Step {step}</h2>
        </div>
        {error && <span className="error-message">{error}</span>}
        {message && step === 2 && <span className="success-message">{message}</span>}
        <div className="progress-bar">
          <div className={`progress-line ${success && step >= 1 ? "completed" : ""}`}></div>
          <div className={`progress-line ${success && step > 2 ? "completed" : ""}`}></div>
          <div className={`progress-line ${success && step > 3 ? "completed" : ""}`}></div>
          <div className={`progress-line ${success && step >= 4 && !error ? "completed" : ""}`}></div>
        </div>
        {step === 1 && <>
            <div className="step-info">
                <span className="info">Fill in the required fields to proceed.</span>
            </div>
            <div className="form-wrapper">
                <>
                    <input type="text" value={communityTitle} placeholder="Community title" onChange={e => setCommunityTitle(e.target.value)} />
                    <textarea
                        rows={minRows}
                        value={aboutCommunity}
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
                <span>Creator: @{userData.name}</span>
                <span>Creation fee: 3 HIve</span>
            </div>
            <div className="form-wrapper">
                <>
                    <div className="community-input">
                      <div className="community-name">
                        <span>Community name:</span>
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
                    <button className="download-keys" onClick={downloadKeys}>
                      Download keys{downloadSvg}
                    </button>
                </>
            <>
                <button 
                style={{cursor: !isDownloaded ? "not-allowed" : "pointer"}} 
                disabled={!isDownloaded} 
                onClick={()=> setStep(3)}
                >
                  Continue
                </button>
            </>
            </div>
        </>}
        {step === 3 && <>
            <div className="step-info">
                <span className="info">Choose sign method</span>
            </div>
            <div className="form-wrapper">
                <>
                    <input type="text" placeholder="Active key" onChange={e => setCommunityTitle(e.target.value)} />
                </>
            <>
                <button
                  onClick={()=> handleCommuntiyInfo()}
                >
                  Create community
                </button>
                <h3>Create community with</h3>
                <img 
                style={{cursor: !isDownloaded ? "not-allowed" : "pointer"}} 
                disabled={!isDownloaded} 
                className="keychain-img" 
                src={keychainLogo} alt="" 
                onClick={()=> createCommunityKc()}
                />
            </>
            </div>
        </>}
        {step === 4 && !error && <>
        <div className="community-success">
          <div className="succes-top">
            <h2>Congratulations🎉✅</h2>
            <h3>You have successfully created community {communityName}</h3>
          </div>
          <div>
            <Link to="/community-setup">
              <button>Setup your breakaway community </button>
            </Link>
          </div>
        </div>
        </>} 
        {step === 4 && error && <>
        <div className="community-success">
          <div className="succes-top">
            <h2>Failed❌</h2>
            <h3>Failed to create community</h3>
          </div>
          <div>
              <button onClick={()=> {
                setStep(1);
                setSuccess(false);
                }}>Try again</button>
          </div>
        </div>
        </>}
      </div>
    </div>
  )
}

export default CreateCommunity;