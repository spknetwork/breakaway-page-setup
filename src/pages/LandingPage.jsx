import React, { useEffect } from "react";
import "./landing-page.scss";
import Hero from "../components/landingpage-com/Hero.jsx";
// import What from "../components/landingpage-com/What.jsx";
// import Live from "../components/landingpage-com/Live.jsx";
import Faq from "../components/landingpage-com/Faq.jsx";
import Aos from 'aos'
import "aos/dist/aos.css"
import Steps from "../components/landingpage-com/Steps.jsx";
import Member from "../components/landingpage-com/Member.jsx";
import Fee from "../components/landingpage-com/Fee.jsx";
import Program from "../components/landingpage-com/Program.jsx";
import Point from "../components/landingpage-com/Point.jsx";
import Footer from "../components/landingpage-com/Footer.jsx";


const LandingPage = () => {
  // useEffect(() => {}, []);
  useEffect(()=>{
    Aos.init({duration:1000});
  },[])
  return (
    <div className="landing-page-wrap">
      <Hero />
      <Point />
      <Steps />
      <Program />
      <Member />
      <Fee />
      <Faq /> 
      <Footer />
    </div>
  );
};

export default LandingPage;
