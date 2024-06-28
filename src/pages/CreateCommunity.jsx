import React, { useEffect, useState } from "react";
import { copyIcon, downloadSvg } from "../icons/svg";
import keychainLogo from "../assets/keychain.png";
import {
  generatePassword,
  getPrivateKeys,
  genCommuninityName,
} from "../helpers/community";
import {
  createHiveCommunity,
  getCommunity,
  listAllSubscriptions,
} from "../api/hive";
import Loader from "../components/loader/Loader";
import { Link } from "react-router-dom";
import "./create-community.scss";

const CreateCommunity = () => {
  const [communityTitle, setCommunityTitle] = useState("");
  const [aboutCommunity, setAboutCommunity] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState(false);
  const [creatingUser, setCreatingUser] = useState("");
  const [communityName, setCommunityName] = useState("");
  const [communityPassword, setCommunityPassword] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [communityKeys, setCommunityKeys] = useState({});
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userAdminListCommunities, setUserAminListCommunities] = useState([]);

  const namePattern = "^hive-[1]\\d{4,6}$";

  const minRows = 2;
  const maxRows = 8;

  const usernamee = communityName === "" ? genCommuninityName() : communityName;

  useEffect(() => {
    setCommunityName(usernamee);
    if (step === 2) {
      checkCommunity();
      handleInfo();
    }
  }, [step, communityName]);
  async function fetchCurrentAdminUser(user) {
    console.log(user);
    let result = await listAllSubscriptions(user);
    if (result && result.length > 0) {
      setUserAminListCommunities(result);
      console.log("result");
      console.log(result);
    }
  }
  useEffect(() => {
    fetchCurrentAdminUser(creatingUser);
  }, [creatingUser]);

  const handleInfo = async () => {
    try {
      const password = await generatePassword(32);
      setCommunityPassword(password);
      const keys = getPrivateKeys(communityName, password);
      setCommunityKeys(keys);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommuntiyInfo = () => {
    if (!aboutCommunity || !communityTitle) {
      setError("Please fill in the require fields");
      return;
    }
    setStep(2);
  };

  const handleAboutChange = (event) => {
    const textareaLineHeight = 24;
    const previousRows = event.target.rows;
    event.target.rows = minRows;

    const currentRows = Math.floor(
      event.target.scrollHeight / textareaLineHeight
    );

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
    setIsLoading(true);
    if (!isDownloaded) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await createHiveCommunity(
        creatingUser,
        communityName,
        communityKeys
      );
      if (response.success === true) {
        setError("");
        setStep(4);
        setIsLoading(false);
      }
    } catch (error) {
      if (error.success === false) {
        setStep(4);
        setIsLoading(false);
        setError(error.message);
        console.log(error);
      }
    }
  };

  const checkCommunity = async () => {
    setIsLoading(true);
    const communityNameRegex = new RegExp(namePattern);

    if (communityNameRegex.test(communityName)) {
      getCommunity(communityName).then((r) => {
        if (r) {
          setError("name not available");
          setMessage("");
        } else {
          setError("");
          setMessage("Available");
          setIsDownloaded(false);
        }
      });
    } else {
      setError("name not valid");
      setMessage("");
    }
    setIsLoading(false);
  };

  const copyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");

    document.body.removeChild(textArea);
  };

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
          Memo key: Send/View encrypted messages on transfers`;

    const file = new Blob([keysToFile.replace(/\n/g, "\r\n")], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = `${communityName}_hive_keys.txt`;
    document.body.appendChild(element);
    element.click();
    setIsDownloaded(true);
  };
  const handleSelectChange = async (event) => {
    const selectedValue = event.target.value;
    console.log(selectedValue);

    setSelectedOption(selectedValue);
  };
  return (
    <div className="create-community">
      <div className="create-community-container">
        {isLoading && <Loader />}
        <div className="header">
          <h2>Create Hive Community</h2>
          <span className="">
            You can set up a platform for an existing community or create a new
            one. If the community already exists you can select it below and
            proceed to self-host, else you can create a new one.
          </span>
        </div>
        {error && <span className="error-message">{error}</span>}
        {message && step === 2 && (
          <span className="success-message">{message}</span>
        )}
        {step === 1 && (
          <>
            <div className="step-info">
              <span className="info">
                Fill in the required fields to proceed.
              </span>
            </div>
            <div className="form-wrapper">
              <input
                type="text"
                value={creatingUser}
                placeholder="Admin Hive username"
                onChange={(e) => setCreatingUser(e.target.value)}
              />
              <select
                name="communitiesList"
                id="communitiesList"
                value={selectedOption}
                onChange={handleSelectChange}
              >
                <option value="">Select existing community</option>

                {userAdminListCommunities.map((community) => (
                  <option value={community[0]}>{community[1]}</option>
                ))}
                {/* <option value="new">New</option>
                  <option value="Breakaway communities">
                    Breakaway communities
                  </option>
                  <option value="rank">Rank</option>
                  <option value="subs">Members</option> */}
              </select>
              {!selectedOption && (
                <>
                  <input
                    type="text"
                    value={communityTitle}
                    placeholder="Community title"
                    onChange={(e) => setCommunityTitle(e.target.value)}
                  />
                  <textarea
                    rows={minRows}
                    value={aboutCommunity}
                    scrollHeight
                    onChange={handleAboutChange}
                    placeholder="Community description"
                    type="text"
                  />
                  <button onClick={() => handleCommuntiyInfo()}>
                    Continue
                  </button>
                </>
              )}

              {selectedOption && (
                <span className="">
                  It seems that you want to create a platform for an existing
                  community, would you like to proceed to setting up the
                  website? <a href="">Click to self-host</a>
                </span>
              )}
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div className="step-info">
              <p className="info">Confirm the informmation below</p>
            </div>
            <div className="operation-info">
              <span>Creator: @{creatingUser}</span>
              <span>Creation fee: 3 Hive</span>
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
                    onChange={(e) => setCommunityName(e.target.value)}
                  />
                </div>
                <span className="warning">
                  Make sure you copy and save you password securely before you
                  proceed.{" "}
                </span>
                <div className="password-input">
                  <div className="community-password">
                    <span>Password:</span>
                  </div>
                  <input type="text" value={communityPassword} readOnly />
                  <span onClick={() => copyToClipboard(communityPassword)}>
                    {copyIcon}
                  </span>
                </div>
                <button
                  disabled={error}
                  style={{ cursor: error ? "not-allowed" : "pointer" }}
                  className="download-keys"
                  onClick={downloadKeys}
                >
                  Download keys{downloadSvg}
                </button>
              </>
              <>
                <button
                  style={{ cursor: !isDownloaded ? "not-allowed" : "pointer" }}
                  disabled={!isDownloaded}
                  onClick={() => setStep(3)}
                >
                  Continue
                </button>
              </>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <div className="step-info">
              <span className="info">
                Choose transaction sign/broadcast method
              </span>
            </div>
            <div className="form-wrapper">
              <>
                <input
                  type="text"
                  placeholder="Active key"
                  onChange={(e) => setCommunityTitle(e.target.value)}
                />
              </>
              <>
                <button onClick={() => handleCommuntiyInfo()}>
                  Create community
                </button>
                <h3>Create community with</h3>
                <img
                  style={{ cursor: !isDownloaded ? "not-allowed" : "pointer" }}
                  disabled={!isDownloaded}
                  className="keychain-img"
                  src={keychainLogo}
                  alt=""
                  onClick={() => {
                    createCommunityKc();
                  }}
                />
              </>
            </div>
          </>
        )}
        {step === 4 && !error && (
          <>
            <div className="community-success">
              <div className="succes-top">
                <h2>Congratulations🎉✅</h2>
                <h3>You have successfully created community {communityName}</h3>
                <hr />
                <h3>Would you like to setup it up on your own server?</h3>
              </div>
              <div>
                <Link to="/docker-setup">
                  <button>Setup self hosted website</button>
                </Link>
              </div>
            </div>
          </>
        )}
        {step === 4 && error && (
          <>
            <div className="community-success">
              <div className="succes-top">
                <h2>Failed❌</h2>
                <h3>Failed to create community</h3>
              </div>
              <div>
                <button
                  onClick={() => {
                    setStep(1);
                  }}
                >
                  Try again
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateCommunity;
