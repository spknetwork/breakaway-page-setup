import React from "react";
import { FaArrowUpRightDots, FaArrowUpShortWide } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi";
import { Link } from "react-router-dom";

export const CommunityList = ({ c, pinnedCommunitiesWebsties }) => {
  return (
    <div className="box-container ">
      <div className="box">
        <div className="box-wrap-left ">
          <div className="img-cover">
            <img
              className="pro-img"
              src={`https://images.hive.blog/u/${c.name}/avatar`}
              alt=""
            />
          </div>
          <div className="box-left">
            <Link className="title" to={`/community/hive-${c.id}`}>
              {c.title}
            </Link>
            <span className="about">{c.about}</span>
            <span className="about-phone">
              {c.about.split(" ").slice(0, 100).join(" ")}
            </span>
            <div className="admins-wrapper">
              <span>Admin:</span>
              <div className="admins">
                {c?.admins?.map((admin, i) => (
                  <div key={i} className="each-admin">
                    <span className="admin">@{admin}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="community-info">
              <div className="info-left">
                <div className="center-items">
                  <span className="info-num">{c.subscribers}</span>{" "}
                  <span className="info-icons">
                    <HiUsers size={14} />
                  </span>
                </div>
                <div className="center-items">
                  <span className="info-num">{c.num_pending}</span>{" "}
                  <span className="info-icons">
                    <FaArrowUpRightDots size={14} />
                  </span>
                </div>
                <div className="center-items">
                  <span className="info-num">{c.num_authors}</span>{" "}
                  <span className="info-icons">
                    <FaArrowUpShortWide size={14} />
                  </span>
                </div>
              </div>
              <div className="btn-vist-phone">
                {c.isPinned ? (
                  <button
                    className="btn glo-btnc"
                    onClick={() =>
                      window.open(
                        `${pinnedCommunitiesWebsties[c.name]}`,
                        "_blank"
                      )
                    }
                  >
                    Visit platform
                  </button>
                ) : (
                  <Link to="/docker-setup" className="start">
                    <h3 className="start-com-wrap glo-btnc">Launch Community</h3>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="btn-wrap">
          {c.isPinned ? (
            <button
              className="btn glo-btnc"
              onClick={() =>
                window.open(`${pinnedCommunitiesWebsties[c.name]}`, "_blank")
              }
            >
              Visit platform
            </button>
          ) : (
            <Link to="/docker-setup" className="start-com-wrap glo-btnc">
              Start your community
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
