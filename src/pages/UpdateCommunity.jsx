import React, { useState } from 'react';
import { keychainBroadcast } from "../helpers/keychain"; 
function UpdateCommunity() {
  const [aboutCommunity, setAboutCommunity] = useState("");
  const [communityDescription, setCommunityDescription] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [communityId, setCommunityId] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 

  const handleSubmit = async (event) => {
    event.preventDefault(); 
  
    // Prepare custom JSON data for updating community properties
    const customJsonData = {};

    if (aboutCommunity) {
      customJsonData.about = aboutCommunity;
    }

    if (communityDescription) {
      customJsonData.description = communityDescription;
    }

    if (profilePictureUrl) {
      customJsonData.profile_image = profilePictureUrl;
    }

    if (coverImageUrl) {
      customJsonData.cover_image = coverImageUrl;
    }

    // If no fields are filled, show an alert and return
    if (Object.keys(customJsonData).length === 0) {
      alert("Please fill in at least one field to update.");
      return;
    }

    // Custom JSON object for Hive community update
    const customJson = {
      id: 'community_update', // Operation ID for updating community
      required_auths: [],
      required_posting_auths: [communityId], // Assuming the communityId is the username or account
      json: JSON.stringify(customJsonData),
    };

    // Hive expects each operation to be in the format of ["custom_json", {...}]
    const operations = [
      ['custom_json', customJson] // Wrap in an array with the operation type "custom_json"
    ];

    // Broadcast using the existing keychainBroadcast helper function
    try {
      setLoading(true);
      const response = await keychainBroadcast(communityId, operations, 'active'); // Use 'active' or 'posting' based on your use case
      if (response.success) {
        alert('Community updated successfully on the Hive blockchain!');
        // Clear input fields or perform additional actions
      } else {
        alert('Error: ' + response.message);
      }
    } catch (error) {
      alert('An error occurred: ' + error.message);
    } finally {
      setLoading(false);
    }
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

export default UpdateCommunity;
