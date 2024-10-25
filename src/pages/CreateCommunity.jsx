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
  setUserRole,
  updateCommunity,
  createCommunityWithCredit
} from "../api/hive";
import Loader from "../components/loader/Loader";
import { Link } from "react-router-dom";
import { RoleModal } from "../components/user-role-modal/Modal";
import "./create-community.scss";

const CreateCommunity = () => {
  const [communityTitle, setCommunityTitle] = useState("");
  const [aboutCommunity, setAboutCommunity] = useState("");
  const [communityDescription, setCommunityDescription] = useState("");
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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [communityMod, setCommunityMod] = useState("")
  const [role, setRole] = useState("admin")
  const [profilePictureUrl, setProfilePictureUrl] = useState("")
  const [coverImageUrl, setCoverImageUrl]= useState("")


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

  const fetchCurrentAdminUser = async (user) => {
    let result = await listAllSubscriptions(user);
    if (result && result.length > 0) {
      setUserAminListCommunities(result);
    }
  }

  useEffect(() => {
    //this is causng uneccessary logs, should be checked and handled properly
    // fetchCurrentAdminUser(creatingUser);
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

  const handleDescriptionChange = (event) => {
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

    setCommunityDescription(event.target.value);
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
        communityKeys,
        profilePictureUrl,
        coverImageUrl
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

  const createCommunityWithCreditKc = async () => {
    setIsLoading(true);
    if (!isDownloaded) {
      setIsLoading(false);
      return;
    }
    try {
      const response = await createCommunityWithCredit(
        communityName,
        communityKeys,
        creatingUser,
        profilePictureUrl,
        coverImageUrl
      );
      console.log(response)
      if (response.success === true) {
       const updateComm = await updateCommunityInfo();
        console.log(updateComm)
       if (updateComm.success === true) {
        console.log("true", updateComm)
         await updateUserRole()
       }
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

  const updateCommunityInfo = async () => {
    try {
      const res = await updateCommunity(communityName, communityName, {
        title: communityTitle,
        about: aboutCommunity,
        lang: "en",
        description: communityDescription,
        flag_text: "",
        is_nsfw: false
      });
      console.log("Transaction Confirmation:", res);
      return res;
    } catch (error) {
      console.error("Error updating community:", error);
      throw error;
    }
  };
  
  const updateUserRole = async () => {

     setUserRole(
      communityName, 
      communityName, 
      communityMod ? 
      communityMod : creatingUser, 
      role).then(
      transactionConfirmation => {
      console.log(transactionConfirmation);
    }).catch(error => {
      console.error(error);
    });
  }

  const openModal = () => setModalIsOpen(true);

  const closeModal = () => setModalIsOpen(false);

  return (
    <div className="create-community">
      <div className="create-community-container">
        {isLoading && <Loader />}
        <div className="header">
          <h2>Create Hive Community</h2>
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
              {!selectedOption && (
                <>
                  <input
                    type="text"
                    value={communityTitle}
                    placeholder="Community title"
                    onChange={(e) => setCommunityTitle(e.target.value)}
                  />
                  <input
                    type="text"
                    value={aboutCommunity}
                    placeholder="About community"
                    onChange={(e) => setAboutCommunity(e.target.value)}
                  />
                  <input
                    type="text"
                    value={profilePictureUrl}
                    placeholder="Profile Url"
                    onChange={(e) => setProfilePictureUrl(e.target.value)}
                  />
                  <input
                    type="text"
                    value={coverImageUrl}
                    placeholder="Background Url"
                    onChange={(e) => setCoverImageUrl(e.target.value)}
                  />
                  <textarea
                    rows={minRows}
                    value={communityDescription}
                    scrollHeight
                    onChange={handleDescriptionChange}
                    placeholder="Community description"
                    type="text"
                  />
                  <button onClick={() => handleCommuntiyInfo()}>
                    Continue
                  </button>
                </>
              )}
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div className="step-info">
              <p className="info">Confirm the informmation below</p>
            </div>

            <div className="form-wrapper">
              <>
                <div className="community-input-add">
                  <div className="operation-info">
                    <span>Creator: @{creatingUser}</span>
                    <span>Creation fee: 3 Hive/ One account token</span>
                  </div>
                  <div className="community-input community-input-addn">
                    <div className="community-name">
                      <span>Community Id:</span>
                    </div>
                    <input
                      type="text"
                      value={communityName}
                      onChange={(e) => setCommunityName(e.target.value)}
                    />
                  </div>
                </div>
                <span className="warnings">
                Copy save your password securely before proceeding.{" "}
                </span>
                <div className="password-sec-wrap">
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
                </div>
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
            </div>
            <div className="form-wrapper">
              <button className="btn-create" onClick={createCommunityKc}>
              <img
                  className="keychain-img"
                  src={keychainLogo}
                  alt="kychain"
                />
                With 3hive
              </button>
              <div>-------- OR --------</div>
              <button className="btn-create" onClick={createCommunityWithCreditKc}>
              <img
                  className="keychain-img"
                  src={keychainLogo}
                  alt="kychain"
                />
                With account token
              </button>
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
                <button onClick={openModal}>Set user role</button>
                <hr />
              </div>
              <div>
                <Link to="/docker-setup">
                    Setup self hosted website
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
      <RoleModal
      isOpen={modalIsOpen}
      onClose={closeModal}
      updateUserRole={updateUserRole}
      communityName={communityName}
      setCommunityMod={setCommunityMod}
      communityMod={communityMod}
      role={role}
      setRole={setRole}
      />
    </div>
  );
};

export default CreateCommunity;
