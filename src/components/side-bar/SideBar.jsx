import React, { useEffect, useState } from "react";
import "./sidebar.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { clearUser } from "../../redux/userSlice";
import calculateUserReputation from "../../helpers/reputation";

const SideBar = () => {
  const [userProfile, setUserProfile] = useState({});
  const { userData } = useSelector((state) => state.user);
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

  return (
    <div className="sidebar">
      <div className="top">
        <img
          src={`https://images.hive.blog/u/${userData?.name}/avatar`}
          alt=""
        />
        <h5>@{userData?.name}</h5>
        <span onClick={() => dispatch(logoutAndClear())}>
          <Link to="/">Logout</Link>
        </span>
      </div>
      <div className="middle">
        <div className="title">
          <h3>User Info</h3>
        </div>
        <span>Reputation: {calculateUserReputation(userData.reputation)}</span>
        <span>About: {userProfile?.profile?.about}</span>
        <span>Location: {userProfile.profile?.location}</span>
        <span>Joined: {userData?.created}</span>
      </div>
      <div className="bottom">
        <div className="title">
          <h3>Wallet Info</h3>
        </div>
        <div className="wallet-info">
          <span>Hive: {userData?.balance}</span>
          <span>HBD: {userData.hbd_balance}</span>
          <span>HBD savings: {userData.savings_hbd_balance}</span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
