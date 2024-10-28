import React, { useState } from 'react';
import { updateCommunityMetadata } from '../api/hive';

export const UpdateCommunity = () => {

  const [aboutCommunity, setAboutCommunity] = useState("");
  const [communityDescription, setCommunityDescription] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [communityId, setCommunityId] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const newProfileData = {
      about: aboutCommunity,
      profile_image: profilePictureUrl,
      cover_image: coverImageUrl,
      community_description: communityDescription
    };

    const username = communityId;

    await updateCommunityMetadata(username, profilePictureUrl, coverImageUrl, aboutCommunity, communityDescription);
    
    setLoading(false);
  };

  return (
    <div className="create-community">
      <div className="create-community-container">
        <div className="header">
          <h2>Update Breakaway Community</h2>
        </div>
        <div className="step-info">
          <span className="info">Fill in the fields you want to update.</span>
        </div>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
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
              value={aboutCommunity}
              placeholder="About Community"
              onChange={(e) => setAboutCommunity(e.target.value)}
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
            <textarea
              rows={4}
              value={communityDescription}
              onChange={(e) => setCommunityDescription(e.target.value)}
              placeholder="Community Description"
            />
            <button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Community"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
