import React from 'react'
import "./key.scss";

function Key() {
  return (
    <div>
        <div className="key-container">
            <div className="key-header-text">
                <h1>Key Features and Functionalities</h1>
            </div>
            <div className="key-wrap">
                <div className="key-box">
                    <h1>Customization and Setup</h1>
                    <hr />
                    <ul>
                        <li><span>Domain and UI Customization:</span> Users can have their own domain URL and design their frontend according to their preferences.</li>
                        <li><span>Easy Deployment:</span> By following the instructions on the breakaway.community website, setting up a BAC requires minimal coding experience. Tutorials and example videos are available to assist users through the process.</li>
                        <li><span>Additional features</span> such as colour scheme selection, trending feed customisation and functionality will be built in over time</li>
                    </ul>
                </div>
                <div className="key-box">
                    <h1>Point System and Tokens</h1>
                    <hr />
                    <ul>
                        <li><span>Earning Points:</span> Community members can earn points through various actions such as logging in, commenting, posting, reblogging, and upvoting content.</li>
                        <li><span>Tokenization:</span> The tokens will be general Proof of Brain (Incentivised stakeholder distribution) tokens, however a postion of the inflation will go to socail activity on the platforms as welll as to community stake weighted upvotes.</li>
                    </ul>
                </div>
                <div className="key-box ">
                    <h1>Types of Breakaway Communities</h1>
                    <hr />
                    <ul>
                        <li><span>Community-specific:</span> Focused on a particular Hive community.</li>
                        <li><span>Author-specific:</span>Dedicated to content from a specific author or authors (under development, to follow).</li>
                        <li><span>Tag-specific</span>Centered around specific tags or topics (under development, to follow).
                        </li>
                    </ul>
                </div>
                
            </div>
            <div className="key-box-sec-wrap">
            <div className="key-box key-box-2 ">
                    <h1>Types of Breakaway Communities</h1>
                    <hr />
                    <ul>
                        <li><span>Community-specific:</span> Focused on a particular Hive community.</li>
                        <li><span>Author-specific:</span>Dedicated to content from a specific author or authors (under development, to follow).</li>
                        <li><span>Tag-specific</span>Centered around specific tags or topics (under development, to follow).
                        </li>
                    </ul>
                </div>
            </div>
            
        </div> 

    </div>
  )
}

export default Key