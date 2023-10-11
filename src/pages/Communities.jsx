import React from 'react'
import "./communities.scss"
import spkimage from "../assets/spkimage.png"
import { Link } from 'react-router-dom'

const Communities = () => {
  return (
    <div className="communities setup">
        <div className="community-header">
            <h1>All communities</h1>
        </div>
        <div className="search-container">
            <input className="communities-search" type="text" placeholder="search community" />
        </div>
        <div className="communities-container">
            <div className="community">
                <div className="community-wrapper">
                    <div className="left">
                        <div className="top">
                            <img src={spkimage} alt="" />
                            <Link to="/community/3426">Spk-Network</Link>
                        </div>
                        <div className="bottom">
                            <h3>Vidoe publishing</h3>
                            <div className="community-info">
                                <span>541 members</span>
                                <span>|</span>
                                <span>541 Active</span>
                                <span>|</span>
                                <span>541 posters</span>
                            </div>
                            <span>Addmin: @codetester</span>
                        </div>
                    </div>
                    <div className="right">
                        <button>Join</button>
                    </div>
                </div>
                <div className="community-wrapper">
                    <div className="left">
                        <div className="top">
                            <img src={spkimage} alt="" />
                            <Link to="/community/3426">Spk-Network</Link>
                        </div>
                        <div className="bottom">
                            <h3>Vidoe publishing</h3>
                            <div className="community-info">
                                <span>541 members</span>
                                <span>|</span>
                                <span>541 Active</span>
                                <span>|</span>
                                <span>541 posters</span>
                            </div>
                            <span>Addmin: @codetester</span>
                        </div>
                    </div>
                    <div className="right">
                        <button>Join</button>
                    </div>
                </div>
                <div className="community-wrapper">
                    <div className="left">
                        <div className="top">
                            <img src={spkimage} alt="" />
                            <Link to="/community/3426">Spk-Network</Link>
                        </div>
                        <div className="bottom">
                            <h3>Vidoe publishing</h3>
                            <div className="community-info">
                                <span>541 members</span>
                                <span>|</span>
                                <span>541 Active</span>
                                <span>|</span>
                                <span>541 posters</span>
                            </div>
                            <span>Addmin: @codetester</span>
                        </div>
                    </div>
                    <div className="right">
                        <button>Join</button>
                    </div>
                </div>
                <div className="community-wrapper">
                    <div className="left">
                        <div className="top">
                            <img src={spkimage} alt="" />
                            <Link to="/community/3426">Spk-Network</Link>
                        </div>
                        <div className="bottom">
                            <h3>Vidoe publishing</h3>
                            <div className="community-info">
                                <span>541 members</span>
                                <span>|</span>
                                <span>541 Active</span>
                                <span>|</span>
                                <span>541 posters</span>
                            </div>
                            <span>Addmin: @codetester</span>
                        </div>
                    </div>
                    <div className="right">
                        <button>Join</button>
                    </div>
                </div>
                <div className="community-wrapper">
                    <div className="left">
                        <div className="top">
                            <img src={spkimage} alt="" />
                            <Link to="/community/3426">Spk-Network</Link>
                        </div>
                        <div className="bottom">
                            <h3>Vidoe publishing</h3>
                            <div className="community-info">
                                <span>541 members</span>
                                <span>|</span>
                                <span>541 Active</span>
                                <span>|</span>
                                <span>541 posters</span>
                            </div>
                            <span>Addmin: @codetester</span>
                        </div>
                    </div>
                    <div className="right">
                        <button>Join</button>
                    </div>
                </div>
                <div className="community-wrapper">
                    <div className="left">
                        <div className="top">
                            <img src={spkimage} alt="" />
                            <Link to="/community/3426">Spk-Network</Link>
                        </div>
                        <div className="bottom">
                            <h3>Vidoe publishing</h3>
                            <div className="community-info">
                                <span>541 members</span>
                                <span>|</span>
                                <span>541 Active</span>
                                <span>|</span>
                                <span>541 posters</span>
                            </div>
                            <span>Addmin: @codetester</span>
                        </div>
                    </div>
                    <div className="right">
                        <button>Join</button>
                    </div>
                </div>
                <div className="community-wrapper">
                    <div className="left">
                        <div className="top">
                            <img src={spkimage} alt="" />
                            <Link to="/community/3426">Spk-Network</Link>
                        </div>
                        <div className="bottom">
                            <h3>Vidoe publishing</h3>
                            <div className="community-info">
                                <span>541 members</span>
                                <span>|</span>
                                <span>541 Active</span>
                                <span>|</span>
                                <span>541 posters</span>
                            </div>
                            <span>Addmin: @codetester</span>
                        </div>
                    </div>
                    <div className="right">
                        <button>Join</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Communities