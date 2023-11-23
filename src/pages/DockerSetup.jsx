import React, { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaCopy, FaQuestionCircle } from "react-icons/fa";
import "./docker-setup.scss";

const Tooltip = ({ text }) => <div className="tooltip">{text}</div>;

const DockerSetup = () => {
  const [containerEntries, setContainerEntries] = useState([]);
  const [containerName, setContainerName] = useState("");
  const [port, setPort] = useState("");
  const [HIVE_ID, setHiveId] = useState("");
  const [TAGS, setTags] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [dockerComposeConfig, setDockerComposeConfig] = useState("");
  const [showTooltip, setShowTooltip] = useState({
    containerName: false,
    port: false,
    HIVE_ID: false,
    TAGS: false,
  });
  const [fieldWarnings, setFieldWarnings] = useState({
    containerName: "",
    port: "",
    HIVE_ID: "",
    TAGS: "",
  });

  const handleAddContainer = () => {
    if (Object.values(fieldWarnings).some((warning) => warning !== "")) {
      setSuccessMessage("Resolve field warnings before adding the container.");
      return;
    }
    if (containerName && HIVE_ID && TAGS) {
      const newEntry = {
        containerName,
        port: port || "3000",
        HIVE_ID,
        TAGS,
      };

      setContainerEntries([...containerEntries, newEntry]);
      setContainerName("");
      setPort("");
      setHiveId("");
      setTags("");
    } else {
      setSuccessMessage("Please fill out all fields.");
    }
  };

  const validatePort = (value) => {
    const isPortUsed = containerEntries.some((entry) => entry.port === value);
    if (isPortUsed) {
      setFieldWarnings({ ...fieldWarnings, port: "Port is already in use." });
    } else {
      setFieldWarnings({ ...fieldWarnings, port: "" });
    }
    setPort(value);
  };

  const validateContainerName = (value) => {
    const isNameUsed = containerEntries.some(
      (entry) => entry.containerName === value
    );
    if (isNameUsed) {
      setFieldWarnings({
        ...fieldWarnings,
        containerName: "Container name is already in use.",
      });
    } else {
      setFieldWarnings({ ...fieldWarnings, containerName: "" });
    }
    setContainerName(value);
  };

  const validateHiveId = (value) => {
    const isHiveIdUsed = containerEntries.some(
      (entry) => entry.HIVE_ID === value
    );
    if (isHiveIdUsed) {
      setFieldWarnings({
        ...fieldWarnings,
        HIVE_ID: "Hive community ID is already in use.",
      });
    } else {
      setFieldWarnings({ ...fieldWarnings, HIVE_ID: "" });
    }
    setHiveId(value);
  };

  useEffect(() => {
    if (containerEntries.length > 0) {
      handleGenerateCompose();
    }
  }, [containerEntries]);

  const handleGenerateCompose = () => {
    if (containerEntries.length === 0) {
      setSuccessMessage("Add at least one container entry.");
      return;
    }

    const composeConfig = `version: '3'\nservices:\n${containerEntries
      .map(
        (entry, index) =>
          `  ${
            entry.containerName || `container${index}`
          }:\n    image: pspc/ecency-boilerplate:legacy\n    ports:\n      - "${
            entry.port
          }:3000"\n    environment:\n      - USE_PRIVATE=1\n      - HIVE_ID=${
            entry.HIVE_ID
          }\n      - TAGS=${entry.TAGS}\n    restart: always`
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
          <div className="input-with-tooltip">
            <FaQuestionCircle
              className="tooltip-icon"
              onClick={() =>
                setShowTooltip({
                  ...showTooltip,
                  containerName: !showTooltip.containerName,
                })
              }
            />
            {showTooltip.containerName && (
              <Tooltip text="Each container is a server" />
            )}
            <input
              type="text"
              placeholder="Container Name"
              value={containerName}
              onChange={(e) => validateContainerName(e.target.value)}
              onFocus={() =>
                setShowTooltip({ ...showTooltip, containerName: true })
              }
              onBlur={() =>
                setShowTooltip({ ...showTooltip, containerName: false })
              }
            />
            {fieldWarnings.containerName && (
              <div className="warning-message">
                {fieldWarnings.containerName}
              </div>
            )}
          </div>
          <div className="input-with-tooltip">
            <FaQuestionCircle
              className="tooltip-icon"
              onClick={() =>
                setShowTooltip({
                  ...showTooltip,
                  port: !showTooltip.port,
                })
              }
            />
            {showTooltip.containerName && (
              <Tooltip text="Port where connections will be handled, each community port must be unique, one port per community" />
            )}
            <div className="input-container">
              <input
                type="text"
                placeholder="Port (default: 3000)"
                value={port}
                onChange={(e) => validatePort(e.target.value)}
              />
              {fieldWarnings.port && (
                <div className="warning-message">{fieldWarnings.port}</div>
              )}
            </div>
          </div>

          <div className="input-with-tooltip">
            <FaQuestionCircle
              className="tooltip-icon"
              onClick={() =>
                setShowTooltip({
                  ...showTooltip,
                  HIVE_ID: !showTooltip.HIVE_ID,
                })
              }
            />
            {showTooltip.containerName && (
              <Tooltip text="ID works similarly to a username and refers to the Hive ID of the community" />
            )}
            <input
              type="text"
              placeholder="Hive community ID"
              value={HIVE_ID}
              onChange={(e) => validateHiveId(e.target.value)}
            />
            {fieldWarnings.HIVE_ID && (
              <div className="warning-message">{fieldWarnings.HIVE_ID}</div>
            )}
          </div>
          <div className="input-with-tooltip">
            <FaQuestionCircle
              className="tooltip-icon"
              onClick={() =>
                setShowTooltip({
                  ...showTooltip,
                  TAGS: !showTooltip.TAGS,
                })
              }
            />
            {showTooltip.containerName && (
              <Tooltip text="Extra tags can be used to show extra content on the feed even if the tag was posted outside the community" />
            )}
            <input
              type="text"
              placeholder="TAGS"
              value={TAGS}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          <button onClick={handleAddContainer}>Add Container</button>
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
        <div className="instructions">
          <h2>Running the Docker Compose</h2>
          <p>
            To run this generated Docker Compose file, you need a local
            installation of docker
          </p>
          <ol>
            <li>
              You can download and read more about Docker from{" "}
              <a href="https://www.docker.com/get-started/">here</a>
            </li>
            <li>
              Open a terminal or command prompt, depending on your operating
              system.
            </li>
            <li>
              Navigate to the directory containing the generated{" "}
              <code>docker-compose.yml</code> file, possibly the Downloads
              folder, although it is recommended you move it somewhere else.
            </li>
            <li>Run the following command to start the containers:</li>
          </ol>
          <pre>
            <SyntaxHighlighter language="bash" style={a11yDark}>
              {`docker-compose up -d`}
            </SyntaxHighlighter>
          </pre>
          <p>
            This command will start the containers defined in the{" "}
            <code>docker-compose.yml</code> file in detached mode.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DockerSetup;
