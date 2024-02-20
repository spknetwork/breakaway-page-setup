import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCommunities, subscribe, getCommunity } from "../api/hive";
import "./communities.scss";
import Loader from "../components/loader/Loader";
import { gridIcon, listView } from "../icons/svg";

const Communities = () => {
  const [communityLists, setCommunityLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedOption, setSelectedOption] = useState("Breakaway communities");
  const [gridView, setGridView] = useState(false);

  const pinnedCommunitiesWebsties = {
    "hive-109272": "https://hiverally.com",
    "hive-115309": "https://digitalnetworkstate.media",
    "hive-140169": "https://hivevibes.co",
  };

  //test
  const pinnedCommunities = ["hive-109272", "hive-115309", "hive-140169"];

  useEffect(() => {
    fetchCommunities();
  }, [searchQuery, selectedOption]);

  const handleSelectChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    if (selectedValue === "Breakaway communities") {
      const filteredCommunities = communityLists.filter((c) =>
        pinnedCommunities.includes(c.name)
      );
      setCommunityLists(filteredCommunities);
    } else {
      await getCommunities(
        "",
        100,
        searchQuery || null,
        event.target.value,
        ""
      );
    }
  };

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

      const mergedCommunities =
        (!searchQuery
          ? [
              ...pinnedCommunitiesData,
              ...communities.filter(
                (community) =>
                  !pinnedCommunitiesData.some(
                    (pinnedCommunity) => pinnedCommunity.name === community.name
                  )
              ),
            ]
          : [...communities]) || [];

      if (selectedOption === "Breakaway communities") {
        const filteredCommunities = mergedCommunities.filter((c) =>
          pinnedCommunities.includes(c.name)
        );
        setCommunityLists(filteredCommunities);
      } else {
        setCommunityLists(mergedCommunities);
      }

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
          <div className="view">
            <span>{gridView ? listView : gridIcon}</span>
            <h3 onClick={() => setGridView(!gridView)}>
              {gridView ? "List view" : "Grid view"}
            </h3>
          </div>
          <div className="community">
            <div className="select-communities">
              <select
                name="communities"
                id="communities"
                value={selectedOption}
                onChange={handleSelectChange}
              >
                <option value="Breakaway communities">
                  Breakaway communities
                </option>
                <option value="rank">Rank</option>
                <option value="new">New</option>
                <option value="subs">Members</option>
              </select>
            </div>
            <div className="community-main">
              {communityLists.map((c, i) => (
                <div
                  className={`${
                    gridView
                      ? "community-wrapper-grid"
                      : "community-wrapper-list"
                  }
                    community-wrapper${c.isPinned ? " pinned-community" : ""}
                    `}
                  key={i}
                >
                  <div className="left grid-top">
                    <div className="top">
                      <img
                        src={`https://images.hive.blog/u/${c.name}/avatar`}
                        alt=""
                      />
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
                        <div className="admins">
                          {c?.admins?.map((admin, i) => (
                            <div key={i} className="each-admin">
                              <span className="admin">@{admin}</span>
                            </div>
                          ))}
                        </div>
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
                        Visit platform
                      </button>
                    ) : (
                      <Link to="/docker-setup">
                        Start your platform for this community
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="communities-container">No community found</div>
      )}
    </div>
  );
};

export default Communities;
