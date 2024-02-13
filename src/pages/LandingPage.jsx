import React, { useEffect } from "react";
import "./landing-page.scss";
import Hero from "../components/landingpage-com/Hero.jsx";
import What from "../components/landingpage-com/What.jsx";
import Live from "../components/landingpage-com/Live.jsx";
import Faq from "../components/landingpage-com/Faq.jsx";

const LandingPage = () => {
  useEffect(() => {}, []);
  return (
    <div className="landing-page-wrap">
      <Hero />
      <What />
      <Live />
      <Faq /> 
    </div>
  );
};

export default LandingPage;
