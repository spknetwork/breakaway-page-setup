import React from 'react'
import { Link } from "react-router-dom";
import "./bac.scss"
import logo from "../../assets/white-nobackground_new.png"
import hive from "../../assets/hive-blockchain-hive-logo.png"


function Bac() {
  return (
    <div>
        <div className="bac-contsainer">
            <div className="bac-wrap">
                <div className="bac-left">
                    <img src={logo} alt="" />
                    <h1>Infrastructure on <br /> <span> SPK Network</span> </h1>
                </div>
                <div className="bac-right">
                    <p>Breakaway communities represent a cost-effective and user-friendly approach to establishing a Hive-based social media network social platforms for communities.</p>
                    <Link to="/docker-setup"><button>Launch Your Platform</button></Link>
                </div>
            </div>
            <div className="power-wrap">
            <h3 className="power">Powered By Hive</h3> <img src={hive} alt="" />
            </div>
            
        </div>
    </div>
  )
}

export default Bac