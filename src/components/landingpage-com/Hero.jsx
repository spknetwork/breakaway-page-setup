import React from "react";
import "./hero.scss";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import wave from "../../assets/wave.svg";
import rally1 from "../../assets/rally.png";
import spendhbd from "../../assets/spendhbd.png";
import aliento from "../../assets/aliento.png";
import Rosarito from "../../assets/Rosarito.png";
import sucre from "../../assets/Hive-sucre.jpg";


export default function Hero() {
  return (
    <div>
      <header className="hero-section">
        <img className="wave" src={wave}  alt="" />
        <div className="hero-wrap">
          <h1 className="double-color">Breakaway Community</h1>
          <p>
            A seamless way to create tokenised community social frontend platforms on the Hive blockchain.
          </p>
          <Link to="/docker-setup">
            <button className="btn-hero glo-btnc">Launch Your Platform</button>
          </Link>
          <Link to="/docker-setup">
            <button className="glo-btnc btn-z phone-text-btn">Launch Your Platform</button>
          </Link>
        </div>

        <Marquee pauseOnHover gradient={false} className="carousel">
        <a href="https://hiverally.com/" target="_blank" rel="noopener noreferrer"><div className="carousel-wrap light-bg"> 
            <img className="caro-img" style={{ width: "80px" }} src={rally1} alt="" />
            <span>Rally</span>
          </div></a>
          <a href="https://spendhbd.com/" target="_blank" rel="noopener noreferrer"><div className="carousel-wrap light-bg">
            <img className="caro-img" src={spendhbd} alt="" />
            <span>Spendhbd</span>
          </div></a>
          <a href="https://aliento.blog/" target="_blank" rel="noopener noreferrer"><div className="carousel-wrap light-bg">
            <img className="caro-img" src={aliento} alt="" />
            <span>Aliento</span>
          </div></a>
          <a href="https://rosarito.community/" target="_blank" rel="noopener noreferrer"><div className="carousel-wrap light-bg">
            <img className="caro-img" style={{ width: "80px" }} src={Rosarito} alt="" />
            <span>Rosarito</span>
          </div></a>
          <a href="https://hiverally.com/" target="_blank" rel="noopener noreferrer"><div className="carousel-wrap light-bg"> 
            <img className="caro-img" style={{ width: "80px" }} src={rally1} alt="" />
            <span>Rally</span>
          </div></a>
          <a href="https://hivesucre.carrd.co/" target="_blank" rel="noopener noreferrer"><div className="carousel-wrap light-bg">
            <img className="caro-img" src={sucre} alt="" />
            <span>Hive Sucre</span>
          </div></a>
          <a href="https://aliento.blog/" target="_blank" rel="noopener noreferrer"><div className="carousel-wrap light-bg">
            <img className="caro-img" src={aliento} alt="" />
            <span>Aliento</span>
          </div></a>
        </Marquee>
      </header>
    </div>
  );
}
