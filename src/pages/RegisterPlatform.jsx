import React, { useState } from 'react';
import { registerPlatform } from '../api/breakaway';
import './register-platform.scss';

export const RegisterPlatform = () => {
  const [formData, setFormData] = useState({
    containerName: '',
    platformCreator: '',
    aboutPlatform: '',
    port: '',
    tags: '',
    communityId: '',
    domain: '',
  });

  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerPlatform(formData);
      setResponseMessage(response.message);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.error || 'Failed to register the community.');
      setResponseMessage('');
    }
  };

  return (
    <div className="register-platform-container">
      <h1 className="register-platform-title">Platform Register</h1>
      {responseMessage && <p className="register-platform-response">{responseMessage}</p>}
      {errorMessage && <p className="register-platform-error">{errorMessage}</p>}
      <form className="register-platform-form" onSubmit={handleSubmit}>
        <input
          className="register-platform-input"
          type="text"
          name="containerName"
          placeholder="Container Name"
          value={formData.containerName}
          onChange={handleChange}
          required
        />
        <input
          className="register-platform-input"
          type="text"
          name="platformCreator"
          placeholder="Platform Creator"
          value={formData.platformCreator}
          onChange={handleChange}
          required
        />
        <input
          className="register-platform-input"
          type="text"
          name="aboutPlatform"
          placeholder="About Platform"
          value={formData.aboutPlatform}
          onChange={handleChange}
          required
        />
        <input
          className="register-platform-input"
          type="number"
          name="port"
          placeholder="Port"
          value={formData.port}
          onChange={handleChange}
          required
        />
        <input
          className="register-platform-input"
          type="text"
          name="tags"
          placeholder="Tags"
          value={formData.tags}
          onChange={handleChange}
          required
        />
        <input
          className="register-platform-input"
          type="text"
          name="communityId"
          placeholder="Community ID"
          value={formData.communityId}
          onChange={handleChange}
          required
        />
        <input
          className="register-platform-input"
          type="text"
          name="domain"
          placeholder="Domain"
          value={formData.domain}
          onChange={handleChange}
          required
        />
        <button className="register-platform-button" type="submit">Register Community</button>
      </form>
    </div>
  );
};
