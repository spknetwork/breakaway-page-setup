import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCommunities, subscribe, getCommunity } from "../api/hive";
import "./communities.scss";
import Loader from "../components/loader/Loader";
import { HiUsers } from "react-icons/hi";
import { FaArrowUpRightDots, FaArrowUpShortWide } from "react-icons/fa6";
import { CommunityList } from "../components/communities/CommunityList";
import LoaderSK from "./LoaderSK";
import { IoSearch } from "react-icons/io5";
import CommunityListGrid from "../components/communities/CommunityListGrid";

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

  // const handleGrid = () => {
  //   setGridView(!gridView)
  // }

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
    // setSearchQuery= "";
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
                <option value="Breakaway communities">
                  Breakaway communities
                </option>
                <option value="new">New</option>
                <option value="subs">Members</option>
              </select>

              <button
                onClick={() => setGridView(!gridView)}
                className="grid-btn"
              >
                {" "}
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
                      pinnedCommunitiesWebsties={pinnedCommunitiesWebsties}
                    />
                  ) : (
                    <CommunityListGrid
                      c={c}
                      key={i}
                      pinnedCommunitiesWebsties={pinnedCommunitiesWebsties}
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
