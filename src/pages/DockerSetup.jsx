import React, { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaCopy, FaQuestionCircle } from "react-icons/fa";
import "./docker-setup.scss";
import 'animate.css';

const Tooltip = ({ text }) => <div className="tooltip">{text}</div>;
export default function DockerSetup() {
  const [containerEntries, setContainerEntries] = useState([]);
  const [containerName, setContainerName] = useState("");
  const [port, setPort] = useState("");
  const [HIVE_ID, setHiveId] = useState("");
  const [TAGS, setTags] = useState("");
  const [domain, setDomain] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [dockerComposeConfig, setDockerComposeConfig] = useState("");
  const [showTooltip, setShowTooltip] = useState({
    containerName: false,
    port: false,
    HIVE_ID: false,
    TAGS: false,
    domain: false,
  });
  const [fieldWarnings, setFieldWarnings] = useState({
    containerName: "",
    port: "",
    HIVE_ID: "",
    TAGS: "",
    domain: "",
  });
  const handleTooltipToggle = (field) => {
    setShowTooltip((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };
  const handleTooltipShow = (field) => {
    setShowTooltip((prevState) => ({
      ...prevState,
      [field]: true,
    }));
  };
  const handleTooltipHide = (field) => {
    setShowTooltip((prevState) => ({
      ...prevState,
      [field]: false,
    }));
  };
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
        domain,
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

  const validateDomain = (value) => {
    setDomain(value);
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

    const composeEntries = containerEntries.map(
      (entry, index) => `${index !== 0 ? "  " : ""}${
        entry.containerName || `container${index}`
      }:
    image: pspc/ecency-boilerplate:legacy
    container_name: ${entry.containerName || `container${index}`}
    ports:
      - "${entry.port}:3000"
    environment:
      - USE_PRIVATE=1
      - HIVE_ID=${entry.HIVE_ID}
      - TAGS=${entry.TAGS}
    networks:
      - my_network
    restart: always`
    );

    const nginxEnvVars = containerEntries
      .map(
        (entry, index) =>
          `      ${index !== 0 ? "" : ""}- TEST${index + 1}=${entry.domain}_${
            entry.containerName || `container${index}`
          }:3000`
      )
      .join("\n");

    const nginxEnvVarsFormatted = nginxEnvVars
      ? `${nginxEnvVars.replace(/^-/gm, "        -")}\n`
      : "";

    const composeConfig = `version: '3'
services:
  ${composeEntries.join("\n")}
  nginx:
    image: igormuba/nginx-to-docker:latest
    ports:
      - "80:80"
    environment:
${nginxEnvVarsFormatted}    networks:
      - my_network
    restart: always
networks:
  my_network:
    driver: bridge`;

    setSuccessMessage("Docker Compose configuration generated.");
    setDockerComposeConfig(composeConfig);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(dockerComposeConfig).then(() => {
      setSuccessMessage("Docker Compose configuration copied to clipboard.");
    });
  };

  return (
    <div className="docker-main-wrap">
      <div className="hero-text-wrap">
        <h1>Become an owner of your own Web3 enabled platform</h1>
        <p>
          The first step is setting up a docker container by entering your
          community, server and URL details below
        </p>
      </div>
      <div className="contain-wrap">
        <div className="header">Docker Container Setup</div>
        <div className="docker-wrap">
          <div className="forms-wrapper">
            <div className="input-with-tooltip">
              <div className="top-text-wrap">
                <FaQuestionCircle
                  className="tooltip-icon"
                  onClick={() => handleTooltipToggle("containerName")}
                  onMouseEnter={() => handleTooltipShow("containerName")}
                  onMouseLeave={() => handleTooltipHide("containerName")}
                />
                {showTooltip.containerName && (
                  <Tooltip
                    className="tooltiptext"
                    text="Each container is a server"
                  />
                )}
              </div>
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
              <div className="top-text-wrap">
                <FaQuestionCircle
                  className="tooltip-icon"
                  onClick={() => handleTooltipToggle("containerName")}
                  onMouseEnter={() => handleTooltipShow("containerName")}
                  onMouseLeave={() => handleTooltipHide("containerName")}
                />
                {showTooltip.containerName && (
                  <Tooltip text="Port where connections will be handled, each community port must be unique, one port per community" />
                )}
              </div>
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
              <div className="top-text-wrap">
                <FaQuestionCircle
                  className="tooltip-icon"
                  onClick={() => handleTooltipToggle("containerName")}
                  onMouseEnter={() => handleTooltipShow("containerName")}
                  onMouseLeave={() => handleTooltipHide("containerName")}
                />
                {showTooltip.containerName && (
                  <Tooltip text="ID works similarly to a username and refers to the Hive ID of the community" />
                )}
              </div>
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
              <div className="top-text-wrap">
                <FaQuestionCircle
                  className="tooltip-icon"
                  onClick={() => handleTooltipToggle("containerName")}
                  onMouseEnter={() => handleTooltipShow("containerName")}
                  onMouseLeave={() => handleTooltipHide("containerName")}
                />
                {showTooltip.containerName && (
                  <Tooltip text="Extra tags can be used to show extra content on the feed even if the tag was posted outside the community" />
                )}
              </div>
              <input
                type="text"
                placeholder="TAGS"
                value={TAGS}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
            <div className="input-with-tooltip">
              <div className="top-text-wrap">
                <FaQuestionCircle
                  className="tooltip-icon"
                  onClick={() => handleTooltipToggle("domain")}
                  onMouseEnter={() => handleTooltipShow("domain")}
                  onMouseLeave={() => handleTooltipHide("domain")}
                />
                {showTooltip.domain && (
                  <Tooltip text="The domain is the website for this specific domain" />
                )}
              </div>
              <input
                type="text"
                placeholder="Domain"
                value={domain}
                onChange={(e) => validateDomain(e.target.value)}
                onFocus={() => handleTooltipShow("domain")}
                onBlur={() => handleTooltipHide("domain")}
              />
            </div>

            <button className="add-btn" onClick={handleAddContainer}>
              Add Container
            </button>
          </div>
          <div className="doc-box animate__animated animate__fadeIn">
            {dockerComposeConfig && (
              <div>
                <div className="step-info">
                  <div className="info">Docker Compose Configuration:</div>
                  <div className="success-message">{successMessage}</div>
                </div>
                <div className="docker-compose-config">
                  <div className="config-action-buttons">
                    <button
                      onClick={handleCopyToClipboard}
                      className="copy-button animate__animated animate__pulse"
                    >
                      <FaCopy /> Copy to Clipboard
                    </button>
                  </div>
                  <SyntaxHighlighter language="yaml" style={a11yDark}>
                    {dockerComposeConfig}
                  </SyntaxHighlighter>
                </div>
                <div className="download-wrap">
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
              </div>
            )}
          </div>
        </div>
        <div className="instruction-Wrap">
          <div className="instru-left-wrap">
            <div className="instruct">
              <h2>Accessing a VPS</h2>
              <p>
                To access your VPS, you'll need an SSH client. Here's how you
                can connect:
              </p>
              <ul>
                <li>
                  When you rent a VPS server you will receive authentication
                  details, such as user, password and IP
                </li>

                <li>Open your terminal or SSH client.</li>
                <li>
                  Use the following command to connect to your VPS:{" "}
                  <code>ssh username@your_vps_ip</code>
                </li>
                <li>
                  If the VPS username is root and the IP is 127.0.0.1, as an
                  example, it will look like: <code>ssh root@127.0.0.1</code>
                </li>
                <li>Enter your password when prompted.</li>
                <li>You should now be connected to your VPS.</li>
              </ul>
            </div>
            <div className="instruct">
              <h2>Running the Docker Compose</h2>
              <p>
                To run this generated Docker Compose file, you need a local
                installation of docker inside the VPS, after you are inside the
                VPS terminal
              </p>
              <ul>
                <li>
                  You can download and read more about Docker from{" "}
                  <a href="https://www.docker.com/get-started/" target="_blank">
                    here
                  </a>
                </li>
                <li>
                  You can download and read more about Docker Compose from{" "}
                  <a href="https://docs.docker.com/compose/" target="_blank">
                    here
                  </a>
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
              </ul>
              <pre className="doc-compose">
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
          <div className="instru-right-wrap">
            <div className="instruct">
              <h2>Pointing a Domain to an IP Using DNS Entries</h2>
              <p>
                To point a domain to an IP address using DNS entries, follow
                these steps:
              </p>
              <ul>
                <li>
                  Log in to your domain registrar's website or DNS hosting
                  provider's control panel.
                </li>
                <li>Navigate to the DNS management or DNS settings section.</li>
                <li>
                  Find the option to edit or manage DNS records for your domain.
                </li>
                <li>
                  Locate the "A" record (Address record) or "CNAME" record
                  (Canonical Name record) settings.
                </li>
                <li>
                  If using an "A" record:
                  <ul>
                    <li>Create a new "A" record.</li>
                    <li>
                      Enter the desired hostname (usually "@", to point the
                      domain itself) or a subdomain.
                    </li>
                    <li>
                      Enter the IP address in the "Value" or "Points to" field.
                    </li>
                    <li>Save the changes.</li>
                  </ul>
                </li>
                <li>
                  <h4>If using a "CNAME" record:</h4>
                  <ul>
                    <li>Create a new "CNAME" record.</li>
                    <li>
                      Enter the desired subdomain (e.g., "www") in the "Name"
                      field.
                    </li>
                    <li>
                      Enter the domain or subdomain to point to in the "Value"
                      or "Points to" field.
                    </li>
                    <li>Save the changes.</li>
                  </ul>
                </li>
                <li>
                  DNS changes might take some time to propagate across the
                  internet (usually several hours to a day).
                </li>
                <li>
                  Verify the changes by pinging your domain or using online DNS
                  lookup tools.
                </li>
                <li>
                  Once DNS propagation is complete, your domain should now point
                  to the specified IP address.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
