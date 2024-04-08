import React from 'react'
import "./profile-page.scss"
import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { clearUser } from "../redux/userSlice";
import calculateUserReputation from "../helpers/reputation";
import Cover from "../../src/assets/cover-img.jpg"

export default function Profilepage() {
  const [userProfile, setUserProfile] = useState({});
  const { userData } = useSelector((state) => state.user);
  console.log(userData)
  const dispatch = useDispatch();
  const logoutAndClear = () => (dispatch) => {
    dispatch(logout());
    dispatch(clearUser());
  };
  useEffect(() => {
    if (userData) {
      handleJsonMetaData();
    }
  }, [userData]);

  const handleJsonMetaData = () => {
    try {
      const jsn = JSON.parse(userData.posting_json_metadata);
      setUserProfile(jsn);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
    
  };
  console.log(userProfile)
  return (
    <div>
        <div className="profile-wrap">
            <div className="cover-wrap">
                <img className="cover" src={Cover} alt="" />
                <img className="prof-img" src={`https://images.hive.blog/u/${userData?.name}/avatar`} alt="" />
                
            </div>
            
            <div className="content-text" >
                <h3 className="user">@{userData?.name}</h3>

                <p className="rep">Reputation: {calculateUserReputation(userData.reputation)}</p>
                <h3 className="loctaion">Location: {userProfile.profile?.location}</h3>
                <h4 className="join">Joined: {userData?.created}</h4>
                <h3 className="abt">About: {userProfile?.profile?.about}</h3>
                <span className="logout" onClick={() => dispatch(logoutAndClear())}>
                 <Link className="logout" to="/">Logout</Link>
                </span>
                
            </div>
        </div>
        
    </div>
  )
}
