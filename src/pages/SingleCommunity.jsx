import React, { useEffect } from 'react'
import "./single-community.scss";
import { useParams } from 'react-router-dom';
import { getDockerSetups } from '../api/breakaway';
import Logo from "../assets/lifestyle.png"

export const SingleCommunity = () => {
    const params = useParams();

    useEffect(() => {
        console.log(params);
        getBreakawaycommunities();
    }, [])

    const getBreakawaycommunities = async ()=> {
        const baCommunities = await getDockerSetups();
        console.log(baCommunities)
        return baCommunities
    }

    const handleSelectChange = ()=> {
        console.log("ba platform selected")
    }
  return (
    <div className='single-community'>
      <div className="left">
        <div className="left-wrapper">
            <div className="com-info">
                <img className="bacyy-list" src={Logo} alt="" />
                <h2>Lifestyle</h2>
            </div>
            <div className="admin-list">
                <h3>Admins and Mods</h3>
                <div className="adminss">
                    <span>@tes1: mod</span>
                    <span>@tes1: admin</span>
                    <span>@tes1: admin</span>
                    <span>@tes1: mod</span>
                </div>
            </div>
            <div className="ba-platforms">
                <h3>Breakaway platforms: 10</h3>
                <span>this hive community has 10 breakaway platfroms, select to view each one</span>
                <select
                    className="select"
                    name="communities"
                    id="communities"
                    // value={selectedOption}
                    onChange={handleSelectChange}
                >
                    <option value="">Vibes</option>
                    <option value="">Rally</option>
                    <option value="">Life</option>
                    <option value="">Speak</option>
                    <option value="">Love</option>
                </select>
            </div>

            </div>
      </div>
      <div className="right">
        <div className="right-wrapper">
            <div className="top">
                <span>Total Points awarded: 2000</span>|
                <span>Total Points awarded: 2000</span>|
                <span>Total Points awarded: 2000</span>|
                <span>Total Points awarded: 2000</span>|
                <span>Total Points awarded: 2000</span>
            </div>
            <div className="bottom">
                <h3>Top community engagements</h3>
            </div>
        </div>
      </div>
    </div>
  )
}
