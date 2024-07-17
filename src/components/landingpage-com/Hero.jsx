import React from "react";
import "./hero.scss";
// import "animate.css";
// import { motion } from "framer-motion";
// import fadeIn from "../../variants";
import Marquee from "react-fast-marquee";
import speak from "../../assets/3speak.png";
import deep from "../../assets/deep-dive.jfif";
import Gem from "../../assets/Gem.png";
import leo from "../../assets/Leo.png";
import life from "../../assets/lifestyle.png";
import chain from "../../assets/chain-art.jfif";
import { Link } from "react-router-dom";
import wave from "../../assets/wave.svg"
import rally1 from "../../assets/rally.png";
import spendhbd from "../../assets/spendhbd.png";
import aliento from "../../assets/aliento.png";
import Rosarito from "../../assets/Rosarito.png";
import sucre from "../../assets/Hive-sucre.jpg";
import Vibes from "../../assets/vibes.jpg";

export default function Hero() {
 

  return (
    <div>
      <header className="hero-section">
        <img className="wave" src={wave} alt="" />
        <div className="hero-wrap">
          <h1 className=" double-color">
            Breakaway Community
          </h1>
          <p className="">

          Provide a seamless way for individuals and groups to create their own tokenised community social frontend platforms on the Hive blockchain.
            {/* A tokenised content community connected to a Web3 decentralised */}
            {/* infrastructure on SPK Network */}
            {/* Breakaway communities (BAC's) are an innovative concept that originated from the SPK Network, aiming to provide a seamless way for individuals and groups to create their own tokenised community social frontend platforms on the Hive blockchain.{" "} */}
          </p>
          <Link to="/docker-setup"> <button className=" btn-hero glo-btnc">
          Launch Your Platform
          </button></Link>
          <Link to="/docker-setup"> <button className=" glo-btnc phone-text-btn">
            Create Your Community
          </button></Link>
        </div>

        <Marquee pauseOnHover gradient gradientColor={""} className="carousel">
          <div className="carousel-wrap light-bg">
            <img
              className="caro-img"
              style={{ width: "80px" }}
              src={rally1}
              alt=""
            />{" "}
            <span>Rally</span>
          </div>
          <div className=" carousel-wrap light-bg">
            <img className="caro-img" src={spendhbd} alt="" />{" "}
            <span>Spendhbd</span>
          </div>
          <div className=" carousel-wrap light-bg">
            <img className="caro-img" src={leo} alt="" /> <span>Leo</span>
          </div>
          <div className=" carousel-wrap light-bg">
            <img className="caro-img" src={aliento} alt="" />{" "}
            <span>Aliento</span>
          </div>
          <div className="carousel-wrap light-bg">
            <img
              className="caro-img"
              style={{ width: "80px" }}
              src={Rosarito}
              alt=""
            />{" "}
            <span>Rosarito</span>
          </div>
          <div className=" carousel-wrap light-bg">
            <img className="caro-img" src={Vibes} alt="" />{" "}
            <span>Vibes</span>
          </div>
          <div className="carousel-wrap light-bg">
            <img className="caro-img" src={sucre} alt="" /> <span>Hive Sucre</span>
          </div>
          <div className="carousel-wrap light-bg">
            <img className="caro-img" src={rally1} alt="" /> <span>Rally</span>
          </div>
          <div className="carousel-wrap light-bg">
            <img className="caro-img" src={spendhbd} alt="" />{" "}
            <span>Spendhbd</span>
          </div>
        </Marquee>
      </header>
    </div>
  );
}
