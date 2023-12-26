import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCommunities, subscribe } from "../api/hive";
import "./communities.scss";
import spkimage from "../assets/spkimage.png";
import Loader from "../components/loader/Loader";

const Communities = () => {
  const [communityLists, setCommunityLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
      setCommunityLists(communities || []);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleCommunitySearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="communities setup">
      <div className="community-header">
        <h1>Tokenized Breakaway Communities</h1>
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
              <div className="community-wrapper" key={i}>
                <div className="left">
                  <div className="top">
                    <img src={spkimage} alt="" />
                    <Link to={`/community/hive-${c.id}`}>{c.title}</Link>
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
                  <button onClick={() => subscribe("souljay", "hive-" + c.id)}>
                    Join
                  </button>
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
