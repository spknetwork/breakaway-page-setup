import React from 'react'
import "./member.scss"
import dev from "../../assets/developer.svg"

export default function Member() {
  return (
    <div>
        <div className="member-wrap light-bg">
            <div className="member-left">
                <h1>No Code Required </h1>
                <p>Join the millions of Creators bringing their ideas to life by creating your own breakaway community. No coding knowledge is required.</p>
            </div>
            <div className="member-right">
                <img src={dev} alt="" />
                
            </div>
        </div>
    </div>
  )
}
