import React from 'react'
import "./member.scss"
import dev from "../../assets/developer.svg"

export default function Member() {
  return (
    <div className="member-container" >
        <div className="member-wrap light-bg">
            <div className="member-left">
                <h1>Advantage of Free, Open Source</h1>
                <ul>
                  <li>Breakaway community is an open source front end that is funded by the community </li>
                  <li>The latest Ecency updates (Ecency is an open source web3, tokenised platform that is funded by the Hive DAO.  This means that when the Ecency platform updates, Breakaway communities can also benefit from the updates on Ececny).</li>
                  <li>We are looking forward to be able to offer users the ability to select other popular front end platform designs as well as Ecency so that they could spin up their more custom made social platforms</li>
                </ul>
            </div>
            <div className="member-right">
                <img src={dev} alt="" />
                
            </div>
        </div>
    </div>
  )
}
