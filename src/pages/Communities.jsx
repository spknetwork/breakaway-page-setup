import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCommunities, subscribe, getCommunity } from "../api/hive";
import "./communities.scss";
import spkimage from "../assets/spkimage.png";
import Loader from "../components/loader/Loader";
import { getAllCommunities } from "../api/breakaway";

const Communities = () => {
  const [communityLists, setCommunityLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pinnedCommunities = ["hive-109272", "hive-115309", "hive-140169"];
  const pinnedCommunitiesWebsties = {
    "hive-109272": "https://hiverally.com",
    "hive-115309": "https://digitalnetworkstate.media",
    "hive-140169": "https://hivevibes.co",
  };

  useEffect(() => {
    setTimeout(() => {
      fetchCommunities();
    }, 3000);
  }, [searchQuery]);

  const fetchCommunities = async () => {
    setLoading(true);
    try {
      const communities = await getCommunities(
        "",
        100,
        searchQuery || null,
        "rank",
        ""
      );
      console.log("communities");
      console.log(communities);

      const pinnedCommunitiesData = await Promise.all(
        pinnedCommunities.map(async (communityId) => {
          try {
            let _community = await getCommunity(communityId);
            if (_community) {
              const admins = _community.team
                .filter((member) => member[1] === "admin")
                .map((admin) => admin[0]);
              return { ..._community, isPinned: true, admins };
            } else {
              return _community;
            }
          } catch (error) {
            console.error(`Error fetching community ${communityId}:`, error);
            return null;
          }
        })
      );
      console.log("pinnedCommunitiesData");
      console.log(pinnedCommunitiesData);
      setCommunityLists(
        (!searchQuery
          ? [...pinnedCommunitiesData, ...communities]
          : [...communities]) || []
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleCommunitySearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const allComms = async ()=> {
    const data = await getAllCommunities()
    console.log(data)
  }

  return (
    <div className="communities setup">
      <div className="community-header">
        <h1>Tokenized Breakaway Communities</h1>
        <button onClick={()=>allComms()}>test</button>
      </div>
      <div className="search-container">
        <input
          className="communities-search"
          value={searchQuery}
          type="text"
          placeholder="Search community"
          onChange={handleCommunitySearch}
        />
      </div>
      {loading ? (
        <div className="communities-container">
          <Loader />
        </div>
      ) : communityLists.length > 0 ? (
        <div className="communities-container">
          <div className="community">
            {communityLists.map((c, i) => (
              <div
                className={`community-wrapper${
                  c.isPinned ? " pinned-community" : ""
                }`}
                key={i}
              >
                <div className="left">
                  <div className="top">
                    <img src={spkimage} alt="" />
                    <Link to={`/community/${c.title}`}>{c.title}</Link>
                  </div>
                  <div className="bottom">
                    <span className="about">{c.about}</span>
                    <div className="community-info">
                      <span>{c.subscribers} members</span>
                      <span>|</span>
                      <span>{c.num_pending} Posts</span>
                      <span>|</span>
                      <span>{c.num_authors} posters</span>
                    </div>
                    <div className="admins-wrapper">
                      <span>Admin:</span>
                      {c?.admins?.map((admin, i) => (
                        <div key={i}>
                          <span className="admin">@{admin}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="right">
                  {c.isPinned ? (
                    <button
                      onClick={() =>
                        window.open(
                          `${pinnedCommunitiesWebsties[c.name]}`,
                          "_blank"
                        )
                      }
                    >
                      Access
                    </button>
                  ) : (
                    <Link to="/docker-setup">
                      <button>Create</button>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="communities-container">No community found</div>
      )}
    </div>
  );
};

export default Communities;
