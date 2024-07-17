import React, { useEffect } from "react";
import "./landing-page.scss";
import Hero from "../components/landingpage-com/Hero.jsx";
import Aos from 'aos'
import "aos/dist/aos.css"
import Member from "../components/landingpage-com/Member.jsx";
// import Program from "../components/landingpage-com/Program.jsx";
import Point from "../components/landingpage-com/Point.jsx";
import Platform from "../components/landingpage-com/Platform.jsx";
import Key from "../components/landingpage-com/Key.jsx";
import Platformsm from "../components/landingpage-com/Platformsm.jsx";
import Bac from "../components/landingpage-com/Bac.jsx";


const LandingPage = () => {
  useEffect(()=>{
    Aos.init({duration:1000});
  },[])
  return (
    <div className="landing-page-wrap">
      <Hero />
      <Point />
      <Key />
      <Member />
      <Platform />
      <Platformsm />
      <Bac />
    </div>
  );
};

export default LandingPage;
