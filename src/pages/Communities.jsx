import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCommunities, subscribe, getCommunity } from "../api/hive";
import "./communities.scss";
import Loader from "../components/loader/Loader";
import { gridIcon, listView } from "../icons/svg";
import { fetchCommunityDockers } from "../api/breakaway";

const Communities = () => {
  const [communityLists, setCommunityLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedOption, setSelectedOption] = useState('Breakaway communities');
  const [gridView, setGridView] = useState(false);
  const [activeSpan, setActiveSpan] = useState(0);
  const [baCommunities, setBaCommunities] = useState(null)

  useEffect(() => {
    setTimeout(()=> {
      fetchCommunities();
        },3000)
      }, [searchQuery, selectedOption, baCommunities]);

      useEffect(() => {
        getCommunitiesDocker()
      }, [])
  
  const handleSelectChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
  
    if (selectedValue === 'Breakaway communities') {
      console.log(communityLists)
        const filteredCommunities = communityLists.filter(c => {
          return baCommunities?.some(filterObj => filterObj.communityId === c.communityId);
      });
      setCommunityLists(filteredCommunities);
    } else {
      await getCommunities("", 100, searchQuery || null,  event.target.value, "");
    }
  };   

  const fetchCommunities = async () => {
    setLoading(true);
    try {

      if(baCommunities){

        const communities = await getCommunities("", 100, searchQuery || null,  "rank", "");
  
        const pinnedCommunitiesData = await Promise.all(
          baCommunities?.map(async (c) => {
            try {
              let _community = await getCommunity(c.communityId);
              if (_community) {
                const admins = _community.team
                  .filter((member) => member[1] === "admin")
                  .map((admin) => admin[0]);
                return { ..._community, isPinned: true, admins };
              } else {
                return _community;
              }
            } catch (error) {
              console.error(`Error fetching community ${c.communityId}:`, error);
              return null;
            }
          })
        );
  
        const mergedCommunities = (!searchQuery
          ? [...pinnedCommunitiesData, ...communities]
          : [...communities]) || []
  
          if (selectedOption === 'Breakaway communities') {
            const filteredCommunities = mergedCommunities.filter(c => {
                return baCommunities?.some(b => b?.communityId === c?.name);
            });
            setCommunityLists(filteredCommunities);
        } else {
            setCommunityLists(mergedCommunities);
        }
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

  const handleSpanClick = (index) => {
    setActiveSpan(index);
    // getCommunitiesDocker()
  };

  const getCommunitiesDocker = async () => {
    const data = await fetchCommunityDockers();
    setBaCommunities(data?.communities)
    console.log(data?.communities)
  }

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
          <h3 onClick={() => setGridView(!gridView)}>{gridView ? "List view" : "Grid view"}</h3>
        </div>
        <div className="community">
          <div className="select-communities">
            <select
              name="communities"
              id="communities"
              value={selectedOption}
              onChange={handleSelectChange}
            >
              <option value="Breakaway communities">Breakaway communities</option>
              <option value="rank">Rank</option>
              <option value="new">New</option>
              <option value="subs">Members</option>
            </select>
          </div>
          {selectedOption === "Breakaway communities" && <div className="sort-buttons">
            <h3>Sort Communities by:</h3>
            <span
              onClick={() => handleSpanClick(0)}
              style={{ textDecoration: activeSpan === 0 ? 'underline' : 'none' }}
            >
              Points
            </span>
            <span
              onClick={() => handleSpanClick(1)}
              style={{ textDecoration: activeSpan === 1 ? 'underline' : 'none' }}
            >
              Activities
            </span>
            <span
              onClick={() => handleSpanClick(2)}
              style={{ textDecoration: activeSpan === 2 ? 'underline' : 'none' }}
            >
              Created
            </span>
            <span
              onClick={() => handleSpanClick(3)}
              style={{ textDecoration: activeSpan === 3 ? 'underline' : 'none' }}
            >
              Members
            </span>
          </div>}
          <div className="community-main">
            {communityLists.map((c, i) => (
              <div
                className={`${gridView ? "community-wrapper-grid" : "community-wrapper-list"}
                    community-wrapper${c.isPinned ? " pinned-community" : ""}
                    `}
                key={i}
              >
                <div className="left grid-top">
                  <div className="top">
                    <img src={`https://images.hive.blog/u/${c.name}/avatar`} alt="" />
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
                      onClick={() => {
                          const community = baCommunities?.find(b => b.communityId === c.name);
                          if (community) {
                              window.open(`${community.domain}`, "_blank");
                          }
                      }}
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
  )
}

export default Communities;