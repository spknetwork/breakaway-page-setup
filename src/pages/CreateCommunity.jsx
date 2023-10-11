import React, { useState } from "react"
import { copyIcon } from "../icons/svg";
import "./create-community.scss"

const CreateCommunity = () => {

    const [hiveId, setHiveId] = useState("");
  const [theme, setTheme] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false)

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
                    <input type="text" placeholder="Community title" onChange={e => setHiveId(e.target.value)} />
                    <input type="text" placeholder="Write something about your community..." onChange={e => setTheme(e.target.value)} />
                </>
            <>
                <button onClick={()=> {
                    setStep(2)
                    setSuccess(true)
                    }}>Continue</button>
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
                        <input 
                        type="text" 
                        value={"hive-124363"}
                        readOnly
                        />
                        <span className="warning">Make sure you copy and save you password securely before you proceed. </span>
                    <div className="password-input">
                        <input 
                        type="text"
                        value={"p56rfsdfDvaliaUVudfvkKVGUYsddkyg"}
                        readOnly
                        />
                        <span>{copyIcon}</span>
                    </div>
                </>
            <>
                <button onClick={()=>{
                     setStep(3)
                     setSuccess(true)
                     }}>Create community</button>
                {step === 1 && <span className="">Already have a community? <a href="">click to login</a></span>}
            </>
            </div>
        </>}
      </div>
    </div>
  )
}

export default CreateCommunity