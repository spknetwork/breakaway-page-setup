import React, { useEffect, useState } from "react";
import "./single-page-modal.scss";
import { Link } from "react-router-dom";
import Logo from "../../assets/overlay_bac.jpg";

function SinglePageModal({
  singlePageModal,
  pinnedCommunitiesWebsties,
  handleSinglepageModal,
  selectedId,
  communityLists,
}) {
  const [data, setData] = useState({});
  const [NotBAC, setNotBAC] = useState(false);
  useEffect(() => {
    if (selectedId) {
      handleCommunitydata();
    }
  }, [selectedId]);

  const handleCommunitydata = () => {
    const communitydata = communityLists.find(
      (data) => data.name === selectedId
    );

    if (communitydata && !communitydata.domain) {
      setNotBAC(true); // Set to true if domain is missing
    } else {
      setNotBAC(false); // Reset to false if domain is present
    }

    setData(communitydata);
  };
  console.log(data);

  if (!data) {
    return null; // Return null if no data is available to avoid rendering the modal
  }

  // const data = communityLists.find( (data)=> data.name === selectedId )
  // console.log(data)

  return (
    <div
      className={`sp-fadded-container modal-overlay ${
        singlePageModal ? "open" : ""
      }`}
    >
      <div
        className={`sp-modal-overlay ${singlePageModal ? "open" : ""}`}
        onClick={handleSinglepageModal}
      ></div>
      <div className="sp-modal slide-up">
        <span className="sp-close-btn" onClick={handleSinglepageModal}>
          X
        </span>
        {!NotBAC && <img className="sp-bac" src={Logo} alt="" />}

        <div className="sp-modal-content">
          <img
            className="sp-img"
            // src={ `https://images.hive.blog/u/${c.name}/avatar`}
            src={`https://images.hive.blog/u/${data.name}/avatar`}
            alt=""
          />

          {/* <div className="img-cover-grid  ">
            

            <img
              className="sp-img"
              // src={ `https://images.hive.blog/u/${c.name}/avatar`}
              src={`https://images.hive.blog/u/${data.name}/avatar`}
              alt=""
            />
          </div> */}
          <h1>{data.title}</h1>
          <p>{data.description || data.flag_text}</p>
          {NotBAC && <p>{data.about}</p>}

          {/* <div className="modal-info">
            <p><strong>Domain:</strong> <a href={data.domain} target="_blank" rel="noopener noreferrer">{data.domain}</a></p>
            <p><strong>Subscribers:</strong> {data.subscribers}</p>
            <p><strong>Pending Posts:</strong> {data.num_pending}</p>
          </div> */}

          {NotBAC && (
            <Link to="/docker-setup" className="start">
              <h3 className="start-com-wrap glo-btnc">Launch Bac Platform</h3>
            </Link>
          )}

          {!NotBAC && (
            <h3
              className="start-com-wrap glo-btnc"
              onClick={() =>
                window.open(`${pinnedCommunitiesWebsties[data.name]}`, "_blank")
              }
            >
              Visit platform
            </h3>
          )}

          {/* <div className="modal-team">
            <h2>Team Members</h2>
            <ul>
              {data.team?.map((member, index) => (
                <li key={index}>
                  {member[0]} - {member[1]}
                </li>
              ))}
            </ul>
          </div> */}
          {Array.isArray(data.team) && data.team.length > 0 && (
            <div className="modal-team">
              <h2>Team Members</h2>
              <ul>
                {data.team.slice(0, 6).map((member, index) => (
                  <li key={index}>
                    {member[0]} - {member[1]}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SinglePageModal;
