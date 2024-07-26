import React, { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaCopy, FaQuestionCircle } from "react-icons/fa";
import "./docker-setup.scss";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { getCommunityDetails } from "../api/hive";
import { toast } from 'react-toastify';

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
  const [tutorial, setTutorial] = useState(true);
  const [idError, setIdError] = useState("");
  const [domainError, setDomianError] = useState("");
  const [containerError, setContainerError] = useState("");
  const [tagError, setTagError] = useState("");

  const videos = [
    { id: 1, title: 'Funding a namecheap account - Part 1 of 8', src: 'https://3speak.tv/embed?v=igormuba/ijobvotk' },
    { id: 2, title: 'Acquiring a web domain - Part 2 of 8', src: 'https://3speak.tv/embed?v=igormuba/ontqfcod' },
    { id: 3, title: 'Acquiring a Linux web server - Part 3 of 8', src: 'https://3speak.tv/embed?v=igormuba/jcxvwexp' },
    { id: 4, title: 'SSH info and accessing the server - Part 4 of 8', src: 'https://3speak.tv/embed?v=igormuba/hlufqeae' },
    { id: 5, title: 'Docker install and configure - Part 5 of 8', src: 'https://3speak.tv/embed?v=igormuba/jfkjqoff' },
    { id: 6, title: 'Running the community on the server - Part 6 of 8', src: 'https://3speak.tv/embed?v=igormuba/seebjgok' },
    { id: 7, title: 'Pointing your domain URL to server - Part 7 of 8', src: 'https://3speak.tv/embed?v=igormuba/ptxfnvuz' },
    { id: 8, title: 'Cloudflare SSL and DDoS protection - Part 8 of 8', src: 'https://3speak.tv/embed?v=igormuba/vnrbyhdf' }
  ];

  const handleFullscreen = () => {
    const iframe = document.getElementById('videoFrame');
    if (iframe.requestFullscreen) {
      iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) { // Firefox
      iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) { // Chrome, Safari and Opera
      iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) { // IE/Edge
      iframe.msRequestFullscreen();
    }
  };
  
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

  const handleAddContainer = async () => {
    const communityIsValid = await getCommunityDetails(HIVE_ID);
    console.log(communityIsValid);
    const domainIsValid = await handleDomainValidation();
    console.log(domainIsValid)
    handleDomainValidation()
    if (!communityIsValid) {
      setIdError("Invalid hive community id")
      return;
    } else {
      setIdError("");
    }

    if(!domain) {
      setDomianError("Please provide domain name");
      return;
    } else {
      setDomianError("")
    }
    if (domainIsValid?.WhoisRecord?.parseCode === 0) {
      setDomianError("You have entered an invalid domain")
      console.log("invalid domain");
      return;
    } else {
      setDomianError("")
    }

    if (!containerName) {
      setContainerError("Please provide container name");
      return;
    } else {
      setContainerError("")
    }

    if (!TAGS) {
      setTagError("Please provide tag/tags")
      return;
    } else {
      setTagError("")
    }

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

  const validateHiveId = async (e) => {
    const value = e.target.value;
    setHiveId(value);
  
    const isHiveIdUsed = containerEntries.some(
      (entry) => entry.HIVE_ID === value
    );
  
    if (isHiveIdUsed) {
      setFieldWarnings((prevWarnings) => ({
        ...prevWarnings,
        HIVE_ID: "Hive community ID is already in use.",
      }));
    } else {
      setFieldWarnings((prevWarnings) => ({
        ...prevWarnings,
        HIVE_ID: "",
      }));
    }
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
    image: adesojisouljaay/breakaway-community:v1.0
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
        `- TEST${index + 1}=${entry.domain}_${entry.containerName || `container${index}`}:3000`
    )
    .join("\n        ");

  const composeConfig = `# Step 1: Create a directory and navigate into it
mkdir my-docker-setup
cd my-docker-setup

# Step 2: Create a docker-compose.yml file with the specified content
cat <<EOF > docker-compose.yml
version: '3'
services:
  ${composeEntries.join("\n  ")}
  nginx:
    image: adesojisouljaay/nginx-to-docker:v1.0
    ports:
      - "80:80"
    environment:
      ${nginxEnvVars}
    networks:
      - my_network
    restart: always
networks:
  my_network:
    driver: bridge
EOF

# Step 3: Run docker-compose up -d
docker-compose up -d`;

  setSuccessMessage("Docker Compose configuration generated.");
  setDockerComposeConfig(composeConfig);
};


  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(dockerComposeConfig).then(() => {
      setSuccessMessage("Docker Compose configuration copied to clipboard.");
    });
    toast.success("Docker Compose configuration copied to clipboard.", {
      position: toast?.POSITION?.BOTTOM_RIGHT,
      style: {
        backgroundColor: 'rgb(14, 10, 49)',
        color: '#fff',
        fontSize: '16px',
      },
    });
  };

  const handleDomainValidation = async () => {
    const apiKey = process.env.REACT_APP_WHOIS_API_KEY;
    const url = `https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${apiKey}&domainName=${domain}&outputFormat=JSON`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching WHOIS data:', error);
    }
  };

  const copyDockerDownload = ()=> {
    const command = `sudo apt update && sudo apt install -y apt-transport-https ca-certificates curl gnupg-agent software-properties-common && curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg && echo "deb [signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null && sudo apt update && sudo apt install -y docker-ce docker-ce-cli containerd.io && sudo usermod -aG docker $USER && sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && sudo chmod +x /usr/local/bin/docker-compose`
    navigator.clipboard.writeText(command).then(() => {
      setSuccessMessage("Docker Compose configuration copied to clipboard.");
    });
    toast.success("Docker and Docker Compose installation command copied to clipboard.", {
      position: toast?.POSITION?.BOTTOM_RIGHT,
      style: {
        backgroundColor: 'rgb(14, 10, 49)',
        color: '#fff',
        fontSize: '16px',
      },
    });
  }

  return (
    <div className="docker-main-wrap">
      <div className="hero-text-wrap">
        <h1>Become an owner of your own Web3 enabled platform</h1>
      </div>
      <div className="tutorials">
        <div className="video-dropdown" onClick={() => setTutorial(!tutorial)}>
        <h2 >
          Watch tutorials on how to set up your platform
        </h2>
        {tutorial ? <IoIosArrowDropdown size={35} /> : <IoIosArrowDropup size={35} /> }
        </div>
        {!tutorial && (
          <div className="tut-iframe">
            {videos.map((video) => (
              <div className="video-wrap" key={video.id}>
                <iframe className="video-iframe"
                  id={`videoFrame-${video.id}`}
                  // width="560"
                  // height="315"
                  src={video.src}
                  frameBorder="0"
                  allowFullScreen
                  onClick={() => handleFullscreen(`videoFrame-${video.id}`)}
                  onTouchEnd={handleFullscreen}
                ></iframe>
                <p className="video-title">{video.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="contain-wrap">
        <div className="header">Docker Container Setup</div>
        <div className="instruct">
          <h2>Accessing a VPS</h2>
          <p style={{color: "green"}}>
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
        <div className="dock-comp-cli">
          <p>
            To continue setting up your platform, you need a local
            installation of docker inside the VPS, after you are inside the
            VPS terminal
          </p>
          <p style={{color: "green"}}>Click below to copy docker and docker-compose installation commands and paste into your VPS</p>
          <pre className="doc-compose" onClick={copyDockerDownload}>
            <SyntaxHighlighter language="bash" style={a11yDark}>
              {`sudo apt update && sudo apt install -y apt-transport-https ca-certificates curl gnupg-agent software-properties-common && curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg && echo "deb [signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null && sudo apt update && sudo apt install -y docker-ce docker-ce-cli containerd.io && sudo usermod -aG docker $USER && sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && sudo chmod +x /usr/local/bin/docker-compose`}
            </SyntaxHighlighter>
          </pre>
        </div>
        <div>
          <p>Once docker and docker-compose installation is complete, fill the form below as accurately as possibly and copy the generated command and paste into your server</p>
        </div>
        <div className="docker-wrap">
          <div className="forms-wrapper">
            <div className="input-with-tooltip">
              <div className="warning-wrapper">
                {idError && <span className="warning">{idError}</span>}
                {domainError && <span className="warning">{domainError}</span>}
                {tagError && <span className="warning">{tagError}</span>}
                {containerError && <span className="warning">{containerError}</span>}
              </div>
              <div className="top-text-wrap">
                <div>
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
              </div>
              <div>
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
                  type="number"
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
                onChange={validateHiveId}
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
            {dockerComposeConfig ? (
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
            ) : (
              <>
              <div className="docker-compose-config-demo">
                <div className="config-action-buttons-demo">
                  <button disabled className="copy-button animate__animated animate__pulse">
                    <FaCopy /> Copy to Clipboard
                  </button>
                  <div className="demo-docker">
                    <h4>Generate your docker-compose.yml file by filling the setup form</h4>
                  </div>
                </div>
              </div>
              <div className="download-wrap-demo">
              <div disabled className="download-button-demo">Download as docker-compose.yml</div>
              </div>
            </>
            )}
          </div>
        </div>
        <div className="instruction-Wrap">
          {/* <div className="instru-left-wrap"> */}
            {/* <div className="instruct">
              <h2>Accessing a VPS</h2>
              <p style={{color: "green"}}>
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
            </div> */}
            {/* <div className="instruct"> */}
              {/* <h2>Running the Docker Compose</h2> */}
              {/* <p>
                To run this generated Docker Compose file, you need a local
                installation of docker inside the VPS, after you are inside the
                VPS terminal
              </p> */}
              {/* <div className="dock-comp-cli">
                <p style={{color: "green"}}>Click below to copy docker and dockerinstallation commands</p>
                <pre className="doc-compose" onClick={copyDockerDownload}>
                  <SyntaxHighlighter language="bash" style={a11yDark}>
                    {`sudo apt update && sudo apt install -y apt-transport-https ca-certificates curl gnupg-agent software-properties-common && curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg && echo "deb [signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null && sudo apt update && sudo apt install -y docker-ce docker-ce-cli containerd.io && sudo usermod -aG docker $USER && sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && sudo chmod +x /usr/local/bin/docker-compose`}
                  </SyntaxHighlighter>
                </pre>
              </div> */}
              {/* <ul> */}
                {/* <li>
                  You can download and read more about Docker from{" "}
                  <a href="https://www.docker.com/get-started/" target="_blank" rel="noopener noreferrer">
                    here
                  </a>
                </li> */}
                {/* <li>
                  You can download and read more about Docker Compose from{" "}
                  <a href="https://docs.docker.com/compose/" target="_blank" rel="noopener noreferrer">
                    here
                  </a>
                </li> */}
                {/* <p style={{color: "green"}}>Paste the generated docker-compose.yml into your server</p>
                <button className="btn" style={{margin: "10px", width: "80%"}} onClick={handleCopyToClipboard}>click here to copy docker-compse.yml file again</button> */}
              {/* </ul> */}
              {/* <p>
                This command will create a directory called "my-docker-setup", 
                it will also create a docker-compose.yml file in the directory 
                and start the containers defined in detached mode.
              </p> */}
            {/* </div> */}
          {/* </div> */}
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
                  to the specified IP address
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
