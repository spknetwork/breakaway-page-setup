import React from 'react'
import "./fee.scss"
import fee from "../../assets/discount.svg"
export default function Fee() {
  return (
    <div>
        <div className="fee-wrap light-bgt">
            <div className="fee-left">
                <h1>Fast with No Fees </h1>
                <p>Break away community allow you to build your own community with 0% fee on a fast web3decentralised back end infrastructure on the SPK Network that gives full self reliance to the community.  No coding knowledge is required.</p>
            </div>
            <div className="fee-right">
                <img src={fee} alt="" />
                
                
            </div>
        </div>
    </div>
  )
}
