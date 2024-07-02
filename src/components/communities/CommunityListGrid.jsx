
import "./communityl-list-grid.scss";
import { FaArrowUpRightDots, FaArrowUpShortWide } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi";
import { Link } from "react-router-dom";
import rally from '../../assets/rally-new-1.png'

export default function CommunityListGrid({ c, pinnedCommunitiesWebsties }) {
  const formatSubscribers = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num;
  };
  const formattedSubscribers = formatSubscribers(c.subscribers);

  return (
    <div className="cap">
      {/* { communityLists?.map( (c, i) => ( */}
      <div className="box-container-grid ">
        <div className="box-grid">
          <div className="box-wrap-left-grid ">
            <div className="img-cover-grid  " >
              <img
                className="pro-img-grid"
                src={c.name === "hive-109272" ? rally :  `https://images.hive.blog/u/${c.name}/avatar`}
                alt=""
              />
            </div>
            <div className="box-left">
              <Link className="title-grid" to={`/community/hive-${c.id}`}>
                {c.title}
              </Link>
              <span className="about-grid">{c.about}</span>
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
                    <span className="info-num">{formattedSubscribers}</span>{" "}
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
                  {/* <div className="center-items">
                    <span className="info-num">{c.num_authors}</span>{" "}
                    <span className="info-icons">
                      <FaArrowUpShortWide size={14} />
                    </span>
                  </div> */}
                </div>
                <div className="btn-vist-phone-grid">
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
                      <h3 className="start-com-wrap glo-btnc">
                      Launch Bac Platform
                      </h3>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ))} */}
    </div>
  );
}
