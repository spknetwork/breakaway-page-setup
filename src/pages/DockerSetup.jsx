import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaCopy } from "react-icons/fa";
import "./docker-setup.scss";

const DockerSetup = () => {
  const [containerName, setContainerName] = useState("");
  const [port, setPort] = useState("");
  const [HIVE_ID, setHiveId] = useState("");
  const [TAGS, setTags] = useState("");
  const [dockerComposeConfig, setDockerComposeConfig] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(dockerComposeConfig).then(() => {
      setSuccessMessage("Docker Compose configuration copied to clipboard.");
    });
  };

  const handleDownload = () => {
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
            <div className="docker-compose-config">
              <div className="config-action-buttons">
                <button onClick={handleCopyToClipboard} className="copy-button">
                  <FaCopy /> Copy to Clipboard
                </button>
              </div>
              <SyntaxHighlighter language="yaml" style={a11yDark}>
                {dockerComposeConfig}
              </SyntaxHighlighter>
            </div>
            <a
              href={`data:text/plain;charset=utf-8,${encodeURIComponent(
                dockerComposeConfig
              )}`}
              download="docker-compose.yml"
              className="download-button"
            >
              Download as docker-compose.yml
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default DockerSetup;
