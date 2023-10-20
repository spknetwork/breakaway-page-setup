import React, { useEffect} from 'react'
import { Link } from 'react-router-dom';
import community from "../assets/community.png"
import communitySetupSteps from '../constants/community-steps';
import "./landing-page.scss"

const LandingPage = () => {

    useEffect(()=> {
    }, [])
  return (
    <div className="landing-page">
      <div className="top">
        <div className="landing-left">
          <img src={community} alt="" />
        </div>
        <div className="landing-right">
          <h1>Create a "Break Away Community"!</h1>
          <div>
            <h3>A tokenised content community connected to a Web3 decentralised back end infrastructure on the SPK Network that gives full self reliance to the community.</h3>
          </div>
          <div>
            <h3>Here, you can easily and quickly create your own fully functioning content platform for your community.</h3>
          </div>
        </div>
      </div>
      <div className="landing-middle">
        <div className="title">
          <h1>How does it work?</h1>
        </div>
        <div className="steps-wrapper">
          {communitySetupSteps.map((step) => (
            <div className="steps" key={step.step}>
              <h2>Step {step.step}</h2>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="landing-bottom">
        <div className="points-wrapper">
          <div className="title">
            <h1>Community Points</h1>
          </div>
          <div>
            <ul>
              <li>Users would earn points for every action</li>
              <li>Points would be accumulated over a period of time</li>
              <li>Accummulated points are converted and distributed in form of airdrop</li>
              <li>Airdrops are awarded based on users points balance</li>
            </ul>
          </div>
        </div>
        <div className="get-started">
          <div className="title">
            <h1>Give your community members the best experience ever</h1>
          </div>
          <div className="create">
            <div className="content">
              <h3>If you are ready, you can proceed to create your own breakaway community. No coding knowledge is required.</h3>
            </div>
            <div className="button">
              <Link to="/community-create">
                <button>Create your community</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage