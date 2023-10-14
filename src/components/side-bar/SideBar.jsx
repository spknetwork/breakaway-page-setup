import React, { useEffect, useState } from 'react'
import "./sidebar.scss"
import { useSelector, useDispatch } from "react-redux";

const SideBar = () => {

    const [userProfile, setUserProfile] = useState({})
    const { userData } = useSelector(state => state.user);

    useEffect(() => {
        console.log("userData:", userData);
        if (userData) {
            handleJsonMetaData();
            console.log("userProfile:", userProfile);
        }
      }, [userData]);
      
      const handleJsonMetaData = () => {
        try {
          const jsn = JSON.parse(userData.posting_json_metadata);
          console.log("Parsed JSON:", jsn);
          setUserProfile(jsn);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      };

  return (
    <div className="sidebar">
        <div className="top">
            {/* Should handle image too */}
            <img src={"data:image/jpeg;base64,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"} alt="" />
            <h5>@{userData?.name}</h5>
        </div>
        <div className="middle">
            <div className="title">
                <h3>User Info</h3>
            </div>
            {/* //to handle reputation properly */}
            <span>Reputation: 70</span>
            <span>About: {userProfile?.profile?.about}</span>
            <span>Post count: {userData?.post_count}</span>
            <span>Location: {userProfile.profile?.location}</span>
            <span>Joined: {userData?.created}</span>
        </div>
        <div className="bottom">
            <div className="title">
                <h3>Wallet Info</h3>
            </div>
            <div className="wallet-info">
                <span>Hive balance: 70</span>
                <span>Hive power: 1000 HP</span>
                <span>HBD balance: $100</span>
                <span>HBD savings: $100</span>
                <span>Pending reward: 399</span>
            </div>
        </div>
    </div>
  )
}

export default SideBar;