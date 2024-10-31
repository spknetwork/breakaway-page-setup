import React, { useState } from 'react';
import {updateCommunity, updateCommunityMetadata } from '../api/hive';
import "./updatecommunty.scss"

export const UpdateCommunity = () => {

  const [aboutCommunity, setAboutCommunity] = useState("");
  const [title, setTitle] = useState("");
  const [communityDescription, setCommunityDescription] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [communityId, setCommunityId] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 
  const [step, setStep] = useState(true);

  const clearForm = () => {
    setAboutCommunity('');
    setTitle('');
    setCommunityDescription('');
    setProfilePictureUrl('');
    setCoverImageUrl('');
    setCommunityId('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const username = communityId;

    const res = await updateCommunityMetadata(username, profilePictureUrl, coverImageUrl, aboutCommunity, communityDescription, clearForm );
    console.log(res)
    if (res && res.success) {
            clearForm();
            setLoading(false);
          } else {
            setError("Failed to update community metadata");
          }
    setLoading(false);
  };



  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError("");
  
  //   const username = communityId;
  
  //   try {
  //     const res = await updateCommunityMetadata(username, profilePictureUrl, coverImageUrl, aboutCommunity, communityDescription);
  //     console.log(res);
  
  //     // Check if `res` and `res.success` exist
  //     if (res && res.success) {
  //       clearForm();
  //     } else {
  //       setError("Failed to update community metadata");
  //     }
  //   } catch (error) {
  //     console.error("Error updating community metadata:", error);
  //     setError("An error occurred while updating.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const updateCommunityInfo = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await updateCommunity(communityId, communityId, {
        title: title,
        about: aboutCommunity,
        lang: "en",
        description: communityDescription,
        flag_text: "",
        is_nsfw: false
      });
      console.log("Transaction Confirmation:", res);
      clearForm()
      setLoading(false);
      return res;
    } catch (error) {
      console.error("Error updating community:", error);
      setError("Failed to update community details.");
      setLoading(false);
    }
  };


  

  return (
    <div className="create-community">
      <div className="create-community-container">
        <div className="header">
          <h2>Update Breakaway Community</h2>
        </div>
        <div class="wrap-btn-center">
          <button class="btn-toggle" onClick={()=> setStep(!step)}>{step === true ? "Update Communuty Image URL" : "Update Community Details"}</button>
        </div>
        <div className="step-info">
          <span className="info">Fill in the fields you want to update.</span>
        </div>
        {error && <div className="error-message">{error}</div>}
        <>
       {step === true && <form onSubmit={updateCommunityInfo}>
          <div className="form-wrapper">
          <input
              type="text"
              value={communityId}
              placeholder="Community ID"
              onChange={(e) => setCommunityId(e.target.value)}
              required 
            />
          <input
              type="text"
              value={title}
              placeholder="Community Title"
              onChange={(e) => setTitle(e.target.value)}
              required 
            />
            
            <input
              type="text"
              value={aboutCommunity}
              placeholder="About Community"
              onChange={(e) => setAboutCommunity(e.target.value)}
            />

            <textarea
              rows={4}
              value={communityDescription}
              onChange={(e) => setCommunityDescription(e.target.value)}
              placeholder="Community Description"
            />
            {/* <button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Community"}
            </button> */}
            <button type="submit" disabled={loading}>
  {loading ? (
    <div className="wrap-loader">
      <span>Updating</span>
      <span className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </span>
    </div>
  ) : (
    "Update Community"
  )}
</button>
          </div>
        </form>}
        {step === false && <form onSubmit={handleSubmit }>
          <div className="form-wrapper">
          <input
              type="text"
              value={communityId}
              placeholder="Community ID"
              onChange={(e) => setCommunityId(e.target.value)}
              required 
            />
            <input
              type="text"
              value={profilePictureUrl}
              placeholder="Profile Image URL"
              onChange={(e) => setProfilePictureUrl(e.target.value)}
            />
            <input
              type="text"
              value={coverImageUrl}
              placeholder="Cover Image URL"
              onChange={(e) => setCoverImageUrl(e.target.value)}
            />
            {/* <button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Community"}
            </button> */}
            <button type="submit" disabled={loading}>
  {loading ? (
    <div className="wrap-loader">
      <span>Updating</span>
      <span className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </span>
    </div>
  ) : (
    "Update Community"
  )}
</button>

          </div>
        </form>}
        </>
      </div>
    </div>
  );
}
