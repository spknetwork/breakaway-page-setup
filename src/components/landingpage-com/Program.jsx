import React from 'react'
import "./program.scss"
import program from "../../assets/program.svg"
export default function Program() {
  return (
    <div>
        <div className="program-wrap light-bgt">
            <img src={program} alt="" />
            <div className="pro-text">
                <h2>Break Away Community</h2>
                <p>A tokenised content community connected to a Web3 decentralised back end infrastructure on the SPK Network that gives full self reliance to the community. Here, you can easily and quickly create your own fully functioning content platform for your community.</p>
            </div>
        </div>
    </div>
  )
}
