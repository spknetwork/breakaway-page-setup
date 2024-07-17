import React, { useState } from 'react';
import "./platform.scss";
import rally1 from "../../assets/rally.png";
import spendhbd from "../../assets/spendhbd.png";
import aliento from "../../assets/aliento.png";
import Rosarito from "../../assets/Rosarito.png";
import { FaAngleRight } from "react-icons/fa6";

function Platform() {
  const images = [
    {
      img: 'https://files.peakd.com/file/peakd-hive/spknetwork/23tGZdhRJUo2xSAdan51jPvs1wdMeoxHMrdiFS23MQDNzSFytCrbEZ77UMcxgeUaKmUfV.png',
      link: "https://hiverally.com/"
    },
    {
      img: 'https://files.peakd.com/file/peakd-hive/spknetwork/23wzZ4tHJfZN1vBPqnptKze7kiGkxFk13t7D3vgomnDmpQeyBTD8jgM1cj6F8hytBkkE3.png',
      link: "https://hiverally.com/"
    },
    {
      img: 'https://files.peakd.com/file/peakd-hive/spknetwork/23uQLRe8eNSu7XMayMhTnVXPd7b7FrJqsdnSNxtMNSpzuAe3xM23qA538U8RrDX4GyhVi.png',
      link: "https://hiverally.com/"
    },
    {
      img: 'https://files.peakd.com/file/peakd-hive/spknetwork/EoCbKghXK3w5a4Cr4R1481Tr6uhfmGEovmoXCwYS4gf43aJTJ9dDyDCtrMLWWM5Piav.png',
      link: "https://hiverally.com/"
    }
  ];

  const [imageToShow, setImageToShow] = useState(images[0].img);
  const [activeButton, setActiveButton] = useState(0);

  const handleButtonClick = (index) => {
    setImageToShow(images[index].img);
    setActiveButton(index);
  };

  return (
    <div className="platform-container">
      <div className="platform-hero-text">
       <h1 >Breakaway communities Platforms</h1>
      </div>
      
      <div className="platform-wrap">
        <div className="platform-btn-wrap">
          <div className={`platform-btn ${activeButton === 0 ? 'active' : ''}`} onClick={() => handleButtonClick(0)}>
            <img src={rally1} alt="Rally" />
            <div className="platform-text-wrap">
              <h1>Rally</h1>
              <p>Rally sport (World Rally Championship, European Rally Championship, National Rally Championships)</p>
            </div>
            <FaAngleRight size={30} />
          </div>
          <div className={`platform-btn ${activeButton === 1 ? 'active' : ''}`} onClick={() => handleButtonClick(1)}>
            <img src={spendhbd} alt="SpendHBD" />
            <div className="platform-text-wrap">
              <h1>SpendHBD</h1>
              <p>Find a local business that accepts HBD or Bitcoin Lightning</p>
            </div>
            <FaAngleRight size={30} />
          </div>
          <div className={`platform-btn ${activeButton === 2 ? 'active' : ''}`} onClick={() => handleButtonClick(2)}>
            <img src={aliento} alt="Aliento" />
            <div className="platform-text-wrap">
              <h1>Aliento</h1>
              <p>Aliento es una comunidad general donde puedes dar tus primeros pasos en Hive.</p>
            </div>
            <FaAngleRight size={30} />
          </div>
          <div className={`platform-btn ${activeButton === 3 ? 'active' : ''}`} onClick={() => handleButtonClick(3)}>
            <img src={Rosarito} alt="Rosarito" />
            <div className="platform-text-wrap">
              <h1>Rosarito</h1>
              <p>Una comunidad sobre Rosarito, México y los negocios que lo respaldan.</p>
            </div>
            <FaAngleRight size={30} />
          </div>
        </div>
        <div className="platform-image">
          {imageToShow && <img src={imageToShow} alt="Selected" />}
          <a href={images[activeButton].link} target="_blank" rel="noopener noreferrer">
            <button>Visit</button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Platform;
