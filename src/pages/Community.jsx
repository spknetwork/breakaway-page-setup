import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import "./community.scss"

const Community = () => {

  const [community, setComuniy] = useState("")
  const location = useLocation();
  useEffect(() => {
    const id = location.pathname.split("/community/")[1];
    console.log(id)
    setComuniy(id)
  }, [])


  return (
    <div className="single-community">
      <div className="community-wrapper">
        <div className="top">
          <h1>{community}</h1>
        </div>
        <div className="info">
          <h3>Total points awarded: 2000 Points</h3>
          <h3>Active users: 2000 Points</h3>
          {/* <h3>Total points awarded: 2000 Points</h3>
          <h3>Total points awarded: 2000 Points</h3>
          <h3>Total points awarded: 2000 Points</h3>
          <h3>Total points awarded: 2000 Points</h3>
          <h3>Total points awarded: 2000 Points</h3> */}
        </div>
      </div>
    </div>
  )
}

export default Community