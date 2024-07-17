import React from 'react'
import { FaDiscord } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { BsMedium } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./bac.scss"
import logo from "../../assets/white-nobackground_new.png"

function Bac() {
  return (
    <div>
        <div className="bac-contsainer">
            <div className="bac-wrap">
                <div className="bac-left">
                    <img src={logo} alt="" />
                    <h1>Web3 infrastructure on <br /> <span> SPK Network</span> </h1>
                </div>
                <div className="bac-right">
                    <p>Breakaway communities represent a cost-effective and user-friendly approach to establishing a Hive-based social media network social platforms for communities.</p>
                    <Link to="/docker-setup"><button>Create Your Platform</button></Link>
                    <div className="social-wrap">
                    <a href="https://discord.com/invite/RJn9dQfPeM"
            target="_blank"
            rel="noopener noreferrer"><FaDiscord size={40} className="floating-image-1 so-icon-col" /></a>
            <a href="https://medium.com/@spknetsm"
            target="_blank"
            rel="noopener noreferrer"><BsMedium size={40} className="floating-image-1 so-icon-col" /></a>
          <a href="https://twitter.com/SPKweb3"
            target="_blank"
            rel="noopener noreferrer"><FaSquareXTwitter size={40} className="floating-image-3 so-icon-col" /></a>
          <a href="https://github.com/spknetwork"
            target="_blank"
            rel="noopener noreferrer"><FaGithubSquare size={40} className="floating-image-4 so-icon-col" /></a>
         <a href="https://t.me/spknetwork"
            target="_blank"
            rel="noopener noreferrer"> <FaTelegramPlane size={40} className="floating-image-5 so-icon-col" /></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Bac