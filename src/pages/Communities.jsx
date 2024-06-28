import React, { useState, useEffect } from "react";
import { getCommunities, getCommunity } from "../api/hive";
import "./communities.scss";
import { CommunityList } from "../components/communities/CommunityList";
import LoaderSK from "./LoaderSK";
import { IoSearch } from "react-icons/io5";
import CommunityListGrid from "../components/communities/CommunityListGrid";
import { getDockerSetups } from "../api/breakaway";

const Communities = () => {
  const [communityLists, setCommunityLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedOption, setSelectedOption] = useState("Breakaway communities");
  const [gridView, setGridView] = useState(false);
  const [dockerSetups, setDockerSetups] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [searchQuery, selectedOption]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [communities, setups] = await Promise.all([
        getCommunities("", 100, searchQuery || null, "rank", ""),
        getDockerSetups()
      ]);

      setDockerSetups(setups);
      const pinnedCommunitiesData = await Promise.all(
        setups.map(async (setup) => {
          try {
            let _community = await getCommunity(setup.communityId);
            if (_community) {
              const admins = _community.team
                .filter((member) => member[1] === "admin")
                .map((admin) => admin[0]);
              return { ..._community, isPinned: true, admins, domain: setup.domain };
            } else {
              return null;
            }
          } catch (error) {
            console.error(`Error fetching community ${setup.communityId}:`, error);
            return null;
          }
        })
      );

      const mergedCommunities =
        (!searchQuery
          ? [
              ...pinnedCommunitiesData.filter(Boolean),
              ...communities.filter(
                (community) =>
                  !pinnedCommunitiesData.some(
                    (pinnedCommunity) => pinnedCommunity?.name === community.name
                  )
              ),
            ]
          : [...communities]) || [];

      if (selectedOption === "Breakaway communities") {
        const filteredCommunities = mergedCommunities.filter((c) =>
          setups.some((setup) => setup.communityId === c.name)
        );
        setCommunityLists(filteredCommunities);
      } else {
        setCommunityLists(mergedCommunities);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    setLoading(false);
  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    fetchData(); // Refresh data on select change
  };

  const handleCommunitySearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="communities-wrapper">
      <div className="hero-text">
        <h1>Tokenized Breakaway Communities</h1>
      </div>
      <div className="community-section">
        {loading ? (
          <div className="communities-container">
            <LoaderSK />
          </div>
        ) : communityLists.length > 0 ? (
          <div className="community-wrap">
            <div className="select-communities">
              <select
                className="select"
                name="communities"
                id="communities"
                value={selectedOption}
                onChange={handleSelectChange}
              >
                <option value="rank">All Community</option>
                <option value="Breakaway communities">Breakaway communities</option>
                <option value="new">New</option>
                <option value="subs">Members</option>
              </select>

              <button
                onClick={() => setGridView(!gridView)}
                className="grid-btn"
              >
                {gridView ? "Grid view" : "List view"}
              </button>

              <div className="search-wrap">
                <input
                  className="input"
                  value={searchQuery}
                  placeholder="Search community"
                  type="text"
                  onChange={handleCommunitySearch}
                />
                <IoSearch className="search-icon" />
              </div>
            </div>
            <div className={gridView ? "community-box " : "community-box-grid"}>
              {communityLists.map((c, i) => (
                <>
                  {gridView ? (
                    <CommunityList
                      c={c}
                      key={i}
                      pinnedCommunitiesWebsties={dockerSetups.reduce((acc, setup) => {
                        acc[setup.communityId] = setup.domain;
                        return acc;
                      }, {})}
                    />
                  ) : (
                    <CommunityListGrid
                      c={c}
                      key={i}
                      pinnedCommunitiesWebsties={dockerSetups.reduce((acc, setup) => {
                        acc[setup.communityId] = setup.domain;
                        return acc;
                      }, {})}
                    />
                  )}
                </>
              ))}
            </div>
          </div>
        ) : (
          <div className="communities-container">No community found</div>
        )}
      </div>
    </div>
  );
};

export default Communities;
