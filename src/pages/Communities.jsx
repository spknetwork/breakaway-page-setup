import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCommunities, subscribe } from "../api/hive";
import "./communities.scss";
import Loader from "../components/loader/Loader";
import { useSelector } from "react-redux";
import { gridIcon, listView } from "../icons/svg";

const Communities = () => {
  const [communityLists, setCommunityLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState('rank');
  const [gridView, setGridView] = useState(false);

  const { userData } = useSelector(state => state?.user);

  //test sample
  const baComms = ["hive-109272", "hive-115309"]
  
  useEffect(() => {
    setTimeout(()=> {
      fetchCommunities();
        },3000)
      }, [searchQuery, selectedOption]);
      
      const handleSelectChange = async (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
      
        if (selectedValue === 'Breakaway communities') {
          const filteredCommunities = communityLists.filter((c) => baComms.includes(c.name));
          setCommunityLists(filteredCommunities);
        } else {
          // fetchCommunities();
          await getCommunities("", 100, searchQuery || null,  event.target.value, "");
        }
      };
      

  const fetchCommunities = async () => {
    setLoading(true);
    try {
      const communities = await getCommunities("", 100, searchQuery || null,  selectedOption, "");
      console.log(communities)
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

  const subscribeCommunity = (name, community) => {
  
    subscribe(name, community)
      .then(() => {
        const s = [name, community, "guest", ""];
        return s
      })
      .catch((e) => {
        console.log(e)
      });
  }

  return (
    <div className="communities setup">
      <div className="community-header">
        <h1>All communities</h1>
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
      {loading ? <div className="communities-container"><Loader/></div> : communityLists.length > 0 ?
      <div className="communities-container">
        <div className="view">
          <span>{gridView ? listView : gridIcon}</span>
          <h3 onClick={()=> setGridView(!gridView)}>{gridView ? "List view" : "Grid view"}</h3>
        </div>
        <div className="community">
              <div className="select-communities">
                <select
                  name="communities"
                  id="communities"
                  value={selectedOption}
                  onChange={handleSelectChange}
                >
                  <option value="rank">Rank</option>
                  {/* <option value="hot">Hot</option> */}
                  <option value="new">New</option>
                  <option value="subs">Members</option>
                  <option value="Breakaway communities">Breakaway communities</option>
                </select>
              </div>
              <div className="community-main">
                {communityLists.map((c, i) => (
                  <div 
                  className={gridView ? "community-wrapper-grid" : "community-wrapper-list"} 
                  key={i}>
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
                      {/* <button > */}
                        <Link to={`/docker-setup`}>Start your own platform for this community</Link>
                      {/* </button> */}
                    </div>
                  </div>
                ))}
              </div>
        </div>
      </div> : <div className="communities-container">No community found</div>}
    </div>
  );
};

export default Communities;
