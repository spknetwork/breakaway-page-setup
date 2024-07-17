import React from 'react'
import "./platformsm.scss";
import logo from "../../assets/white-nobackground.png"
import rally from "../../assets/rally.png"
import spendhbd from "../../assets/spendhbd.png"
import aliento from "../../assets/aliento.png"
import Rosarito from "../../assets/Rosarito.png"

function Platformsm() {
    const images = [
        { 
          logo : rally,
          title : "Rally",
          img: 'https://files.peakd.com/file/peakd-hive/spknetwork/23tGZdhRJUo2xSAdan51jPvs1wdMeoxHMrdiFS23MQDNzSFytCrbEZ77UMcxgeUaKmUfV.png',
          link: "https://hiverally.com/",
          about: "Rally sport (World Rally Championship, European Rally Championship, National Rally Championships)"
        },
        {
          logo : spendhbd,
          title : "SpendHBD",
          img: 'https://files.peakd.com/file/peakd-hive/spknetwork/23uQLRe8eNSu7XMayMhTnVXPd7b7FrJqsdnSNxtMNSpzuAe3xM23qA538U8RrDX4GyhVi.png',
          link: "https://spendhbd.com/",
          about: "Find a local business that accepts HBD or Bitcoin Lightning"
        },
        {
          logo : aliento,
          title : "Aliento",
          img: 'https://files.peakd.com/file/peakd-hive/spknetwork/23wzZ4tHJfZN1vBPqnptKze7kiGkxFk13t7D3vgomnDmpQeyBTD8jgM1cj6F8hytBkkE3.png',
          link: "https://aliento.blog/",
          about: "Aliento es una comunidad general donde puedes dar tus primeros pasos en Hive."
        },
        {
          logo : Rosarito,
          title : "Rosarito",
          img: 'https://files.peakd.com/file/peakd-hive/spknetwork/EoCbKghXK3w5a4Cr4R1481Tr6uhfmGEovmoXCwYS4gf43aJTJ9dDyDCtrMLWWM5Piav.png',
          link: "https://rosarito.community/",
          about: "Una comunidad sobre Rosarito, México y los negocios que lo respaldan."
        }
      ];
  return (
    <div className='platformsm-container'>
        <div className="platformsm-wrap">
            <h1>Breakaway communities Platforms</h1>
        </div>
        <div className="platformsm-box-wrap">
            {images.map((data) => (<div className="platformsm-box">
              <a href={data.link} target="_blank" rel="noopener noreferrer"> {data.title}</a>
                <img src={data.img} alt="" />
            </div>))}
        </div>
        {/* <div className="platformsm-box-wrap">
            <img src={logo} alt="" />
            <h3>pasljrdpifr-eiwoseaooaserg asreowvn </h3>
            <h4>eni rfrioriv r30i0oc 03o0on0 fc0in03ifn0inf0 f3fi0fi0i03 3i0io0i0if 0iifn00</h4>
            {images.map((data) => (<div className="plat-wrap">
                <img src={data.logo} alt="" />
                <div className="platformsm-text-wrap">
                    <h3>{data.title}</h3>
                    <p>{data.about}</p>
                </div>
            </div>))}

        </div> */}


    </div>
  )
}

export default Platformsm