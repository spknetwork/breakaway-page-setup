import React from 'react'
import iphone from "../../assets/iphone-2.png"
import "./point.scss"
export default function Point() {
  return (
    <div className="point-container">
        <div className="point-wrap"> 
            <div  className="point-left ">
                <img src={iphone} alt="" />
            </div>
            <div className="point-right animate__animated animate__fadeInUp">
                <h1>Give your community members the best experience ever.</h1>
                <p>If you are ready, you can proceed to create your own breakaway community. No coding knowledge is required.</p>
            </div>
            
        </div>
    </div>
  )
}
