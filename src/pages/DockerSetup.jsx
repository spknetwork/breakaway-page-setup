import React, { useState } from "react";

import "./docker-setup.scss";

const DockerSetup = () => {
  const [containerName, setContainerName] = useState("");
  const [port, setPort] = useState("");
  const [HIVE_ID, setHiveId] = useState("");
  const [TAGS, setTags] = useState("");
  const [dockerComposeConfig, setDockerComposeConfig] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleDownload = () => {
    // Generate the Docker Compose configuration based on user inputs
    const config = `version: '3'
services:
  ${containerName}:
    image: pspc/ecency-boilerplate:legacy
    ports:
      - "${port || "3000"}:3000"
    environment:
      - USE_PRIVATE=1
      - HIVE_ID=${HIVE_ID}
      - TAGS=${TAGS}
    restart: always`;

    setDockerComposeConfig(config);
    setSuccessMessage("Docker Compose configuration generated.");
  };

  return (
    <div className="docker-setup">
      <div className="docker-setup-container">
        <div className="header">Docker Container Setup</div>
        <div className="error-message">{errorMessage}</div>
        <div className="success-message">{successMessage}</div>

        <div className="form-wrapper">
          <input
            type="text"
            placeholder="Container Name"
            value={containerName}
            onChange={(e) => setContainerName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Port (default: 3000)"
            value={port}
            onChange={(e) => setPort(e.target.value)}
          />
          <input
            type="text"
            placeholder="HIVE_ID"
            value={HIVE_ID}
            onChange={(e) => setHiveId(e.target.value)}
          />
          <input
            type="text"
            placeholder="TAGS"
            value={TAGS}
            onChange={(e) => setTags(e.target.value)}
          />
          <button onClick={handleDownload}>Generate Docker Compose</button>
        </div>

        {dockerComposeConfig && (
          <div>
            <div className="step-info">
              <div className="info">Docker Compose Configuration:</div>
            </div>
            <pre>{dockerComposeConfig}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default DockerSetup;
