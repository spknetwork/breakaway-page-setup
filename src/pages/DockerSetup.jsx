import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaCopy } from "react-icons/fa";
import "./docker-setup.scss";

const DockerSetup = () => {
  const [containerEntries, setContainerEntries] = useState([]); // Store multiple container entries
  const [containerName, setContainerName] = useState("");
  const [port, setPort] = useState("");
  const [HIVE_ID, setHiveId] = useState("");
  const [TAGS, setTags] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [dockerComposeConfig, setDockerComposeConfig] = useState("");

  const handleAddContainer = () => {
    if (containerName && HIVE_ID && TAGS) {
      const newEntry = {
        containerName,
        port: port || "3000",
        HIVE_ID,
        TAGS,
      };

      setContainerEntries([...containerEntries, newEntry]); // Add the new entry to the list
      setContainerName("");
      setPort("");
      setHiveId("");
      setTags("");
    } else {
      setSuccessMessage("Please fill out all fields.");
    }
    handleGenerateCompose();
  };

  const handleGenerateCompose = () => {
    if (containerEntries.length === 0) {
      setSuccessMessage("Add at least one container entry.");
      return;
    }

    const composeConfig = `version: '3'\nservices:\n${containerEntries
      .map(
        (entry, index) =>
          `  container${index}:\n    image: pspc/ecency-boilerplate:legacy\n    ports:\n      - "${entry.port}:3000"\n    environment:\n      - USE_PRIVATE=1\n      - HIVE_ID=${entry.HIVE_ID}\n      - TAGS=${entry.TAGS}\n    restart: always`
      )
      .join("\n")}`;

    setSuccessMessage("Docker Compose configuration generated.");
    setDockerComposeConfig(composeConfig);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(dockerComposeConfig).then(() => {
      setSuccessMessage("Docker Compose configuration copied to clipboard.");
    });
  };

  return (
    <div className="docker-setup">
      <div className="docker-setup-container">
        <div className="header">Docker Container Setup</div>
        <div className="success-message">{successMessage}</div>

        <div className="form-wrapper">
          {/* <input
            type="text"
            placeholder="Container Name"
            value={containerName}
            onChange={(e) => setContainerName(e.target.value)}
          /> */}
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
          <button onClick={handleAddContainer}>Add Container</button>
          {/* <button onClick={handleGenerateCompose}>
            Generate Docker Compose
          </button> */}
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

        {/* <div className="container-entries">
          <h2>Container Entries</h2>
          <ul>
            {containerEntries.map((entry, index) => (
              <li key={index}>
                Container Name: {entry.containerName}, Port: {entry.port},
                HIVE_ID: {entry.HIVE_ID}, TAGS: {entry.TAGS}
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default DockerSetup;
