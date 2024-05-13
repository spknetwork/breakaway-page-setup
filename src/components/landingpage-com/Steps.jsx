import React from 'react'
import "./steps.scss"
import "aos/dist/aos.css"
export default function Steps() {
  return (
    <div  className="step-container" >
    <div>
      <h1 className="header-step">How does it work?</h1>
    </div>
    <div className="step-wrap-1">
      <div className="bom light-bg">
        <h2>Step 1</h2>
        <h3>Community</h3>
        <p>Create/choose a hive community</p>
      </div>
      <div className="bom light-bg">
        <h2>Step 2</h2>
        <h3>Logos</h3>
        <p>Upload an ICO file for your logo</p>
      </div>
      <div className="bom light-bg">
        <h2>Step 3</h2>
        <h3>Colors</h3>
        <p>Select a preferred color scheme</p>
      </div> 
    </div>

    <div className="step-wrap-2">
      <div className="bom light-bg">
        <h2>Step 4</h2>
        <h3>Details</h3>
        <p>Enter basic details about the community</p>
      </div>
      <div className="bom light-bg">
        <h2>Step 5</h2>
        <h3>Docker container</h3>
        <p>Generate the docker container</p>
      </div>
    </div>
    </div>
  )
}
