import React from 'react'
import { FaDiscord } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { BsMedium } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./footer.scss"
export default function Footer() {
  return (
    <div>
        <div className="footer-wrap light-bgs">
            <h2>Let's start this trip together. <Link to="/docker-setup"><span> Join Now.</span></Link></h2>
            <p>Web3 decentralised back end infrastructure on the SPK Network that gives full self reliance to the community.</p>
            <div className="social-icon">
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
  )
}
