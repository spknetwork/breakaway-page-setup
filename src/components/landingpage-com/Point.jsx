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
                <h1>Breakaway communities</h1>
                <p> Forked from the latest Ecency technology, offer a streamlined solution to quickly establish a personalized community frontend with a unique domain and customizable user interface.</p>
            </div>
            
        </div>
    </div>
  )
}
