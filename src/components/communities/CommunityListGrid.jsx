import "./communityl-list-grid.scss";
import { FaArrowUpRightDots, FaArrowUpShortWide } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi";
import { Link } from "react-router-dom";
import rally from '../../assets/rally-new-1.png'
import { RiH1 } from "react-icons/ri";
import { useState, useEffect} from "react";
import Logo from "../../assets/overlay_bac.jpg"


export default function CommunityListGrid({ c, pinnedCommunitiesWebsties }) {
  const [hasDomain, setHasDomain] = useState(false);

  useEffect(() => {
    checkDomainValue();
  }, []);

  function checkDomainValue() {
    if(c.domain);
    setHasDomain(true);

  }

  
  const formatSubscribers = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num;
  };
  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }

  const text = truncateText(c.about, 30)
  const formattedSubscribers = formatSubscribers(c.subscribers);

  return (
    <div className="cap">

      <div className="box-container-grid ">
        <div className={c.isPinned ? "box-grid-bac": "box-grid"}>
          <div className="box-wrap-left-grid ">
            <div className="img-cover-grid  " >
             {c.isPinned && <img className="bac" src={Logo} alt="" />}

              <img
                className="pro-img-grid"
                // src={ `https://images.hive.blog/u/${c.name}/avatar`}
                src={c.name === "hive-109272" ? rally :  `https://images.hive.blog/u/${c.name}/avatar`}
                alt=""
              />
            </div>
            <div className="box-left-grid">
              {/* <Link className={c.isPinned ? "title-grid-bac" :"title-grid"} to={`/community/hive-${c.id}`}> */}
                <h2>
                  {c.title}
                </h2>
              {/* </Link> */}
              <span className="about-grid">{text}</span>
              <div className="admins-wrapper">
                <span>Admin:</span>
                <div className="admins">
                  {c?.admins?.slice(0, 2).map((admin, i) => (
                    <div key={i} className="each-admin">
                      <span className="admin">@{admin}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="community-info-grid">
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
                  <div className="center-items last-num">
                    <span className="info-num">{c.num_authors}</span>{" "}
                    <span className="info-icons">
                      <FaArrowUpShortWide size={14} />
                    </span>
                  </div>
                </div>
                <div className="btn-vist-phone-grid">
                  {c.isPinned ? (
                    <h3
                      className="start-com-wrap glo-btnc"
                      onClick={() =>
                        window.open(
                          `${pinnedCommunitiesWebsties[c.name]}`,
                          "_blank"
                        )
                      }
                    >
                      Visit platform
                    </h3>
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
    </div>
  );
}
